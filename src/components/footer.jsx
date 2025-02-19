import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-bold text-primary">DPIPC</span>
            <p className="text-foreground/60 text-sm">
              Empowering the next generation of tech innovators.
            </p>
            <div className="flex space-x-6">
              {/* Add social media icons here */}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Club
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-foreground/60 hover:text-foreground"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/events"
                      className="text-sm text-foreground/60 hover:text-foreground"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses"
                      className="text-sm text-foreground/60 hover:text-foreground"
                    >
                      Courses
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm text-foreground/60 hover:text-foreground"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-foreground/60 hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-sm text-foreground/60 xl:text-center">
            &copy; {new Date().getFullYear()} Polytechnic Computer Club. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
