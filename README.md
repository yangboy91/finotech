# FinoTech BA/DA Internship Hub

Production-ready internal internship portal built with Next.js 15, TypeScript, Tailwind, shadcn/ui, and Supabase.

## Features

- Student and admin roles
- Student dashboard
- 8-week curriculum pages
- Weekly submissions with link or file upload
- Feedback system
- Admin pages for weeks, resources, submissions, and feedback
- Seeded internship curriculum
- Supabase auth, database, and storage integration
- Demo fallback mode when Supabase is not configured locally

## Folder structure

```txt
src/
  app/
    (auth)/login
    (portal)/dashboard
    (portal)/weeks
    (portal)/weeks/[weekId]
    (portal)/submissions
    (portal)/resources
    (portal)/feedback
    (admin)/admin
    (admin)/admin/weeks
    (admin)/admin/resources
    (admin)/admin/submissions
    (admin)/admin/feedback
    actions/
  components/
    forms/
    ui/
  lib/
    auth.ts
    constants.ts
    data.ts
    demo-store.ts
    env.ts
    format.ts
    supabase/
supabase/
  migrations/
scripts/
  seed-supabase.mjs
```

## Database tables

- `profiles`
- `weeks`
- `week_knowledge_items`
- `week_tasks`
- `week_deliverables`
- `resources`
- `week_resources`
- `submissions`
- `feedback`
- `session_notes`

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create a Supabase project.

3. Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

4. Run the SQL migration in [`supabase/migrations/20260411170000_finotech_portal.sql`](/Users/stevenyang/trading-frontend/FinoTech/supabase/migrations/20260411170000_finotech_portal.sql).

5. Seed the database and sample accounts:

```bash
npm run seed:supabase
```

6. Start the app:

```bash
npm run dev
```

## Sample accounts

- Admin: `admin@finotech.xyz` / `FinotechAdmin123!`
- Student: `student@finotech.xyz` / `FinotechStudent123!`

## Demo mode

If Supabase env vars are missing, the app runs in a local demo mode backed by a JSON store in `/tmp`. This makes the UI previewable before infrastructure is configured. The same sample admin/student emails work in demo mode, and password is optional there.

## Verification checklist

- Login with the student and admin accounts
- Confirm all 8 weeks render on `/weeks`
- Submit a link or file from `/submissions`
- Review submission status on `/admin/submissions`
- Leave feedback on `/admin/feedback`
- Confirm student feedback appears on `/feedback`

## Notes

- Uploads use the `submission-files` Supabase Storage bucket.
- RLS policies enforce student/admin access.
- Maintainability is prioritized over highly abstracted patterns.
