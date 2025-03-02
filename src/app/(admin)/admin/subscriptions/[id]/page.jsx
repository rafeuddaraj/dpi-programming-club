import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Users, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionDetailsPage({ params }) {
  // In a real app, you would fetch the subscription data here
  const subscription = {
    id: params.id,
    name: "Basic Plan",
    description: "Perfect for beginners starting their journey",
    price: 9.99,
    duration: "monthly",
    status: "active",
    maxCourses: 5,
    maxWorkshops: 2,
    features: ["Access to basic courses", "Community access", "Monthly workshops", "Basic support"],
    hasProjectAccess: true,
    hasCommunityAccess: true,
    hasMentoring: false,
    activeSubscribers: 150,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/subscriptions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Subscriptions
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{subscription.name}</h1>
        <div className="flex gap-2">
          <Link href={`/subscriptions/${subscription.id}/edit`}>
            <Button variant="outline">Edit Plan</Button>
          </Link>
          <Button variant="destructive">Delete Plan</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-semibold">Description</h2>
              <p className="text-muted-foreground">{subscription.description}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold">Pricing</h2>
              <div className="text-2xl font-bold">
                ${subscription.price}/{subscription.duration}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{subscription.activeSubscribers} active subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Duration: {subscription.duration}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold">Status</h2>
              <Badge>{subscription.status}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features & Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Course Access</h3>
                  <p className="text-2xl font-bold">{subscription.maxCourses}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Workshop Access</h3>
                  <p className="text-2xl font-bold">{subscription.maxWorkshops}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold">Included Features</h2>
              <div className="space-y-2">
                {subscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold">Access Levels</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className={subscription.hasProjectAccess ? "text-primary" : "text-muted"} />
                  <span>Project Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={subscription.hasCommunityAccess ? "text-primary" : "text-muted"} />
                  <span>Community Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className={subscription.hasMentoring ? "text-primary" : "text-muted"} />
                  <span>Mentoring Access</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

