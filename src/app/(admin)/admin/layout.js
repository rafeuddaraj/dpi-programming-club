import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Inter } from "next/font/google";
import "../../../app/admin-globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Computer Club - DPI",
  description: "Digital Programming Institute Computer Club Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
