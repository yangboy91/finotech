import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/env";
import { readDemoStore } from "@/lib/demo-store";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AuthUser, Profile, UserRole } from "@/lib/types";

const DEMO_EMAIL_COOKIE = "finotech_demo_email";

async function getDemoProfileByEmail(email: string | undefined | null) {
  if (!email) {
    return null;
  }

  const store = await readDemoStore();
  return store.profiles.find((profile) => profile.email === email) ?? null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured) {
    const cookieStore = await cookies();
    const email = cookieStore.get(DEMO_EMAIL_COOKIE)?.value;
    const profile = await getDemoProfileByEmail(email);

    if (!profile) {
      return null;
    }

    return {
      profile,
      source: "demo",
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single<Profile>();

  if (!profile) {
    return null;
  }

  return {
    profile,
    source: "supabase",
  };
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireUser();

  if (user.profile.role !== role) {
    redirect(user.profile.role === "admin" ? "/admin" : "/dashboard");
  }

  return user;
}

export async function signOutCurrentUser() {
  if (!isSupabaseConfigured) {
    const cookieStore = await cookies();
    cookieStore.delete(DEMO_EMAIL_COOKIE);
    return;
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
}

export async function setDemoSession(email: string) {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_EMAIL_COOKIE, email, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
}
