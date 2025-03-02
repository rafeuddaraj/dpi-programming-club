import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Computer Department Club - Dhaka Polytechnic",
  description:
    "Fostering innovation, learning, and collaboration in computer technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <SessionProvider>
              <Navbar />
              <main className="flex-grow px-5 md:px-20">
                <TooltipProvider>{children}</TooltipProvider>
              </main>
              <Footer />
            </SessionProvider>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
