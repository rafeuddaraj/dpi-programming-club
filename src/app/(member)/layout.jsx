import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";

export const metadata = {
  title: "Computer Department Club - Dhaka Polytechnic",
  description:
    "Fostering innovation, learning, and collaboration in computer technology",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (

    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Navbar user={session?.user} />
        <main className="flex-grow px-4 md:px-20">
          {children}
        </main>
        <Footer />
      </SessionProvider>
    </div>

  );
}
