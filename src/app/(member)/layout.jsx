import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Computer Department Club - Dhaka Polytechnic",
  description:
    "Fostering innovation, learning, and collaboration in computer technology",
};

export default function RootLayout({ children }) {
  return (

    <div className="flex flex-col min-h-screen">
      <SessionProvider>
        <Navbar />
        <main className="flex-grow px-5 md:px-20">
          {children}
        </main>
        <Footer />
      </SessionProvider>
    </div>

  );
}
