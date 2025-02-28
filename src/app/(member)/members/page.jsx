"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for members
const members = [
  {
    id: 1,
    name: "John Doe",
    role: "President",
    department: "Computer Science",
    year: "4th",
    image: "/placeholder.svg?height=100&width=100",
    skills: ["React", "Node.js", "Python"],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Vice President",
    department: "Software Engineering",
    year: "3rd",
    image: "/placeholder.svg?height=100&width=100",
    skills: ["Java", "C++", "Machine Learning"],
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Secretary",
    department: "Information Technology",
    year: "2nd",
    image: "/placeholder.svg?height=100&width=100",
    skills: ["UI/UX Design", "JavaScript", "PHP"],
  },
  // Add more members as needed
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8 text-center">All Members</h1>
        <Input
          type="search"
          placeholder="Search members by name, department, or skills..."
          className="mb-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function MemberCard({ member }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <p className="text-sm">
              <strong>Department:</strong> {member.department}
            </p>
            <p className="text-sm">
              <strong>Year:</strong> {member.year}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

