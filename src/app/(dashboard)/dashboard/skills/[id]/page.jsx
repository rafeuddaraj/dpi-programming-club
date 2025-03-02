import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Code, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function SkillDetailsPage({ params }) {
  // In a real app, you would fetch the skill data here
  const skill = {
    id: params.id,
    name: "React Development",
    description: "Modern web development using React and its ecosystem",
    category: "programming",
    level: "intermediate",
    prerequisites: "Basic JavaScript knowledge",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/skills">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Skills
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{skill.name}</h1>
        <div className="flex gap-2">
          <Link href={`/dashboard/skills/${skill.id}/edit`}>
            <Button variant="outline">Edit Skill</Button>
          </Link>
          <Button variant="destructive">Delete Skill</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-semibold">Description</h2>
            <p className="text-muted-foreground">{skill.description}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Category: {skill.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Level: {skill.level}</span>
            </div>
          </div>

          {skill.prerequisites && (
            <div className="space-y-2">
              <h2 className="font-semibold">Prerequisites</h2>
              <p className="text-muted-foreground">{skill.prerequisites}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

