import { FeedbackAdminForm, SessionNoteAdminForm } from "@/components/forms/admin-forms";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedbackForCurrentUser, getSubmissionsForCurrentUser } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function AdminFeedbackPage() {
  const [submissions, feedbackItems] = await Promise.all([
    getSubmissionsForCurrentUser(),
    getFeedbackForCurrentUser(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin / Feedback"
        title="Mentor feedback and notes"
        description="Leave structured review comments and capture internal coaching notes for each student."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <FeedbackAdminForm submissions={submissions} />
        <SessionNoteAdminForm submissions={submissions} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback log</CardTitle>
          <CardDescription>Recent feedback entries saved in the system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-border/70 p-5">
              <div className="flex flex-wrap gap-3">
                <h2 className="font-semibold">
                  {item.student.full_name} · Week {item.week.week_number}
                </h2>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {item.visibility}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.comment}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {formatDate(item.created_at)}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
