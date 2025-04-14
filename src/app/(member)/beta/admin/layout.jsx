import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileText,
  GalleryVerticalEnd,
  Home,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-muted/40 py-6 px-3 hidden md:block">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="rounded-md bg-primary p-1">
            <GalleryVerticalEnd className="h-6 w-6 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold">Quiz Admin</h2>
        </div>

        <nav className="space-y-1">
          <Link href="/beta">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link href="/beta/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/beta/admin/quizzes">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Quizzes
            </Button>
          </Link>
          <Link href="/beta/admin/categories">
            <Button variant="ghost" className="w-full justify-start">
              <Tag className="mr-2 h-4 w-4" />
              Categories
            </Button>
          </Link>
          <Link href="/beta/admin/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/beta/admin/results">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Results
            </Button>
          </Link>
          <Link href="/beta/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
