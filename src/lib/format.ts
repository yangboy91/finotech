import { format } from "date-fns";

import type { SubmissionStatus } from "@/lib/types";

export function formatDate(value: string) {
  return format(new Date(value), "MMM d, yyyy");
}

export function submissionStatusLabel(status: SubmissionStatus) {
  switch (status) {
    case "not_started":
      return "Not started";
    case "submitted":
      return "Submitted";
    case "in_review":
      return "In review";
    case "needs_revision":
      return "Needs revision";
    case "approved":
      return "Approved";
    default:
      return status;
  }
}
