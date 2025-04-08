import { auth } from "@/app/auth";
import AdminAssignmentPage from "./_components/admin-assignmenet-page";
import ModeratorAssignmentPage from "./_components/moderator-assignment-page";
import MemberAssignmentPage from "./_components/member-assignment-page";

export default async function AssignmentPage({ searchParams }) {
  const session = await auth();
  const user = session.user || null;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  return (
    <>
      {isAdmin ? (
        <AdminAssignmentPage searchParams={searchParams} />
      ) : isModerator ? (
        <ModeratorAssignmentPage searchParams={searchParams} />
      ) : (
        <MemberAssignmentPage searchParams={searchParams} />
      )}
    </>
  );
}
