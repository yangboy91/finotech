create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role text not null check (role in ('student', 'admin')) default 'student',
  headline text,
  created_at timestamptz not null default now()
);

create table if not exists public.weeks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  week_number int not null unique,
  title text not null,
  summary text not null,
  objective text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.week_knowledge_items (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.weeks(id) on delete cascade,
  sort_order int not null default 1,
  title text not null,
  description text not null
);

create table if not exists public.week_tasks (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.weeks(id) on delete cascade,
  sort_order int not null default 1,
  title text not null,
  description text not null
);

create table if not exists public.week_deliverables (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.weeks(id) on delete cascade,
  sort_order int not null default 1,
  title text not null,
  description text not null
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  resource_type text not null check (resource_type in ('doc', 'template', 'video', 'link')),
  url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.week_resources (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.weeks(id) on delete cascade,
  resource_id uuid not null references public.resources(id) on delete cascade,
  unique (week_id, resource_id)
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  week_id uuid not null references public.weeks(id) on delete cascade,
  submission_type text not null check (submission_type in ('file', 'link')),
  link_url text,
  file_path text,
  notes text,
  status text not null check (status in ('not_started', 'submitted', 'in_review', 'needs_revision', 'approved')) default 'submitted',
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, week_id)
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  visibility text not null check (visibility in ('student', 'internal')) default 'student',
  rating int check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.session_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  week_id uuid not null references public.weeks(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists submissions_student_idx on public.submissions(student_id);
create index if not exists submissions_week_idx on public.submissions(week_id);
create index if not exists feedback_submission_idx on public.feedback(submission_id);
create index if not exists session_notes_student_idx on public.session_notes(student_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, new.raw_user_meta_data ->> 'email'),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(coalesce(new.email, 'Student'), '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'role', 'student')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin(user_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = user_uuid
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.weeks enable row level security;
alter table public.week_knowledge_items enable row level security;
alter table public.week_tasks enable row level security;
alter table public.week_deliverables enable row level security;
alter table public.resources enable row level security;
alter table public.week_resources enable row level security;
alter table public.submissions enable row level security;
alter table public.feedback enable row level security;
alter table public.session_notes enable row level security;

create policy "profiles_self_or_admin_select"
on public.profiles for select
to authenticated
using (user_id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_self_update"
on public.profiles for update
to authenticated
using (user_id = auth.uid() or public.is_admin(auth.uid()))
with check (user_id = auth.uid() or public.is_admin(auth.uid()));

create policy "weeks_select_published_or_admin"
on public.weeks for select
to authenticated
using (published = true or public.is_admin(auth.uid()));

create policy "weeks_admin_manage"
on public.weeks for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "knowledge_select"
on public.week_knowledge_items for select
to authenticated
using (true);

create policy "knowledge_admin_manage"
on public.week_knowledge_items for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "tasks_select"
on public.week_tasks for select
to authenticated
using (true);

create policy "tasks_admin_manage"
on public.week_tasks for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "deliverables_select"
on public.week_deliverables for select
to authenticated
using (true);

create policy "deliverables_admin_manage"
on public.week_deliverables for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "resources_select"
on public.resources for select
to authenticated
using (true);

create policy "resources_admin_manage"
on public.resources for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "week_resources_select"
on public.week_resources for select
to authenticated
using (true);

create policy "week_resources_admin_manage"
on public.week_resources for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "submissions_student_select_own"
on public.submissions for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = submissions.student_id
      and profiles.user_id = auth.uid()
  ) or public.is_admin(auth.uid())
);

create policy "submissions_student_insert_own"
on public.submissions for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = submissions.student_id
      and profiles.user_id = auth.uid()
      and profiles.role = 'student'
  )
);

create policy "submissions_student_update_own_or_admin"
on public.submissions for update
to authenticated
using (
  public.is_admin(auth.uid()) or exists (
    select 1
    from public.profiles
    where profiles.id = submissions.student_id
      and profiles.user_id = auth.uid()
      and profiles.role = 'student'
  )
)
with check (
  public.is_admin(auth.uid()) or exists (
    select 1
    from public.profiles
    where profiles.id = submissions.student_id
      and profiles.user_id = auth.uid()
      and profiles.role = 'student'
  )
);

create policy "feedback_admin_select_all"
on public.feedback for select
to authenticated
using (
  public.is_admin(auth.uid()) or (
    visibility = 'student'
    and exists (
      select 1
      from public.submissions
      join public.profiles on profiles.id = submissions.student_id
      where submissions.id = feedback.submission_id
        and profiles.user_id = auth.uid()
    )
  )
);

create policy "feedback_admin_manage"
on public.feedback for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

create policy "session_notes_admin_only"
on public.session_notes for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

insert into storage.buckets (id, name, public)
values ('submission-files', 'submission-files', false)
on conflict (id) do nothing;

create policy "students_upload_own_submission_files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'submission-files'
  and (storage.foldername(name))[1] = (
    select id::text
    from public.profiles
    where user_id = auth.uid()
  )
);

create policy "students_read_own_submission_files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'submission-files'
  and (
    public.is_admin(auth.uid()) or
    (storage.foldername(name))[1] = (
      select id::text
      from public.profiles
      where user_id = auth.uid()
    )
  )
);

create policy "admins_manage_submission_files"
on storage.objects for all
to authenticated
using (bucket_id = 'submission-files' and public.is_admin(auth.uid()))
with check (bucket_id = 'submission-files' and public.is_admin(auth.uid()));
