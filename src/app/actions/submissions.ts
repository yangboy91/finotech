"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth";
import { readDemoStore, writeDemoStore } from "@/lib/demo-store";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type SubmissionFormState = {
  error?: string;
  success?: string;
};

async function persistDemoFile(file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join("/tmp", "finotech-demo-uploads");
  await mkdir(uploadDir, { recursive: true });
  const fileName = `${Date.now()}-${file.name.replaceAll(/\s+/g, "-")}`;
  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, bytes);
  return filePath;
}

export async function createSubmissionAction(
  _state: SubmissionFormState,
  formData: FormData,
): Promise<SubmissionFormState> {
  const currentUser = await requireUser();
  const weekId = String(formData.get("weekId") ?? "");
  const submissionType = String(formData.get("submissionType") ?? "link");
  const linkUrl = String(formData.get("linkUrl") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const file = formData.get("file");

  if (currentUser.profile.role !== "student") {
    return { error: "Only students can submit work." };
  }

  if (!weekId) {
    return { error: "A week selection is required." };
  }

  if (submissionType === "link" && !linkUrl) {
    return { error: "Please provide a submission link." };
  }

  if (submissionType === "file" && (!(file instanceof File) || file.size === 0)) {
    return { error: "Please upload a file." };
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    const existing = store.submissions.find(
      (submission) =>
        submission.student_id === currentUser.profile.id &&
        submission.week_id === weekId,
    );

    const filePath =
      submissionType === "file" && file instanceof File && file.size > 0
        ? await persistDemoFile(file)
        : null;

    const now = new Date().toISOString();

    if (existing) {
      existing.submission_type = submissionType === "file" ? "file" : "link";
      existing.link_url = submissionType === "link" ? linkUrl : null;
      existing.file_path = filePath;
      existing.notes = notes || null;
      existing.status = "submitted";
      existing.updated_at = now;
    } else {
      store.submissions.unshift({
        id: `submission_${Date.now()}`,
        student_id: currentUser.profile.id,
        week_id: weekId,
        submission_type: submissionType === "file" ? "file" : "link",
        link_url: submissionType === "link" ? linkUrl : null,
        file_path: filePath,
        notes: notes || null,
        status: "submitted",
        submitted_at: now,
        updated_at: now,
      });
    }

    await writeDemoStore(store);
    revalidatePath("/dashboard");
    revalidatePath("/submissions");
    revalidatePath("/feedback");
    revalidatePath("/admin/submissions");
    return { success: "Submission saved." };
  }

  const supabase = await createServerSupabaseClient();
  let filePath: string | null = null;

  if (submissionType === "file" && file instanceof File && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const storagePath = `${currentUser.profile.id}/${weekId}/${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("submission-files")
      .upload(storagePath, file, {
        upsert: true,
      });

    if (uploadError) {
      return { error: uploadError.message };
    }

    filePath = storagePath;
  }

  const payload = {
    student_id: currentUser.profile.id,
    week_id: weekId,
    submission_type: submissionType === "file" ? "file" : "link",
    link_url: submissionType === "link" ? linkUrl : null,
    file_path: filePath,
    notes: notes || null,
    status: "submitted",
  };

  const { error } = await supabase.from("submissions").upsert(payload, {
    onConflict: "student_id,week_id",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/submissions");
  revalidatePath("/feedback");
  revalidatePath("/admin/submissions");
  return { success: "Submission saved." };
}
