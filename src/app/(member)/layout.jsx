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

    <div className="flex flex-col min-h-screen w-full md:max-w-screen-2xl mx-auto">
      <SessionProvider>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </SessionProvider>
    </div>

  );
}
