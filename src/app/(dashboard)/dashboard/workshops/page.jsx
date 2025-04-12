import { auth } from "@/app/auth";
import AdminWorkshopPage from "./_components/admin-workshop";
import MemberWorkshopPage from "./_components/member-workshop";
import ModeratorWorkshop from "./_components/moderator-workshop";

export default async function WorkshopPage({ searchParams, params }) {
  const session = await auth();
  const user = session?.user || {};
  const role = user?.role;
  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  return (
    <>
      {isAdmin ? (
        <AdminWorkshopPage searchParams={searchParams} params={params} />
      ) : isModerator ? (
        <ModeratorWorkshop searchParams={searchParams} params={params} />
      ) : (
        <MemberWorkshopPage searchParams={searchParams} params={params} />
      )}
    </>
  );
}
