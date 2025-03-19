import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { SessionProvider } from "next-auth/react";
import "../../../app/admin-globals.css";

export const metadata = {
  title: "CST Club - DPI",
  description: "Digital Programming Institute CST Club Management System",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
