import { getAllActivitiesByUserId } from "@/app/actions/activities";
import { getSingleResult } from "@/app/actions/bteb-result";
import { getAllApprovedSkillsByUser } from "@/app/actions/skills";
import { getUserById } from "@/app/actions/users";
import { auth } from "@/app/auth";
import { MotionDiv } from "@/components/common/motion";
import { ShareModal } from "@/components/common/share-modal";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hasPermission, MEMBER } from "@/lib/permissions";
import { isMembershipExpired } from "@/lib/utils";
import GetDepartmentList from "@/utils/DepartmentList";
import dynamic from "next/dynamic";
import Link from "next/link";
const ProfileActivities = dynamic(() =>
  import("./_components/ProfileActivities")
);

export default async function ProfilePage({ searchParams }) {
  const userId = (await searchParams).id;

  const session = await auth();

  const userData = await getUserById(
    userId || session?.user?.id,
    {},
    { user: true }
  );
  const activities = await getAllActivitiesByUserId(
    userId || session?.user?.id
  );

  let result = null;
  try {
    const resp = await getSingleResult({ roll: userData?.user?.rollNo });
    if (!resp?.error) {
      result = resp?.data;
    }
  } catch {
    //
  }
  if (userData?.error || activities?.error) {
    throw Error("User not found");
  }

  let approvedSkills = [];
  try {
    const resp = await getAllApprovedSkillsByUser(userId);
    if (!resp?.error) {
      approvedSkills = resp?.data;
    }
  } catch {
    //
  }

  return (
    <div className="container mx-auto py-8">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage
                src={userData?.avatar || "/avatar.svg"}
                alt={userData?.name}
              />
              <AvatarFallback>
                {userData?.user?.name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl sm:text-3xl">
                {userData?.user?.name}{" "}
                {isMembershipExpired(userData?.renewalDate) ? "❌" : "✅"}
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {userData?.bio}
              </CardDescription>
              <p>{userData?.address}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {GetDepartmentList(userData?.user?.department)} |{" "}
                {userData?.user?.semester} Semester
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-4">
              <Button variant="outline" size="sm">
                <Link
                  className="flex gap-1"
                  href={`mailto:${userData?.user?.email}`}
                >
                  <Icons.mail className="mr-2 h-4 w-4" />
                  {userData?.user?.email}
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Link
                  className="flex gap-1"
                  href={`tel:${userData?.user?.phoneNumber || ""}`}
                >
                  <Icons.phone className="mr-2 h-4 w-4" />
                  {userData?.user?.phoneNumber}
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={userData?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={userData?.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <ProfileActivities
          user={userData}
          activities={activities?.data}
          session={session}
          result={result}
          approvedSkills={approvedSkills}
        />
        <div className="flex justify-center gap-4">
          {hasPermission(session?.user?.role, MEMBER["update:own_user"]) &&
            userData?.id === session.user?.id && (
              <Button asChild>
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
            )}
          <ShareModal
            url={`${process?.env?.SITE_URL}/profile?id=${userData?.id}`}
          >
            <Button variant="outline">Share Profile</Button>
          </ShareModal>
        </div>
      </MotionDiv>
    </div>
  );
}
