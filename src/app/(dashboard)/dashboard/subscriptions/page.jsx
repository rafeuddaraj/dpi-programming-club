import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Link href="/subscriptions/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Plan
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Example subscription plan cards */}
        <Link href="/subscriptions/1">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Basic Plan</CardTitle>
                <Badge>Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">$9.99/month</div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />1 Month Duration
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  Access to basic courses
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  Community access
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

