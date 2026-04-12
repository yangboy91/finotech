import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { getDashboardData } from "@/lib/data";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const approvedCount = data.submissions.filter((item) => item.status === "approved").length;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${data.profile.full_name.split(" ")[0]}`}
        description="Track weekly learning goals, manage submissions, and stay aligned with mentor feedback."
        badge={data.profile.role}
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          label="Weeks in curriculum"
          value={String(data.weeks.length)}
          helper="Seeded and ready for the full internship cycle."
        />
        <StatCard
          label="Submissions logged"
          value={String(data.submissions.length)}
          helper="Includes link and file-based submissions."
        />
        <StatCard
          label="Approved work"
          value={String(approvedCount)}
          helper="Work items that have already cleared review."
        />
        <StatCard
          label="Resource library"
          value={String(data.resources.length)}
          helper="Templates, docs, and references attached to the program."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Internship roadmap</CardTitle>
            <CardDescription>
              All 8 weeks are preloaded so students can see the full learning arc.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.weeks.map((week) => (
              <div
                key={week.id}
                className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-muted/30 p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Week {week.week_number}
                  </p>
                  <h2 className="text-lg font-semibold">{week.title}</h2>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                    {week.summary}
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/weeks/${week.slug}`}>
                    View week
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest submissions</CardTitle>
            <CardDescription>Recent work and review state.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.submissions.length ? (
              data.submissions.slice(0, 4).map((submission) => (
                <div key={submission.id} className="rounded-3xl border border-border/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">
                        Week {submission.week.week_number}
                      </p>
                      <p className="text-sm text-muted-foreground">{submission.week.title}</p>
                    </div>
                    <StatusBadge status={submission.status} />
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Updated {formatDate(submission.updated_at)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No submissions yet. Head to the submissions page to create your first one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
