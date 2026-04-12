export type UserRole = "student" | "admin";

export type SubmissionStatus =
  | "not_started"
  | "submitted"
  | "in_review"
  | "needs_revision"
  | "approved";

export type FeedbackVisibility = "student" | "internal";

export type Profile = {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  headline: string | null;
  created_at: string;
};

export type Week = {
  id: string;
  slug: string;
  week_number: number;
  title: string;
  summary: string;
  objective: string;
  published: boolean;
  created_at: string;
};

export type WeekKnowledgeItem = {
  id: string;
  week_id: string;
  sort_order: number;
  title: string;
  description: string;
};

export type WeekTask = {
  id: string;
  week_id: string;
  sort_order: number;
  title: string;
  description: string;
};

export type WeekDeliverable = {
  id: string;
  week_id: string;
  sort_order: number;
  title: string;
  description: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  resource_type: "doc" | "template" | "video" | "link";
  url: string;
  created_at: string;
};

export type WeekResource = {
  id: string;
  week_id: string;
  resource_id: string;
};

export type Submission = {
  id: string;
  student_id: string;
  week_id: string;
  submission_type: "link" | "file";
  link_url: string | null;
  file_path: string | null;
  notes: string | null;
  status: SubmissionStatus;
  submitted_at: string;
  updated_at: string;
};

export type Feedback = {
  id: string;
  submission_id: string;
  author_id: string;
  visibility: FeedbackVisibility;
  rating: number | null;
  comment: string;
  created_at: string;
};

export type SessionNote = {
  id: string;
  student_id: string;
  week_id: string;
  author_id: string;
  note: string;
  created_at: string;
};

export type WeekBundle = {
  week: Week;
  knowledgeItems: WeekKnowledgeItem[];
  tasks: WeekTask[];
  deliverables: WeekDeliverable[];
  resources: Resource[];
};

export type SubmissionWithContext = Submission & {
  week: Week;
  student: Profile;
  feedbackItems: Feedback[];
};

export type FeedbackWithContext = Feedback & {
  submission: Submission;
  week: Week;
  student: Profile;
  author: Profile;
};

export type DashboardData = {
  profile: Profile;
  weeks: Week[];
  submissions: SubmissionWithContext[];
  feedbackItems: FeedbackWithContext[];
  resources: Resource[];
};

export type DemoStore = {
  profiles: Profile[];
  weeks: Week[];
  weekKnowledgeItems: WeekKnowledgeItem[];
  weekTasks: WeekTask[];
  weekDeliverables: WeekDeliverable[];
  resources: Resource[];
  weekResources: WeekResource[];
  submissions: Submission[];
  feedback: Feedback[];
  sessionNotes: SessionNote[];
};

export type AuthUser = {
  profile: Profile;
  source: "supabase" | "demo";
};
