import { requireRole } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await requireRole("admin");

  return <AppShell profile={currentUser.profile}>{children}</AppShell>;
}
