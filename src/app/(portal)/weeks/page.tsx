import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeeks } from "@/lib/data";

export default async function WeeksPage() {
  const weeks = await getWeeks();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Weeks"
        title="8-week internship curriculum"
        description="Every week includes learning goals, tasks, deliverables, and attached resources."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {weeks.map((week) => (
          <Card key={week.id} className="border-border/70">
            <CardHeader>
              <CardDescription>Week {week.week_number}</CardDescription>
              <CardTitle className="text-xl">{week.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{week.summary}</p>
              <p className="text-sm font-medium text-foreground">{week.objective}</p>
              <Button asChild variant="outline" className="rounded-full">
                <Link href={`/weeks/${week.slug}`}>Open week detail</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
