"use client";

import { cn } from "@/lib/utils";
import {
  Award,
  Bell,
  Briefcase,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog2Icon,
  Users,
  Wrench,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    {
      name: "Members Collect",
      href: "/dashboard/member-collect",
      icon: UserCog2Icon,
    },
    { name: "Notice", href: "/dashboard/notice", icon: Bell },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "Workshops", href: "/dashboard/workshops", icon: Wrench },
    { name: "Assignments", href: "/dashboard/assignments", icon: FileText },

    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Skills", href: "/dashboard/skills", icon: Award },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
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
        isMobile ? "" : "hidden"
      } md:flex flex-col w-64 bg-card border-r overflow-y-auto`}
    >
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="bg-primary text-primary-foreground p-1 rounded">
            DPI
          </span>
          <span>CST Club</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-2 space-y-1">
        {routes.map((route) => (
          <div key={route.href}>
            <Link
              key={route.href}
              href={route.href}
              className={`sidebar-item ${isActive(route.href) ? "active" : ""}`}
            >
              <route.icon className="sidebar-item-icon" />
              <span>{route.name}</span>
            </Link>
            {route.subItems && (
              <div className="ml-4 mt-1 grid gap-1">
                {route.subItems.map((item) => (
                  <Button
                    key={item.href}
                    asChild
                    variant="ghost"
                    className={cn(
                      "h-8 justify-start gap-2",
                      pathname === item.href && "bg-muted font-medium"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <button className="sidebar-item w-full justify-start text-destructive hover:text-destructive">
          <LogOut onClick={() => signOut()} className="sidebar-item-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
