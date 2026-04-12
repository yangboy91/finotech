import { requireUser } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await requireUser();

  return <AppShell profile={currentUser.profile}>{children}</AppShell>;
}
