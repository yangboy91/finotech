import { Badge } from "@/components/ui/badge";
import { submissionStatusLabel } from "@/lib/format";
import type { SubmissionStatus } from "@/lib/types";

const STATUS_VARIANTS: Record<
  SubmissionStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  not_started: "outline",
  submitted: "secondary",
  in_review: "default",
  needs_revision: "destructive",
  approved: "default",
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  return <Badge variant={STATUS_VARIANTS[status]}>{submissionStatusLabel(status)}</Badge>;
}
