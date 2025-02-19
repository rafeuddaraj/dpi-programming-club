"use client";

import { motion } from "framer-motion";
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

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-b from-background via-background/90 to-background text-foreground overflow-hidden">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <header className="text-center mb-16">
            <motion.h1
              className="text-5xl sm:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Programming Club
            </motion.h1>
            <motion.p
              className="text-2xl sm:text-3xl mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Dhaka Polytechnic Institute
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Badge variant="outline" className="text-lg py-2 px-4">
                Est. 2023
              </Badge>
            </motion.div>
          </header>

          <section className="mb-16">
            <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl font-bold text-center">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg sm:text-xl text-center">
                <p>
                  Empowering the next generation of tech innovators through
                  collaboration, learning, and hands-on experience.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              What We Offer
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <FeatureCard
                icon={<Icons.code className="w-12 h-12" />}
                title="Programming & Development"
                description="Dive into coding challenges, hackathons, and collaborative projects. Master languages like Python, Java, and JavaScript."
              />
              <FeatureCard
                icon={<Icons.mic className="w-12 h-12" />}
                title="Public Speaking & Debate"
                description="Hone your communication skills through workshops, debates, and presentations on cutting-edge tech topics."
              />
              <FeatureCard
                icon={<Icons.lightbulb className="w-12 h-12" />}
                title="Innovation Lab"
                description="Experiment with emerging technologies like AI, Machine Learning, and Blockchain in our state-of-the-art innovation lab."
              />
              <FeatureCard
                icon={<Icons.network className="w-12 h-12" />}
                title="Networking & Career Growth"
                description="Connect with industry professionals, attend career fairs, and get guidance on internships and job placements."
              />
            </div>
          </section>

          <section className="mb-16">
            <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl font-bold text-center">
                  Why Join Us?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4 md:grid-cols-2 text-lg">
                  <li className="flex items-center">
                    <Icons.check className="w-6 h-6 mr-2 text-green-500" />{" "}
                    Hands-on learning experiences
                  </li>
                  <li className="flex items-center">
                    <Icons.check className="w-6 h-6 mr-2 text-green-500" />{" "}
                    Access to cutting-edge resources
                  </li>
                  <li className="flex items-center">
                    <Icons.check className="w-6 h-6 mr-2 text-green-500" />{" "}
                    Networking opportunities
                  </li>
                  <li className="flex items-center">
                    <Icons.check className="w-6 h-6 mr-2 text-green-500" />{" "}
                    Leadership skill development
                  </li>
                  <li className="flex items-center">
                    <Icons.check className="w-6 h-6 mr-2 text-green-500" />{" "}
                    Industry-recognized certifications
                  </li>
                  <li className="flex items-center">
                    <Icons.check className="w-6 h-6 mr-2 text-green-500" /> Fun
                    tech events and competitions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Upcoming Events
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <EventCard
                title="AI Workshop Series"
                date="July 15-17, 2023"
                description="A three-day intensive workshop on Artificial Intelligence and its applications."
              />
              <EventCard
                title="Hackathon 2023"
                date="August 5-6, 2023"
                description="48-hour coding challenge to solve real-world problems. Amazing prizes to be won!"
              />
            </div>
          </section>

          <section className="mb-16">
            <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl font-bold text-center">
                  Join Our Community
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg mb-6">
                  Be part of a thriving tech community. Learn, grow, and
                  innovate together!
                </p>
                <Button asChild size="lg" className="text-lg py-6 px-8">
                  <Link href="/register">Become a Member</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Our Partners
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <PartnerLogo name="TechCorp" />
              <PartnerLogo name="InnovateX" />
              <PartnerLogo name="FutureLab" />
              <PartnerLogo name="CodeMasters" />
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Connect With Us
            </h2>
            <div className="flex justify-center space-x-4">
              <SocialIcon
                icon={<Icons.facebook className="w-6 h-6" />}
                href="#"
              />
              <SocialIcon
                icon={<Icons.twitter className="w-6 h-6" />}
                href="#"
              />
              <SocialIcon
                icon={<Icons.instagram className="w-6 h-6" />}
                href="#"
              />
              <SocialIcon
                icon={<Icons.linkedin className="w-6 h-6" />}
                href="#"
              />
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl">
      <CardHeader>
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">{description}</p>
      </CardContent>
    </Card>
  );
}

function EventCard({ title, date, description }) {
  return (
    <Card className="backdrop-blur-lg bg-background/30 border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

function PartnerLogo({ name }) {
  return (
    <div className="w-32 h-32 flex items-center justify-center bg-background/50 rounded-lg shadow-md">
      <span className="text-xl font-bold">{name}</span>
    </div>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      className="p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
    >
      {icon}
    </a>
  );
}
