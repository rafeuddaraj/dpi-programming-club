import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CreditCard,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "bg-blue-500" },
    {
      title: "Active Courses",
      value: "24",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Ongoing Projects",
      value: "16",
      icon: Briefcase,
      color: "bg-amber-500",
    },
  ];

  const modules = [
    {
      name: "Users Management",
      icon: Users,
      href: "/dashboard/users",
      description: "Manage users, roles and permissions",
    },
    {
      name: "Course Management",
      icon: BookOpen,
      href: "/dashboard/courses",
      description: "Manage courses, assignments and quizzes",
    },
    {
      name: "Event Management",
      icon: Calendar,
      href: "/dashboard/events",
      description: "Create and manage club events",
    },
    {
      name: "Project Management",
      icon: Briefcase,
      href: "/dashboard/projects",
      description: "Track and manage projects",
    },
    {
      name: "Workshop Management",
      icon: Wrench,
      href: "/dashboard/workshops",
      description: "Organize and manage workshops",
    },
    {
      name: "Payment Management",
      icon: CreditCard,
      href: "/dashboard/payments",
      description: "Track payments and transactions",
    },
    {
      name: "Skill Management",
      icon: Award,
      href: "/dashboard/skills",
      description: "Track and develop member skills",
    },
    {
      name: "Subscription Management",
      icon: Bell,
      href: "/dashboard/subscriptions",
      description: "Manage membership subscriptions",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

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
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Activity {i}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
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
    </div>
  );
}
