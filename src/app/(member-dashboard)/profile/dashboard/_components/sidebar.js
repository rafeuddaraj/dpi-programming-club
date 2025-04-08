"use client";

import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import {
  Award,
  Briefcase,
  Calendar,
  CreditCard,
  KeyIcon,
  LayoutDashboard,
  LogOut,
  Wrench,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isMobile = false }) {
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", href: "/profile/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/profile/dashboard/events", icon: Calendar },
    { name: "Projects", href: "/profile/dashboard/projects", icon: Briefcase },
    { name: "Workshops", href: "/profile/dashboard/workshops", icon: Wrench },
    { name: "Payments", href: "/profile/dashboard/payments", icon: CreditCard },
    { name: "Skills", href: "/profile/dashboard/skills", icon: Award },
    { name: "Password", href: "/profile/dashboard/password", icon: KeyIcon },
  ];

  return (
    <div
      className={`${
        isMobile ? "" : "hidden"
      } md:flex flex-col w-64 bg-card border-r h-screen`}
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
              className={`sidebar-item ${
                pathname === route.href ? "active" : ""
              }`}
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
        <button
          className="sidebar-item w-full justify-start text-destructive hover:text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="sidebar-item-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
