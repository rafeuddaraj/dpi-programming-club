import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllQuizzes } from "@/lib/data";
import { Clock, Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminQuizzesPage() {
  const quizzes = getAllQuizzes();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Quiz Management</h1>
        <Link href="/dashboard/quizzes/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium mb-2">No quizzes found</h2>
          <p className="text-muted-foreground mb-4">
            Create your first quiz to get started.
          </p>
          <Link href="/dashboard/quizzes/create">
            <Button>Create Quiz</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-medium">
                    {quiz.name}
                  </CardTitle>
                  <Badge
                    variant={quiz.isActive ? "default" : "outline"}
                    className="ml-2"
                  >
                    {quiz.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{quiz.duration} minutes</span>
                </div>
                <p className="text-sm mb-1">
                  Start: {new Date(quiz.startTime).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  End: {new Date(quiz.endTime).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/quizzes/${quiz.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <Link href={`/dashboard/quizzes/${quiz.id}/questions`}>
                  <Button variant="outline" size="sm">
                    Manage Questions
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
