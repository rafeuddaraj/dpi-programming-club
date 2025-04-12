import { auth } from "@/app/auth";
import AdminDashboardPage from "./_components/AdminDashboardPage";
import MemberDashboardPage from "./_components/MemberDashboardPage";
import ModeratorDashboardPage from "./_components/ModeratorDashboardPage";

export default async function page({ params, searchParams }) {
  const session = await auth();
  const user = session?.user || null;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  return (
    <>
      {isAdmin ? (
        <AdminDashboardPage params={params} searchParams={searchParams} />
      ) : isModerator ? (
        <ModeratorDashboardPage params={params} searchParams={searchParams} />
      ) : (
        <MemberDashboardPage params={params} searchParams={searchParams} />
      )}
    </>
  );
}
