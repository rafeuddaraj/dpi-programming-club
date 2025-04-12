import ComingSoon from "@/components/common/coming-soon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COMING_SOON } from "@/lib/utils";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CreditCard,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default function MemberDashboardPage({ searchParams, params }) {
  const stats = [
    {
      title: "Total Courses",
      value: "24",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Total Events",
      value: "8",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Total Workshops",
      value: "8",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Projects",
      value: "16",
      icon: Briefcase,
      color: "bg-amber-500",
    },
  ];

  const modules = [
    {
      name: "Courses",
      icon: BookOpen,
      href: "/profile/dashboard/courses",
      description: "Your all courses",
    },
    {
      name: "Events",
      icon: Calendar,
      href: "/profile/dashboard/events",
      description: "Your all events",
    },
    {
      name: "Projects",
      icon: Briefcase,
      href: "/profile/dashboard/projects",
      description: "Track and manage projects",
    },
    {
      name: "Workshops",
      icon: Wrench,
      href: "/profile/dashboard/workshops",
      description: "Your all workshops",
    },
    {
      name: "Payment History",
      icon: CreditCard,
      href: "/profile/dashboard/payments",
      description: "Track payments and transactions",
    },
    {
      name: "Skill Management",
      icon: Award,
      href: "/profile/dashboard/skills",
      description: "Your all skills",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {COMING_SOON ? (
        <ComingSoon title="Dashboard" />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-8">Quick Access</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, i) => (
              <Link href={module.href} key={i}>
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-lg font-medium">
                      {module.name}
                    </CardTitle>
                    <module.icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{module.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-purple-500/10 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Event {i}</p>
                        <p className="text-xs text-muted-foreground">
                          May {10 + i}, 2023
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-purple-500/10 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Event {i}</p>
                        <p className="text-xs text-muted-foreground">
                          May {10 + i}, 2023
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
