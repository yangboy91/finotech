import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedbackForCurrentUser } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function FeedbackPage() {
  const feedbackItems = await getFeedbackForCurrentUser();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Feedback"
        title="Mentor feedback"
        description="Review comments, ratings, and improvement notes attached to your submissions."
      />

      <Card>
        <CardHeader>
          <CardTitle>Review log</CardTitle>
          <CardDescription>Visible student-facing and admin-only notes will appear here based on role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedbackItems.length ? (
            feedbackItems.map((item) => (
              <div key={item.id} className="rounded-3xl border border-border/70 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-semibold">
                    Week {item.week.week_number}: {item.week.title}
                  </h2>
                  {item.rating ? (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      Rating {item.rating}/5
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.comment}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.visibility} · {formatDate(item.created_at)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Feedback will appear here once an admin reviews a submission.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
