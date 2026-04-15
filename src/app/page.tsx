import { redirect } from "next/navigation";

import LoginPage from "@/app/(auth)/login/page";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    return <LoginPage />;
  }

  redirect(user.profile.role === "admin" ? "/admin" : "/dashboard");
}
