"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Share2, CheckCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const workshop = {
  title: "Mastering DSA for Developers: Start Your DSA Journey",
  description:
    "This workshop helps application developers explore DSA through real-world problems, connecting data structures to business challenges and fostering a problem-solving mindset for practical solutions.",
  duration: "11 Days",
  features: ["17 Lectures", "GET SCORE"],
  price: "BDT 12,000",
  discount: "Up to 50% discount",
  learningPoints: [
    "The real-world impact of DSA: Why understanding algorithms makes you a stronger developer",
    "A problem-solving mindset: Learn how to break down data structures problems",
    "Big-O complexity: Master performance trade-offs and write code that scales",
    "Core data structures: Master arrays, linked lists, trees, and graphs",
    "Implement data structures from scratch to deeply understand their mechanics",
    "Work on real-world problems like database design and network routing",
    "Build efficient and scalable solutions using recursion, divide-and-conquer, and dynamic programming",
  ],
  schedule: [
    {
      date: "Apr 11, 2025",
      time: "10:00 AM - 12:00 PM",
      title: "Introduction to Problem Solving and Complexity",
      description: "Understand problem-solving, Big-O notation and performance insights.",
    },
    {
      date: "Apr 12, 2025",
      time: "10:00 AM - 12:00 PM",
      title: "Arrays (Sliding Window, Two Pointers Pattern)",
      description: "Understand arrays and explore efficient techniques like sliding window and two pointers.",
    },
    // Add more sessions...
  ],
  instructor: {
    name: "Md Rayhan",
    role: "Senior Software Engineer",
    image: "/placeholder.svg?height=100&width=100",
  },
  faqs: [
    {
      question: "Who is this workshop for?",
      answer: "This workshop is designed for software developers who want to improve their DSA skills.",
    },
    {
      question: "Do I need prior DSA knowledge to enroll?",
      answer: "Basic programming knowledge is required, but we'll cover DSA concepts from the ground up.",
    },
    // Add more FAQs...
  ],
}

export default function WorkshopDetailPage() {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 hidden md:flex">
            <Link href="/workshop" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">{workshop.title}</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={copyLink}>
              {copied ? "Copied!" : "Share"} <Share2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container grid gap-12 py-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{workshop.title}</h1>
            <p className="text-muted-foreground">{workshop.description}</p>
            <div className="flex flex-wrap gap-4">
              {workshop.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* What You'll Learn */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">What You'll Learn</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {workshop.learningPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-4 w-4 text-green-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Schedule */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Schedule</h2>
            <div className="space-y-4">
              {workshop.schedule.map((session, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{session.title}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{session.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {workshop.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Community Builder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{workshop.price}</div>
                  <div className="text-sm text-green-500">{workshop.discount}</div>
                </div>
                <Button className="w-full">Enroll Now</Button>
                <Button variant="outline" className="w-full">
                  Check Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Meet Your Instructor</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={workshop.instructor.image} />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{workshop.instructor.name}</div>
                  <div className="text-sm text-muted-foreground">{workshop.instructor.role}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

