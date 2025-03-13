"use client";

import { cn } from "@/lib/utils";
import {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CreditCard,
  DollarSign,
  LayoutDashboard,
  LogOut,
  PieChart,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export default function Sidebar() {
  const pathname = usePathname();

  const routes = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "Workshops", href: "/dashboard/workshops", icon: Wrench },
    {
      name: "Finance",
      icon: DollarSign,
      href: "/dashboard/finance",
      subItems: [
        {
          label: "Overview",
          icon: PieChart,
          href: "/dashboard/finance",
        },
        {
          label: "Income",
          icon: TrendingUp,
          href: "/dashboard/finance/income",
        },
        {
          label: "Expenses",
          icon: TrendingDown,
          href: "/dashboard/finance/expenses",
        },
      ],
    },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Skills", href: "/dashboard/skills", icon: Award },
    { name: "Subscriptions", href: "/dashboard/subscriptions", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-card border-r overflow-y-auto">
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
        <button className="sidebar-item w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="sidebar-item-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
