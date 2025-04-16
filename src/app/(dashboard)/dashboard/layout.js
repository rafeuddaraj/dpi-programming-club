import { auth } from "@/app/auth";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SessionProvider } from "next-auth/react";
import "../../../app/admin-globals.css";

export const metadata = {
  title: "CST Club - DPI",
  description: "Digital Programming Institute CST Club Management System",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  const user = session?.user || null;
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar user={user} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header user={user} />
          <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
