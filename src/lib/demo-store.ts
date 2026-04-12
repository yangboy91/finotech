import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { WEEK_SEED_CONTENT } from "@/lib/constants";
import type {
  DemoStore,
  Feedback,
  Profile,
  Resource,
  SessionNote,
  Submission,
  Week,
  WeekDeliverable,
  WeekKnowledgeItem,
  WeekResource,
  WeekTask,
} from "@/lib/types";

const DEMO_PATH = path.join("/tmp", "finotech-demo-store.json");

function isoNow() {
  return new Date().toISOString();
}

function id(prefix: string, suffix: string) {
  return `${prefix}_${suffix}`;
}

export function createDefaultDemoStore(): DemoStore {
  const now = isoNow();
  const weeks: Week[] = WEEK_SEED_CONTENT.map((item) => ({
    id: id("week", String(item.week_number)),
    slug: item.slug,
    week_number: item.week_number,
    title: item.title,
    summary: item.summary,
    objective: item.objective,
    published: true,
    created_at: now,
  }));

  const weekKnowledgeItems: WeekKnowledgeItem[] = WEEK_SEED_CONTENT.flatMap((item) =>
    item.knowledgeItems.map((knowledgeItem, index) => ({
      id: id("knowledge", `${item.week_number}_${index + 1}`),
      week_id: id("week", String(item.week_number)),
      sort_order: index + 1,
      title: knowledgeItem.title,
      description: knowledgeItem.description,
    })),
  );

  const weekTasks: WeekTask[] = WEEK_SEED_CONTENT.flatMap((item) =>
    item.tasks.map((task, index) => ({
      id: id("task", `${item.week_number}_${index + 1}`),
      week_id: id("week", String(item.week_number)),
      sort_order: index + 1,
      title: task.title,
      description: task.description,
    })),
  );

  const weekDeliverables: WeekDeliverable[] = WEEK_SEED_CONTENT.flatMap((item) =>
    item.deliverables.map((deliverable, index) => ({
      id: id("deliverable", `${item.week_number}_${index + 1}`),
      week_id: id("week", String(item.week_number)),
      sort_order: index + 1,
      title: deliverable.title,
      description: deliverable.description,
    })),
  );

  const resources: Resource[] = WEEK_SEED_CONTENT.flatMap((item) =>
    item.resources.map((resource, index) => ({
      id: id("resource", `${item.week_number}_${index + 1}`),
      title: resource.title,
      description: resource.description,
      resource_type: resource.resource_type,
      url: resource.url,
      created_at: now,
    })),
  );

  const weekResources: WeekResource[] = WEEK_SEED_CONTENT.flatMap((item) =>
    item.resources.map((_, index) => ({
      id: id("week_resource", `${item.week_number}_${index + 1}`),
      week_id: id("week", String(item.week_number)),
      resource_id: id("resource", `${item.week_number}_${index + 1}`),
    })),
  );

  const profiles: Profile[] = [
    {
      id: "profile_admin",
      user_id: "demo_admin_user",
      email: "admin@finotech.xyz",
      full_name: "FinoTech Admin",
      role: "admin",
      headline: "Program lead",
      created_at: now,
    },
    {
      id: "profile_student",
      user_id: "demo_student_user",
      email: "student@finotech.xyz",
      full_name: "Demo Student",
      role: "student",
      headline: "BA/DA intern",
      created_at: now,
    },
  ];

  const submissions: Submission[] = [
    {
      id: "submission_1",
      student_id: "profile_student",
      week_id: "week_1",
      submission_type: "link",
      link_url: "https://docs.google.com/document/d/demo-week-1",
      file_path: null,
      notes: "Initial company memo draft and stakeholder map.",
      status: "in_review",
      submitted_at: now,
      updated_at: now,
    },
  ];

  const feedback: Feedback[] = [
    {
      id: "feedback_1",
      submission_id: "submission_1",
      author_id: "profile_admin",
      visibility: "student",
      rating: 4,
      comment: "Strong structure. Tighten the metric hypotheses and add one more competitor benchmark.",
      created_at: now,
    },
  ];

  const sessionNotes: SessionNote[] = [
    {
      id: "session_note_1",
      student_id: "profile_student",
      week_id: "week_1",
      author_id: "profile_admin",
      note: "Student communicates clearly and asks good framing questions. Recommend more depth on business risks.",
      created_at: now,
    },
  ];

  return {
    profiles,
    weeks,
    weekKnowledgeItems,
    weekTasks,
    weekDeliverables,
    resources,
    weekResources,
    submissions,
    feedback,
    sessionNotes,
  };
}

export async function readDemoStore(): Promise<DemoStore> {
  try {
    const raw = await readFile(DEMO_PATH, "utf8");
    return JSON.parse(raw) as DemoStore;
  } catch {
    const store = createDefaultDemoStore();
    await writeDemoStore(store);
    return store;
  }
}

export async function writeDemoStore(store: DemoStore) {
  await mkdir(path.dirname(DEMO_PATH), { recursive: true });
  await writeFile(DEMO_PATH, JSON.stringify(store, null, 2), "utf8");
}
