import { SubmissionReviewForm } from "@/components/forms/admin-forms";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubmissionsForCurrentUser } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissionsForCurrentUser();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin / Submissions"
        title="Review student submissions"
        description="Update workflow status and monitor weekly output across the program."
      />

      <Card>
        <CardHeader>
          <CardTitle>Submission queue</CardTitle>
          <CardDescription>Admins can review all submissions and change their status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {submissions.map((submission) => (
            <div key={submission.id} className="rounded-3xl border border-border/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold">
                    {submission.student.full_name} · Week {submission.week.week_number}
                  </h2>
                  <p className="text-sm text-muted-foreground">{submission.week.title}</p>
                </div>
                <StatusBadge status={submission.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Updated {formatDate(submission.updated_at)}</span>
                {submission.link_url ? <span>Link included</span> : null}
                {submission.file_path ? <span>File included</span> : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {submission.notes ?? "No student note provided."}
              </p>
              <div className="mt-4">
                <SubmissionReviewForm submission={submission} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
