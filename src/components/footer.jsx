import { auth } from "@/app/auth";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const session = await auth()
  const user = session?.user || null

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 flex flex-col gap-5 w-full p-5 md:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-6 text-center md:text-left">

          <div>
            <span className="text-2xl font-bold text-primary">CSCDPI</span>
            <p className="text-foreground/60 text-sm">
              Empowering the next <br />generation of tech innovators.
            </p>
            <div className="flex justify-center md:justify-start space-x-3 mt-4">
              <Link href="https://www.facebook.com/cst.club.dpi" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <Facebook size={24} />
              </Link>
              <a href="#" className="text-white hover:text-gray-300">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <Linkedin size={24} />
              </a>
            </div>

          </div>

          <div>
            <h3 className="font-semibold text-lg">Club</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="#">Events</Link></li>
              <li><Link href="#">Courses</Link></li>
              <li><Link href="#">Members</Link></li>
              <li><Link href="#">Workshops</Link></li>
              <li><Link href="#">Memberships</Link></li>
              <li><Link href="#">Induction</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contacts">Contact</Link></li>
              <li><Link href="/terms-and-condition">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/discord">Discord</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              {user ? (<><li><Link href="/profile">Profile</Link></li></>) : (<><li><Link href="/auth/login">Login</Link></li>
                <li><Link href="/auth/register">Signup</Link></li></>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-4">

          <div className="flex flex-wrap justify-center gap-5">
            <div className="flex gap-1 items-center">
              <Phone size={16} />
              <a href="tel:+8809638382228" className="text-sm">+8809638382228</a>
            </div>
            <div className="flex gap-1 items-center">
              <Mail size={16} />
              <a href="mailto:dpi.cst.club@gmail.com" className="text-sm">dpi.cst.club@gmail.com</a>
            </div>
            <div className="flex gap-1 items-center">
              <MapPin size={16} />
              <Link href={`https://maps.app.goo.gl/979uJ18CGSKmXunaA`} target="_blank" rel="noopener noreferrer"><span className="text-sm">Dhaka Polytechnic Institute</span></Link>
            </div>
          </div>

          <div className="flex justify-center mt-5 md:mt-0">
            <p className="text-xs">© {currentYear} All rights reserved by CSCDPI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
