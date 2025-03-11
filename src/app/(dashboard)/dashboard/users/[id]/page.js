import { getUserAllParticipants, getUserById } from "@/app/actions/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Mail,
  MapPin,
  PenSquare,
  Phone,
  Store,
} from "lucide-react";
import Link from "next/link";
import DeleteUserDialog from "./_components/delete";

export default async function UserDetailsPage({ params }) {
  const param = await params;

  const resp = await getUserById(param?.id, null, {
    CourseEnrollment: true,
    WorkshopParticipant: true,
    EventParticipant: true,
  });
  if (resp?.error) {
    throw Error();
  }
  const user = resp;

  const statusClasses = {
    ACTIVE: "bg-green-100 text-green-800",
    RESTRICTED: "bg-yellow-100 text-yellow-800",
    BANNED: "bg-red-100 text-red-800",
    EXPIRED: "bg-purple-100 text-purple-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    EX: "bg-amber-100 text-amber-800",
  };

  const participants = await getUserAllParticipants(user?.id);
  console.log(participants);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Details</h1>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/users/${user.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
          </Link>
          <DeleteUserDialog userId={param?.id} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {user?.name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.role}</p>
                <span
                  className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    statusClasses[user.status]
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PenSquare className="h-4 w-4 text-muted-foreground" />
                <span>{user.rollNo}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Store className="h-4 w-4 text-muted-foreground" />
                <span>
                  {user?.session} ({user.semester})
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {participants?.courses?.map(({ course }) => (
                  <li
                    key={course.id}
                    className="flex items-center justify-between"
                  >
                    <span>{course.name}</span>
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registered Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {participants?.events?.map(({ event }) => (
                  <li
                    key={event.id}
                    className="flex items-center justify-between"
                  >
                    <span>{event.name}</span>
                    <Link href={`/dashboard/events/${event.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enrolled Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {participants?.workshop?.map(({ workshop }) => (
                  <li
                    key={workshop.id}
                    className="flex items-center justify-between"
                  >
                    <span>{workshop.name}</span>
                    <Link href={`/dashboard/workshops/${workshop.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
