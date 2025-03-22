import { getUserById } from "@/app/actions/users";
import UserEditForm from "./_components/userEditForm";

export default async function page({ params }) {
  const param = await params;
  const user = await getUserById(param?.id, {}, { user: true });
  if (user?.error) {
    throw Error();
  }
  return (
    <>
      <UserEditForm user={user} />
    </>
  );
}
