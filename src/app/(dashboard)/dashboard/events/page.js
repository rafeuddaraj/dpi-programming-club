import { auth } from "@/app/auth";
import AdminEventsPage from "./_components/admin-event-page";
import MemberEventPage from "./_components/member-event-page";
import ModeratorEventPage from "./_components/moderator-event-page";

export default async function page({ params, searchParams }) {
  const session = await auth();
  const user = session?.user || null;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  return (
    <>
      {isAdmin ? (
        <AdminEventsPage params={params} searchParams={searchParams} />
      ) : isModerator ? (
        <ModeratorEventPage params={params} searchParams={searchParams} />
      ) : (
        <MemberEventPage params={params} searchParams={searchParams} />
      )}
    </>
  );
}
