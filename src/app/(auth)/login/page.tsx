import { APP_NAME } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/env";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(183,215,255,0.55),transparent_36%),linear-gradient(180deg,#f8fbff_0%,#eef3f8_100%)] px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              FinoTech internship operations
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950">
              {APP_NAME}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              A polished internal workspace for student progress, weekly deliverables,
              mentor feedback, and admin program management.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Student dashboard", "See weekly progress, resources, and submissions in one place."],
              ["Admin review", "Track cohorts, review work, and leave structured feedback."],
              ["Seeded curriculum", "8 internship weeks are ready out of the box."],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-sm shadow-slate-200/50 backdrop-blur"
              >
                <h2 className="text-base font-semibold text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
          {!isSupabaseConfigured ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50/90 p-5 text-sm leading-6 text-amber-900">
              Demo mode is active because Supabase environment variables are not set yet.
              You can still preview the full app with the sample student/admin accounts.
            </div>
          ) : null}
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
