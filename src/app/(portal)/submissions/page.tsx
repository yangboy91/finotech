import { PageHeader } from "@/components/page-header";
import { SubmissionForm } from "@/components/forms/submission-form";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubmissionsForCurrentUser, getWeeks } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function SubmissionsPage() {
  const [weeks, submissions] = await Promise.all([
    getWeeks(),
    getSubmissionsForCurrentUser(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Submissions"
        title="Weekly work submissions"
        description="Students can upload files or share links, while admins can monitor the review pipeline."
      />

      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <SubmissionForm weeks={weeks} />
        <Card>
          <CardHeader>
            <CardTitle>Submission history</CardTitle>
            <CardDescription>Track current status and latest activity per week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {submissions.length ? (
              submissions.map((submission) => (
                <div key={submission.id} className="rounded-3xl border border-border/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        Week {submission.week.week_number}: {submission.week.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submission.notes ?? "No additional notes"}
                      </p>
                    </div>
                    <StatusBadge status={submission.status} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Updated {formatDate(submission.updated_at)}</span>
                    {submission.link_url ? <span>Link submitted</span> : null}
                    {submission.file_path ? <span>File uploaded</span> : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No submissions yet. Use the form to submit the current week&apos;s work.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
