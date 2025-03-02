import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Inter } from "next/font/google";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Computer Department Club - Dhaka Polytechnic",
  description:
    "Fostering innovation, learning, and collaboration in computer technology",
};

export default function RootLayout({ children }) {
  return (

    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-5 md:px-20">
        {children}
      </main>
      <Footer />
    </div >
  );
}
