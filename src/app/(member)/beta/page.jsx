import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, FileText, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Quiz Application</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Create, manage, and participate in timed quizzes with automatic
          scoring and result generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">
              Manage Quizzes
            </CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create, edit, and delete quizzes with custom questions, timing,
              and scoring.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/beta/admin/quizzes" className="w-full">
              <Button className="w-full">Go to Quiz Management</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Participate</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Take quizzes with automatic timing and get instant results upon
              completion.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/beta/quizzes" className="w-full">
              <Button className="w-full">Available Quizzes</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">Results</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View your quiz results and performance analytics across all
              quizzes.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/beta/results" className="w-full">
              <Button className="w-full">View Results</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
