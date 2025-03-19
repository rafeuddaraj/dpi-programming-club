import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiscordPage() {
  return (
    (<div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Join Our Discord Community</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Polytechnic CST Club Discord</CardTitle>
          <CardDescription>Connect with fellow students and mentors</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Join our Discord server to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Participate in discussions</li>
            <li>Get help with your projects</li>
            <li>Stay updated on club events</li>
            <li>Network with industry professionals</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <a
              href="https://discord.gg/your-invite-link"
              target="_blank"
              rel="noopener noreferrer">
              Join Discord Server
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}

