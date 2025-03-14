import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 flex flex-col gap-5 w-full p-5 md:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-6 text-center md:text-left">

          <div>
            <span className="text-2xl font-bold text-primary">DPIPC</span>
            <p className="text-foreground/60 text-sm">
              Empowering the next <br />generation of tech innovators.
            </p>
            <div className="flex justify-center md:justify-start space-x-3 mt-4">
              <a href="https://www.facebook.com/MarxioShop" className="text-white hover:text-gray-300">
                <Facebook size={24} />
              </a>
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
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Terms & Conditions</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="#">Discord</Link></li>
              <li><Link href="#">Gallery</Link></li>
              <li><Link href="#">Profile</Link></li>
              <li><Link href="#">Login</Link></li>
              <li><Link href="#">Signup</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mt-4">

          <div className="flex flex-wrap justify-center gap-5">
            <div className="flex gap-1 items-center">
              <Phone size={16} />
              <a href="tel:+88011234456" className="text-sm">+88011234456</a>
            </div>
            <div className="flex gap-1 items-center">
              <Mail size={16} />
              <a href="mailto:test@gmail.com" className="text-sm">test@gmail.com</a>
            </div>
            <div className="flex gap-1 items-center">
              <MapPin size={16} />
              <span className="text-sm">Bangladesh</span>
            </div>
          </div>

          <div className="flex justify-center mt-5 md:mt-0">
            <p className="text-xs">© {currentYear} All rights reserved by DPIPC</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
