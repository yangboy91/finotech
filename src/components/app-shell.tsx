import Link from "next/link";
import { Menu } from "lucide-react";

import { signOutAction } from "@/app/actions/auth";
import { APP_NAME, STUDENT_NAV, ADMIN_NAV } from "@/lib/constants";
import type { Profile } from "@/lib/types";
import { SidebarNav } from "@/components/sidebar-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppShell({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: Profile;
}) {
  const primaryNav = profile.role === "admin" ? ADMIN_NAV : STUDENT_NAV;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(189,220,255,0.28),transparent_32%),linear-gradient(180deg,#f6f8fb_0%,#eef2f7_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-80 border-r border-white/70 bg-white/80 px-6 py-8 backdrop-blur xl:block">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Internal portal
              </p>
              <Link href="/dashboard" className="text-2xl font-semibold tracking-tight">
                {APP_NAME}
              </Link>
              <p className="text-sm leading-6 text-muted-foreground">
                A structured 8-week workspace for the FinoTech BA/DA internship program.
              </p>
            </div>
            <SidebarNav items={primaryNav} />
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
              <div className="flex items-center gap-3 xl:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <div className="space-y-8 pt-8">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                          Internal portal
                        </p>
                        <p className="text-xl font-semibold tracking-tight">{APP_NAME}</p>
                      </div>
                      <SidebarNav items={primaryNav} />
                    </div>
                  </SheetContent>
                </Sheet>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    FinoTech
                  </p>
                  <p className="text-sm font-semibold">{profile.role === "admin" ? "Admin workspace" : "Student workspace"}</p>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium">{profile.full_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.headline ?? profile.email}
                  </p>
                </div>
                <Avatar className="h-10 w-10 border border-border/60">
                  <AvatarFallback>
                    {profile.full_name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <form action={signOutAction}>
                  <Button variant="outline" className="rounded-full">
                    Sign out
                  </Button>
                </form>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
