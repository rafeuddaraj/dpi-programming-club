import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Code } from "lucide-react"

export default function SkillsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Link href="/skills/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Skill
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Example skill card */}
        <Link href="/skills/1">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                React Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Modern web development using React and its ecosystem</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

