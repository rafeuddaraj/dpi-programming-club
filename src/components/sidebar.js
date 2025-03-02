"use client";

import {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Workshops", href: "/admin/workshops", icon: Wrench },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Skills", href: "/admin/skills", icon: Award },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: Bell },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-card border-r h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="bg-primary text-primary-foreground p-1 rounded">
            DPI
          </span>
          <span>Computer Club</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-2 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`sidebar-item ${
              pathname === route.href ? "active" : ""
            }`}
          >
            <route.icon className="sidebar-item-icon" />
            <span>{route.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-4 border-t">
        <button className="sidebar-item w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="sidebar-item-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
