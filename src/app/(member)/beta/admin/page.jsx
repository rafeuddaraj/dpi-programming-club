import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/beta/admin/dashboard");

  // This component will never render because of the redirect
  return null;
}
