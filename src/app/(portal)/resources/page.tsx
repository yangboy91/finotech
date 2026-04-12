import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getResources } from "@/lib/data";

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Resources"
        title="Shared learning resources"
        description="Templates, docs, and reference materials attached to the internship curriculum."
      />

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="border-border/70">
            <CardHeader>
              <CardDescription>{resource.resource_type}</CardDescription>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Open resource
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
