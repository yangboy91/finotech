"use server";

import { revalidatePath } from "next/cache";

import { requireRole } from "@/lib/auth";
import { readDemoStore, writeDemoStore } from "@/lib/demo-store";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminFormState = {
  error?: string;
  success?: string;
};

export async function updateWeekAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireRole("admin");

  const weekId = String(formData.get("weekId") ?? "");
  const summary = String(formData.get("summary") ?? "").trim();
  const objective = String(formData.get("objective") ?? "").trim();
  const published = String(formData.get("published") ?? "") === "on";

  if (!weekId || !summary || !objective) {
    return { error: "Week summary and objective are required." };
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    const week = store.weeks.find((item) => item.id === weekId);
    if (!week) {
      return { error: "Week not found." };
    }
    week.summary = summary;
    week.objective = objective;
    week.published = published;
    await writeDemoStore(store);
    revalidatePath("/admin");
    revalidatePath("/admin/weeks");
    revalidatePath("/weeks");
    return { success: "Week updated." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("weeks")
    .update({ summary, objective, published })
    .eq("id", weekId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/weeks");
  revalidatePath("/weeks");
  return { success: "Week updated." };
}

export async function createResourceAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireRole("admin");

  const weekId = String(formData.get("weekId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const resourceType = String(formData.get("resourceType") ?? "doc");
  const url = String(formData.get("url") ?? "").trim();

  if (!weekId || !title || !description || !url) {
    return { error: "All resource fields are required." };
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    const resourceId = `resource_${Date.now()}`;
    store.resources.unshift({
      id: resourceId,
      title,
      description,
      resource_type: resourceType as "doc" | "template" | "video" | "link",
      url,
      created_at: new Date().toISOString(),
    });
    store.weekResources.push({
      id: `week_resource_${Date.now()}`,
      week_id: weekId,
      resource_id: resourceId,
    });
    await writeDemoStore(store);
    revalidatePath("/admin/resources");
    revalidatePath("/resources");
    return { success: "Resource added." };
  }

  const supabase = await createServerSupabaseClient();
  const { data: resource, error: resourceError } = await supabase
    .from("resources")
    .insert({
      title,
      description,
      resource_type: resourceType,
      url,
    })
    .select()
    .single();

  if (resourceError || !resource) {
    return { error: resourceError?.message ?? "Resource creation failed." };
  }

  const { error: linkError } = await supabase.from("week_resources").insert({
    week_id: weekId,
    resource_id: resource.id,
  });

  if (linkError) {
    return { error: linkError.message };
  }

  revalidatePath("/admin/resources");
  revalidatePath("/resources");
  return { success: "Resource added." };
}

export async function updateSubmissionStatusAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireRole("admin");

  const submissionId = String(formData.get("submissionId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!submissionId || !status) {
    return { error: "Submission and status are required." };
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    const submission = store.submissions.find((item) => item.id === submissionId);
    if (!submission) {
      return { error: "Submission not found." };
    }
    submission.status = status as typeof submission.status;
    submission.updated_at = new Date().toISOString();
    await writeDemoStore(store);
    revalidatePath("/admin/submissions");
    revalidatePath("/submissions");
    return { success: "Submission status updated." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", submissionId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/submissions");
  revalidatePath("/submissions");
  return { success: "Submission status updated." };
}

export async function createFeedbackAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const currentUser = await requireRole("admin");

  const submissionId = String(formData.get("submissionId") ?? "");
  const comment = String(formData.get("comment") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 0);
  const visibility = String(formData.get("visibility") ?? "student");

  if (!submissionId || !comment) {
    return { error: "Submission and comment are required." };
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    store.feedback.unshift({
      id: `feedback_${Date.now()}`,
      submission_id: submissionId,
      author_id: currentUser.profile.id,
      visibility: visibility as "student" | "internal",
      rating: Number.isFinite(rating) && rating > 0 ? rating : null,
      comment,
      created_at: new Date().toISOString(),
    });
    await writeDemoStore(store);
    revalidatePath("/admin/feedback");
    revalidatePath("/feedback");
    revalidatePath("/admin/submissions");
    return { success: "Feedback added." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("feedback").insert({
    submission_id: submissionId,
    author_id: currentUser.profile.id,
    visibility,
    rating: Number.isFinite(rating) && rating > 0 ? rating : null,
    comment,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/feedback");
  revalidatePath("/feedback");
  revalidatePath("/admin/submissions");
  return { success: "Feedback added." };
}

export async function createSessionNoteAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  const currentUser = await requireRole("admin");

  const studentId = String(formData.get("studentId") ?? "");
  const weekId = String(formData.get("weekId") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  if (!studentId || !weekId || !note) {
    return { error: "Student, week, and note are required." };
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    store.sessionNotes.unshift({
      id: `session_note_${Date.now()}`,
      student_id: studentId,
      week_id: weekId,
      author_id: currentUser.profile.id,
      note,
      created_at: new Date().toISOString(),
    });
    await writeDemoStore(store);
    revalidatePath("/admin/feedback");
    return { success: "Session note saved." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("session_notes").insert({
    student_id: studentId,
    week_id: weekId,
    author_id: currentUser.profile.id,
    note,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/feedback");
  return { success: "Session note saved." };
}
