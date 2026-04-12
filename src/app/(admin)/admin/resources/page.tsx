import { ResourceAdminForm } from "@/components/forms/admin-forms";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getResources, getWeeks } from "@/lib/data";

export default async function AdminResourcesPage() {
  const [weeks, resources] = await Promise.all([getWeeks(), getResources()]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin / Resources"
        title="Manage resources"
        description="Create and maintain the shared internship resource library."
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ResourceAdminForm weeks={weeks} />
        <Card>
          <CardHeader>
            <CardTitle>Current library</CardTitle>
            <CardDescription>All resources currently attached to the portal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="rounded-3xl border border-border/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {resource.resource_type}
                </p>
                <h2 className="mt-2 font-semibold">{resource.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {resource.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
