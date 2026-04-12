import { cache } from "react";

import { getCurrentUser, requireUser } from "@/lib/auth";
import { readDemoStore } from "@/lib/demo-store";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  DashboardData,
  Feedback,
  FeedbackWithContext,
  Profile,
  Resource,
  Submission,
  SubmissionWithContext,
  Week,
  WeekBundle,
} from "@/lib/types";

async function getSupabaseWeeks() {
  const supabase = await createServerSupabaseClient();
  const { data: weeks } = await supabase
    .from("weeks")
    .select("*")
    .order("week_number");
  return (weeks ?? []) as Week[];
}

export const getWeeks = cache(async (): Promise<Week[]> => {
  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    return [...store.weeks].sort((a, b) => a.week_number - b.week_number);
  }

  return getSupabaseWeeks();
});

export async function getWeekBundle(weekId: string): Promise<WeekBundle | null> {
  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    const week = store.weeks.find(
      (item) => item.id === weekId || item.slug === weekId,
    );

    if (!week) {
      return null;
    }

    const resourceIds = store.weekResources
      .filter((item) => item.week_id === week.id)
      .map((item) => item.resource_id);

    return {
      week,
      knowledgeItems: store.weekKnowledgeItems
        .filter((item) => item.week_id === week.id)
        .sort((a, b) => a.sort_order - b.sort_order),
      tasks: store.weekTasks
        .filter((item) => item.week_id === week.id)
        .sort((a, b) => a.sort_order - b.sort_order),
      deliverables: store.weekDeliverables
        .filter((item) => item.week_id === week.id)
        .sort((a, b) => a.sort_order - b.sort_order),
      resources: store.resources.filter((resource) =>
        resourceIds.includes(resource.id),
      ),
    };
  }

  const supabase = await createServerSupabaseClient();
  const { data: week } = await supabase
    .from("weeks")
    .select("*")
    .or(`id.eq.${weekId},slug.eq.${weekId}`)
    .single<Week>();

  if (!week) {
    return null;
  }

  const [{ data: knowledgeItems }, { data: tasks }, { data: deliverables }, { data: weekResources }] =
    await Promise.all([
      supabase
        .from("week_knowledge_items")
        .select("*")
        .eq("week_id", week.id)
        .order("sort_order"),
      supabase.from("week_tasks").select("*").eq("week_id", week.id).order("sort_order"),
      supabase
        .from("week_deliverables")
        .select("*")
        .eq("week_id", week.id)
        .order("sort_order"),
      supabase
        .from("week_resources")
        .select("resources(*)")
        .eq("week_id", week.id),
    ]);

  return {
    week,
    knowledgeItems: knowledgeItems ?? [],
    tasks: tasks ?? [],
    deliverables: deliverables ?? [],
    resources:
      weekResources?.flatMap((item) =>
        Array.isArray(item.resources) ? item.resources : item.resources ? [item.resources] : [],
      ) ?? [],
  };
}

export async function getResources() {
  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    return store.resources;
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("resources").select("*").order("created_at", {
    ascending: false,
  });
  return (data ?? []) as Resource[];
}

export async function getSubmissionsForCurrentUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [] as SubmissionWithContext[];
  }

  if (!isSupabaseConfigured) {
    const store = await readDemoStore();
    const submissions = store.submissions.filter((submission) =>
      currentUser.profile.role === "admin"
        ? true
        : submission.student_id === currentUser.profile.id,
    );

    return submissions.map((submission) => ({
      ...submission,
      week: store.weeks.find((week) => week.id === submission.week_id)!,
      student: store.profiles.find((profile) => profile.id === submission.student_id)!,
      feedbackItems: store.feedback.filter(
        (feedback) => feedback.submission_id === submission.id,
      ),
    }));
  }

  const supabase = await createServerSupabaseClient();
  const query = supabase
    .from("submissions")
    .select("*, weeks(*), profiles!submissions_student_id_fkey(*), feedback(*)")
    .order("submitted_at", { ascending: false });

  if (currentUser.profile.role === "student") {
    query.eq("student_id", currentUser.profile.id);
  }

  const { data } = await query;

  return (
    data?.map((item) => ({
      ...(item as unknown as Submission),
      week: item.weeks as unknown as Week,
      student: item.profiles as unknown as Profile,
      feedbackItems: (item.feedback ?? []) as Feedback[],
    })) ?? []
  );
}

export async function getFeedbackForCurrentUser() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [] as FeedbackWithContext[];
  }

  const submissions = await getSubmissionsForCurrentUser();
  const filtered = submissions.flatMap((submission) =>
    submission.feedbackItems.map((feedbackItem) => ({
      ...feedbackItem,
      submission,
      week: submission.week,
      student: submission.student,
      author:
        currentUser.profile.role === "admin"
          ? currentUser.profile
          : submission.student,
    })),
  );

  return filtered;
}

export async function getDashboardData(): Promise<DashboardData> {
  const currentUser = await requireUser();

  const [weeks, submissions, feedbackItems, resources] = await Promise.all([
    getWeeks(),
    getSubmissionsForCurrentUser(),
    getFeedbackForCurrentUser(),
    getResources(),
  ]);

  return {
    profile: currentUser.profile,
    weeks,
    submissions,
    feedbackItems,
    resources,
  };
}

export async function getAdminOverview() {
  const [weeks, resources, submissions, feedbackItems] = await Promise.all([
    getWeeks(),
    getResources(),
    getSubmissionsForCurrentUser(),
    getFeedbackForCurrentUser(),
  ]);

  return {
    weeks,
    resources,
    submissions,
    feedbackItems,
  };
}
