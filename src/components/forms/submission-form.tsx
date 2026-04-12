"use client";

import { useActionState } from "react";

import { createSubmissionAction, type SubmissionFormState } from "@/app/actions/submissions";
import type { Week } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: SubmissionFormState = {};

export function SubmissionForm({
  weeks,
}: {
  weeks: Week[];
}) {
  const [state, action, pending] = useActionState(createSubmissionAction, initialState);

  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle>Submit weekly work</CardTitle>
        <CardDescription>
          Students can upload a file to Supabase Storage or submit a share link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weekId">Week</Label>
              <select
                id="weekId"
                name="weekId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue={weeks[0]?.id}
              >
                {weeks.map((week) => (
                  <option key={week.id} value={week.id}>
                    Week {week.week_number}: {week.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="submissionType">Submission type</Label>
              <select
                id="submissionType"
                name="submissionType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue="link"
              >
                <option value="link">Link submission</option>
                <option value="file">File upload</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkUrl">Link</Label>
            <Input id="linkUrl" name="linkUrl" placeholder="https://docs.google.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input id="file" name="file" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Anything your mentor should know about this submission."
              rows={5}
            />
          </div>
          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          {state.success ? (
            <p className="text-sm text-emerald-600">{state.success}</p>
          ) : null}
          <Button disabled={pending}>{pending ? "Submitting..." : "Save submission"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
