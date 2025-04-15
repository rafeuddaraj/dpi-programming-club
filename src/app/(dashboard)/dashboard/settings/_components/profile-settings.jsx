import { getUserById } from "@/app/actions/users";
import { auth } from "@/app/auth";
import { ProfileEditForm } from "@/components/profile-edit-form";

export default async function ProfileSettings() {
  const session = await auth();
  const user = await getUserById(session?.user?.id, {}, { user: true });
  if (user.error) {
    throw Error("Fetching error");
  }

  return (
    <div className="container mx-auto py-8">
      <ProfileEditForm user={user} />
    </div>
  );
}
