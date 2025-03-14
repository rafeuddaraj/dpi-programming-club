import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion";
import UpcomingEvents from "@/components/UpcomingEvents";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-background via-background/90 to-background text-foreground overflow-hidden">
      <main className="flex flex-col items-center justify-center w-full flex-1">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <header className="text-center mb-16 mt-20 ">
            <MotionH1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Computer Club
            </MotionH1>
            <MotionP
              className="text-xl sm:text-2xl md:text-3xl mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Dhaka Polytechnic Institute
            </MotionP>
            <MotionDiv
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Badge
                variant="outline"
                className="text-base sm:text-lg py-2 px-4"
              >
                Est. 2025
              </Badge>
            </MotionDiv>
          </header>

          {/* <section className="mb-16">
            <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base sm:text-lg md:text-xl text-center">
                <p>
                  Empowering the next generation of tech innovators through
                  collaboration, learning, and hands-on experience.
                </p>
              </CardContent>
            </Card>
          </section> */}

          <section className="mb-16 px-4 sm:px-8 md:px-16 mt-32">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
    What We Offer
  </h2>
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
    {[
      {
        icon: <Icons.code className="w-12 h-12 text-orange-500" />,
        title: "Programming & Development",
        description:
          "Dive into coding challenges, hackathons, and collaborative projects. Master languages like Python, Java, and JavaScript.",
      },
      {
        icon: <Icons.mic className="w-12 h-12 text-indigo-500" />,
        title: "Public Speaking & Debate",
        description:
          "Hone your communication skills through workshops, debates, and presentations on cutting-edge tech topics.",
      },
      {
        icon: <Icons.lightbulb className="w-12 h-12 text-yellow-500" />,
        title: "Innovation Lab",
        description:
          "Experiment with emerging technologies like AI, Machine Learning, and Blockchain in our state-of-the-art innovation lab.",
      },
      {
        icon: <Icons.network className="w-12 h-12 text-green-500" />,
        title: "Networking & Career Growth",
        description:
          "Connect with industry professionals, attend career fairs, and get guidance on internships and job placements.",
      },
    ].map((feature, index) => (
      <div
        key={index}
        className="group relative p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex items-center justify-center mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
        <p className="text-gray-300 mt-2">{feature.description}</p>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    ))}
  </div>
</section>


<section className="mb-16 px-4 sm:px-8 mt-32">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-white">
    Why Join Us?
  </h2>

  <div className="relative flex flex-wrap justify-center items-center gap-8 w-full">
    {[
      { title: "Hands-on Learning", desc: "Experience real-world projects and coding challenges." },
      { title: "Exclusive Resources", desc: "Get access to premium coding materials and tools." },
      { title: "Networking", desc: "Connect with professionals and like-minded peers." },
      { title: "Leadership Growth", desc: "Sharpen your leadership and public speaking skills." },
      { title: "Certifications", desc: "Earn industry-recognized certificates." },
      { title: "Tech Events", desc: "Participate in hackathons and coding competitions." }
    ].map((item, index, arr) => (
      <div key={index} className="relative w-64 group">
        <div className="h-32 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg transition-transform duration-300 group-hover:-translate-y-2 cursor-pointer border border-white/20">
          <Icons.check className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
        </div>
        {/* Ensure blue 5ine is present in all items, including the last one */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-1 w-16 bg-blue-500 sm:block hidden"></div>
      </div>
    ))}
  </div>
</section>



          <section>
            <UpcomingEvents></UpcomingEvents>     
          </section>



          <section style={{ height: '400px' }}>
  <div className="relative w-full h-full">
    {/* Background image with blur effect */}
    <div className="absolute inset-0 bg-fixed bg-cover bg-[url('/ab1.jpg')] blur-sm"></div>

    {/* Gradient overlay for a smoother transition */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

    {/* Background color with opacity */}
    <div className="absolute inset-0 bg-background/40"></div>

    {/* Content centered in the middle */}
    <div className="absolute inset-0 flex justify-center items-center z-10 px-4 md:px-8">
      <Card className="bg-background/60 p-8 rounded-xl shadow-2xl border border-white/20 hover:shadow-3xl transition-shadow duration-500 relative">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white">
            Join Our Community
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-white">
          <p className="text-lg sm:text-xl mb-6 font-light">
            Be part of a thriving tech community. Learn, grow, and innovate together!
          </p>
          <Button
            asChild
            size="lg"
            className="text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 bg-gradient-to-r from-indigo-400 to-blue-500 text-white rounded-lg hover:scale-110 transition-all duration-300"
          >
            <Link href="/register">Become a Member</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</section>


          <section className="mt-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold  text-center">
              Our Partners
            </h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <PartnerLogo name="TechCorp" />
              <PartnerLogo name="InnovateX" />
              <PartnerLogo name="FutureLab" />
              <PartnerLogo name="CodeMasters" />
            </div>
          </section>

          <section className="text-center mt-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Connect With Us
            </h2>
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <SocialIcon
                icon={<Icons.facebook className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="#"
              />
              <SocialIcon
                icon={<Icons.twitter className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="#"
              />
              <SocialIcon
                icon={<Icons.instagram className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="#"
              />
              <SocialIcon
                icon={<Icons.linkedin className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="#"
              />
            </div>
          </section>
        </MotionDiv>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm sm:text-base">{description}</p>
      </CardContent>
    </Card>
  );
}

function EventCard({ title, date, description }) {
  return (
    <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm sm:text-base">{description}</p>
      </CardContent>
    </Card>
  );
}

function PartnerLogo({ name }) {
  return (
    <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-background/50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <span className="text-lg sm:text-xl font-bold">{name}</span>
    </div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      className="p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors duration-300"
    >
      {icon}
    </a>
  );
}
