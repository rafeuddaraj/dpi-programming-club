import { auth } from "@/app/auth";
import AdminEventDetailsPage from "./_components/admin-event-detail-page";
import MemberEventDetailsPage from "./_components/member-event-detail-page";

export default async function page({ params }) {
  const session = await auth();
  const user = session?.user || null;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isMember = role === "member";
  return (
    <>
      {isAdmin ? (
        <AdminEventDetailsPage params={params} />
      ) : isMember ? (
        <MemberEventDetailsPage params={params} />
      ) : null}
    </>
  );
}
