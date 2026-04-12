# FinoTech BA/DA Internship Hub

Internal internship portal for the FinoTech BA/DA program, built with Next.js 15, TypeScript, Tailwind, shadcn/ui, and Supabase.

## Overview

This project is a desktop-first but responsive internal operations portal for running an 8-week business analysis and data analytics internship program.

It includes:

- Student and admin roles
- Student dashboard and progress tracking
- 8-week curriculum pages
- Weekly submissions with link or file upload
- Structured mentor feedback
- Admin tooling for weeks, resources, submissions, and notes
- Supabase auth, database, storage, and RLS policies
- Seed data for the full 8-week internship flow

## Product structure

- Dashboard
- Weeks list
- Week detail page
- Submissions page
- Resources page
- Feedback page
- Admin pages

## Tech stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth
- Supabase Postgres
- Supabase Storage

## Key features

### Student experience

- View all 8 internship weeks
- Read weekly objectives, knowledge items, tasks, and deliverables
- Submit work by file upload or external link
- Review mentor feedback and submission status
- Access a shared resource library

### Admin experience

- Manage week summaries and publish state
- Add and organize learning resources
- Review and update submission statuses
- Leave student-visible feedback
- Save internal-only session notes

### Data model

The app uses the following tables:

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

## Repository structure

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
scripts/
  seed-supabase.mjs
supabase/
  migrations/
```

## Local setup

1. Install dependencies.

```bash
npm install
```

2. Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

3. Fill in the required Supabase environment variables.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

4. Run the SQL migration in [supabase/migrations/20260411170000_finotech_portal.sql](/Users/stevenyang/trading-frontend/FinoTech/supabase/migrations/20260411170000_finotech_portal.sql).

5. Seed the project.

```bash
npm run seed:supabase
```

6. Start the app.

```bash
npm run dev
```

## Sample accounts

- Admin: `admin@finotech.xyz` / `FinotechAdmin123!`
- Student: `student@finotech.xyz` / `FinotechStudent123!`

## Production deployment

- Portal URL: [hub.finotech.xyz](https://hub.finotech.xyz)
- Frontend hosting: Vercel
- Primary marketing site: `finotech.xyz` remains on Cloudflare
- Database and auth: Supabase

Production is configured with real Supabase environment variables, seeded internship data, role-based auth, and the `submission-files` private storage bucket.

## Demo mode

If Supabase is not configured yet, the app falls back to a local demo mode backed by `/tmp/finotech-demo-store.json`.

This makes it possible to preview the complete portal flow before wiring up infrastructure.

## Verification

- `npm run lint`
- `npm run build`

Validated in production on April 12, 2026:

- `https://hub.finotech.xyz/login` returns `200`
- Unauthenticated access to `/dashboard`, `/admin`, and `/weeks` redirects to `/login`
- Supabase auth works for both seeded sample accounts
- All 8 internship weeks are present in the production database
- A student submission can be created successfully
- An admin feedback item can be created and read back successfully

Validated flows in local/demo mode:

- Protected routes redirect unauthenticated users to `/login`
- Seeded internship weeks render correctly
- Student submissions render and can be updated in demo mode
- Admin feedback pages render with seeded review data

## Notes

- File uploads use the `submission-files` Supabase Storage bucket
- RLS policies enforce student/admin access rules
- The implementation prioritizes maintainability and reusable components over unnecessary abstraction
