import { auth } from "@/app/auth";
import AdminSkillPage from "./_components/AdminSkillPage";
import MemberSkillPage from "./_components/MemberSkillPage";
import ModeratorSkillPage from "./_components/ModeratorSkillPage";

export default async function page({ params }) {
  const session = await auth();
  const user = session?.user || null;
  const role = user?.role;
  const isAdmin = role === "admin";
  const isModerator = role === "moderator";
  return (
    <>
      {isAdmin ? (
        <AdminSkillPage params={params} />
      ) : isModerator ? (
        <ModeratorSkillPage params={params} />
      ) : (
        <MemberSkillPage params={params} />
      )}
    </>
  );
}
