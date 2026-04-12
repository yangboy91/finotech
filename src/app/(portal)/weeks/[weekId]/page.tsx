import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeekBundle } from "@/lib/data";

export default async function WeekDetailPage({
  params,
}: {
  params: Promise<{ weekId: string }>;
}) {
  const { weekId } = await params;
  const bundle = await getWeekBundle(weekId);

  if (!bundle) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={`Week ${bundle.week.week_number}`}
        title={bundle.week.title}
        description={bundle.week.summary}
        badge={bundle.week.published ? "published" : "draft"}
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Learning objective</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">{bundle.week.objective}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Knowledge items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bundle.knowledgeItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border/70 p-4">
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bundle.tasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-border/70 p-4">
                <h2 className="font-semibold">{task.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {task.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expected deliverables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bundle.deliverables.map((deliverable) => (
              <div key={deliverable.id} className="rounded-2xl border border-border/70 p-4">
                <h2 className="font-semibold">{deliverable.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {deliverable.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Linked resources</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          {bundle.resources.map((resource) => (
            <a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border/70 p-4 transition-colors hover:bg-accent"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {resource.resource_type}
              </p>
              <h2 className="mt-2 font-semibold">{resource.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {resource.description}
              </p>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
