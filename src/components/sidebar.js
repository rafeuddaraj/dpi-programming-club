"use client";

import {
  Award,
  Bell,
  Briefcase,
  Calendar,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCheck,
  UserCog2,
  UserCog2Icon,
  Users,
  Vote,
  Wrench,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

export default function Sidebar({ isMobile = false, user }) {
  const pathname = usePathname();
  const role = user?.role;

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "moderator", "member"],
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      name: "Sessions",
      href: "/dashboard/sessions",
      icon: UserCheck,
      roles: ["admin"],
    },
    {
      name: "Managements",
      href: "/dashboard/managements",
      icon: Vote,
      roles: ["admin"],
    },
    {
      name: "Moderators",
      href: "/dashboard/moderators",
      icon: UserCog2,
      roles: ["admin"],
    },
    {
      name: "Members Collect",
      href: "/dashboard/member-collect",
      icon: UserCog2Icon,
      roles: ["admin"],
    },
    {
      name: "Notice",
      href: "/dashboard/notice",
      icon: Bell,
      roles: ["admin"],
    },
    {
      name: "Results",
      href: "/dashboard/results",
      icon: GraduationCap,
      roles: ["admin"],
    },
    {
      name: "Events",
      href: "/dashboard/events",
      icon: Calendar,
      roles: ["admin", "moderator", "member"],
    },
    {
      name: "Projects",
      href: "/dashboard/projects",
      icon: Briefcase,
      roles: ["admin", "moderator", "member"],
    },
    {
      name: "Workshops",
      href: "/dashboard/workshops",
      icon: Wrench,
      roles: ["admin", "moderator", "member"],
    },
    {
      name: "Assignments",
      href: "/dashboard/assignments",
      icon: FileText,
      roles: ["admin", "moderator", "member"],
    },

    {
      name: "Payments",
      href: "/dashboard/payments",
      icon: CreditCard,
      roles: ["admin"],
    },
    {
      name: "Skills",
      href: "/dashboard/skills",
      icon: Award,
      roles: ["admin", "moderator", "member"],
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["admin", "moderator", "member"],
    },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href) && pathname !== "/dashboard";
  };

  return (
    <div
      className={`${
        isMobile ? " border-r-transparent" : "hidden border-r"
      } md:flex flex-col w-64 bg-card overflow-y-auto`}
    >
      <div className="p-6 relative">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span>CST Club</span>
          <span className="bg-primary text-primary-foreground p-1 rounded">
            DPI
          </span>
          <div className={"absolute right-2 top-0"}>
            <Badge variant={"destructive"}>Beta</Badge>
          </div>
        </Link>
      </div>
      <div className="flex-1 px-3 py-2 space-y-1">
        {routes
          .filter((route) => route.roles.includes(role))
          .map((route) => (
            <div key={route.href}>
              <Link
                key={route.href}
                href={route.href}
                className={`sidebar-item ${
                  isActive(route.href) ? "active" : ""
                }`}
              >
                <route.icon className="sidebar-item-icon" />
                <span>{route.name}</span>
              </Link>
            </div>
          ))}
      </div>

      <div className="p-4 border-t">
        <button
          className="sidebar-item w-full justify-start text-destructive hover:text-destructive"
          onClick={() => {
            signOut({ redirect: false });
            redirect("/auth/login");
          }}
        >
          <LogOut className="sidebar-item-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
