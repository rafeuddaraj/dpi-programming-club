import { auth } from "@/app/auth";
import AdminSettingsPage from "./_components/AdminSettingsPage";
import ChangePassword from "./_components/MemberSettingsPage";

export default async function page() {
  const session = await auth();
  const user = session?.user;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isMember = role === "member";
  return (
    <>
      {/* TODO:: Update ChangePassword By MemberSettingsPage */}
      {isAdmin ? <AdminSettingsPage /> : isMember ? <ChangePassword /> : null}
    </>
  );
}
