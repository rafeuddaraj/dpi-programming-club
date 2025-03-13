"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, CircleUser, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const navItems = [
  { name: "Events", href: "/events" },
  { name: "Courses", href: "/courses" },
  { name: "Members", href: "/members" },
  { name: "Membership", href: "/membership" },
  { name: "About", href: "/about" },
  { name: "Workshop", href: "/workshop" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Discord", href: "/discord" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme } = useTheme();

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo aligned to the left */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-primary">
              CCDPI
            </Link>
          </div>

          {/* Navigation items centered */}
          <div className="hidden md:flex space-x-6 items-center justify-center flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/60 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Icons aligned to the right */}
          <div className="flex items-center ml-auto gap-3">
            <Link href="/profile" className="text-foreground/60 hover:text-foreground flex items-center">
              <CircleUser className="h-6 w-6" />
            </Link>
            <ThemeToggle />
            <Link href="/auth/register" onClick={() => signOut()} className="text-foreground/60 hover:text-foreground">
              <LogOut className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground/60 hover:text-foreground focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/60 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/profile" className="text-foreground/60 hover:text-foreground flex items-center">
              <CircleUser className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="#" className="text-foreground/60 hover:text-foreground">
          <Sun className="mt-10 h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute -mt-11 h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
