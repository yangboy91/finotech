import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminOverview } from "@/lib/data";

export default async function AdminOverviewPage() {
  const data = await getAdminOverview();
  const pending = data.submissions.filter((submission) => submission.status !== "approved").length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin"
        title="Program operations overview"
        description="Manage weekly curriculum, resources, submission review, and mentor feedback from one internal workspace."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard label="Weeks" value={String(data.weeks.length)} helper="Current seeded curriculum items." />
        <StatCard label="Resources" value={String(data.resources.length)} helper="Docs, templates, and links available." />
        <StatCard label="Submissions" value={String(data.submissions.length)} helper="Total student work items in the system." />
        <StatCard label="Pending review" value={String(pending)} helper="Anything not yet approved needs attention." />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin scope</CardTitle>
          <CardDescription>Use the admin pages to manage content and review student progress.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {[
            ["Weeks", "Adjust weekly summaries, objectives, and publish state."],
            ["Resources", "Add or update supporting materials for any internship week."],
            ["Submissions", "Review work, update status, and keep the pipeline moving."],
            ["Feedback", "Leave mentor feedback and store internal coaching notes."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-3xl border border-border/70 p-5">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
