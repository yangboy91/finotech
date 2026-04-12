import { WeekAdminForm } from "@/components/forms/admin-forms";
import { PageHeader } from "@/components/page-header";
import { getWeeks } from "@/lib/data";

export default async function AdminWeeksPage() {
  const weeks = await getWeeks();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin / Weeks"
        title="Manage curriculum weeks"
        description="Update summaries, objectives, and publish state for each internship week."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        {weeks.map((week) => (
          <WeekAdminForm key={week.id} week={week} />
        ))}
      </div>
    </div>
  );
}
