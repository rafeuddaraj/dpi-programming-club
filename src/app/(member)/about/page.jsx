"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "John Doe",
    role: "Club President",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Computer Science enthusiast with a passion for AI and machine learning.",
  },
  {
    name: "Jane Smith",
    role: "Vice President",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Web developer and UX designer, focused on creating intuitive user experiences.",
  },
  {
    name: "Alex Johnson",
    role: "Event Coordinator",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Cybersecurity specialist with experience in organizing tech conferences.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold text-center mb-8">About Our Club</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Polytechnic CST Club is dedicated to fostering a community of tech enthusiasts, providing
              opportunities for learning, collaboration, and professional growth in the field of computer science and
              technology.
            </p>
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Founded in 2010, our club has grown from a small group of passionate students to a thriving community of
              over 500 members. We've organized numerous workshops, hackathons, and tech talks, connecting students with
              industry professionals and cutting-edge technologies.
            </p>
          </CardContent>
        </Card>
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardHeader>
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <CardDescription className="text-center">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

