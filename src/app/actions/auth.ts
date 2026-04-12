"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { setDemoSession, signOutCurrentUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error?: string;
};

export async function loginAction(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email) {
    return { error: "Email is required." };
  }

  if (!isSupabaseConfigured) {
    if (!["admin@finotech.xyz", "student@finotech.xyz"].includes(email)) {
      return { error: "Use admin@finotech.xyz or student@finotech.xyz in demo mode." };
    }

    await setDemoSession(email);
    revalidatePath("/");
    redirect(email === "admin@finotech.xyz" ? "/admin" : "/dashboard");
  }

  if (!password) {
    return { error: "Password is required." };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  redirect("/dashboard");
}

export async function signOutAction() {
  await signOutCurrentUser();
  revalidatePath("/");
  redirect("/login");
}
