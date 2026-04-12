"use client";

import { useActionState } from "react";

import {
  createFeedbackAction,
  createResourceAction,
  createSessionNoteAction,
  updateSubmissionStatusAction,
  updateWeekAction,
  type AdminFormState,
} from "@/app/actions/admin";
import type { SubmissionWithContext, Week } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: AdminFormState = {};

export function WeekAdminForm({ week }: { week: Week }) {
  const [state, action, pending] = useActionState(updateWeekAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Week {week.week_number}: {week.title}
        </CardTitle>
        <CardDescription>Update visibility and copy for the student-facing week page.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <input type="hidden" name="weekId" value={week.id} />
          <div className="space-y-2">
            <Label htmlFor={`summary-${week.id}`}>Summary</Label>
            <Textarea id={`summary-${week.id}`} name="summary" defaultValue={week.summary} rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`objective-${week.id}`}>Objective</Label>
            <Textarea id={`objective-${week.id}`} name="objective" defaultValue={week.objective} rows={3} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={week.published} />
            Published to students
          </label>
          {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
          <Button disabled={pending}>{pending ? "Saving..." : "Save week"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ResourceAdminForm({ weeks }: { weeks: Week[] }) {
  const [state, action, pending] = useActionState(createResourceAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add resource</CardTitle>
        <CardDescription>Create a shared resource and attach it to a specific week.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resource-week">Week</Label>
            <select
              id="resource-week"
              name="weekId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {weeks.map((week) => (
                <option key={week.id} value={week.id}>
                  Week {week.week_number}: {week.title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-title">Title</Label>
            <Input id="resource-title" name="title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-description">Description</Label>
            <Textarea id="resource-description" name="description" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-type">Type</Label>
            <select
              id="resource-type"
              name="resourceType"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="doc">Doc</option>
              <option value="template">Template</option>
              <option value="video">Video</option>
              <option value="link">Link</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="resource-url">URL</Label>
            <Input id="resource-url" name="url" type="url" />
          </div>
          {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
          <Button disabled={pending}>{pending ? "Adding..." : "Add resource"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function SubmissionReviewForm({
  submission,
}: {
  submission: SubmissionWithContext;
}) {
  const [state, action, pending] = useActionState(updateSubmissionStatusAction, initialState);

  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="submissionId" value={submission.id} />
      <select
        name="status"
        defaultValue={submission.status}
        className="flex h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="submitted">Submitted</option>
        <option value="in_review">In review</option>
        <option value="needs_revision">Needs revision</option>
        <option value="approved">Approved</option>
      </select>
      <Button size="sm" disabled={pending}>
        {pending ? "Updating..." : "Update status"}
      </Button>
      {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
    </form>
  );
}

export function FeedbackAdminForm({
  submissions,
}: {
  submissions: SubmissionWithContext[];
}) {
  const [state, action, pending] = useActionState(createFeedbackAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write feedback</CardTitle>
        <CardDescription>Attach review notes to a student submission.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback-submission">Submission</Label>
            <select
              id="feedback-submission"
              name="submissionId"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {submissions.map((submission) => (
                <option key={submission.id} value={submission.id}>
                  {submission.student.full_name} - Week {submission.week.week_number}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="feedback-rating">Rating</Label>
              <Input id="feedback-rating" name="rating" type="number" min="1" max="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback-visibility">Visibility</Label>
              <select
                id="feedback-visibility"
                name="visibility"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="student">Visible to student</option>
                <option value="internal">Internal only</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-comment">Comment</Label>
            <Textarea id="feedback-comment" name="comment" rows={5} />
          </div>
          {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
          <Button disabled={pending}>{pending ? "Saving..." : "Save feedback"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function SessionNoteAdminForm({
  submissions,
}: {
  submissions: SubmissionWithContext[];
}) {
  const [state, action, pending] = useActionState(createSessionNoteAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add session note</CardTitle>
        <CardDescription>Save private coaching notes for future mentor reference.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-submission">Student / week</Label>
            <select
              id="session-submission"
              name="submissionId"
              className="hidden"
              defaultValue=""
            />
            <select
              id="session-target"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              onChange={(event) => {
                const option = event.currentTarget.selectedOptions[0];
                const studentInput = document.getElementById("session-student-id") as HTMLInputElement | null;
                const weekInput = document.getElementById("session-week-id") as HTMLInputElement | null;
                if (studentInput) {
                  studentInput.value = option.dataset.studentId ?? "";
                }
                if (weekInput) {
                  weekInput.value = option.dataset.weekId ?? "";
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select a student and week
              </option>
              {submissions.map((submission) => (
                <option
                  key={submission.id}
                  value={submission.id}
                  data-student-id={submission.student.id}
                  data-week-id={submission.week.id}
                >
                  {submission.student.full_name} - Week {submission.week.week_number}
                </option>
              ))}
            </select>
            <input id="session-student-id" type="hidden" name="studentId" />
            <input id="session-week-id" type="hidden" name="weekId" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-note">Note</Label>
            <Textarea id="session-note" name="note" rows={5} />
          </div>
          {state.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
          <Button disabled={pending}>{pending ? "Saving..." : "Save note"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
