import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { getActiveQuizzes } from "@/lib/data";

export default function QuizzesPage() {
  const activeQuizzes = getActiveQuizzes();

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Available Quizzes</h1>
        <p className="text-muted-foreground max-w-[600px]">
          Select a quiz to participate. Each quiz has a time limit and will
          automatically submit when the time is up.
        </p>
      </div>

      {activeQuizzes.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium mb-2">
            No active quizzes available
          </h2>
          <p className="text-muted-foreground">
            Check back later for new quizzes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeQuizzes.map((quiz) => (
            <Card key={quiz.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-medium">
                    {quiz.name}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {quiz.totalMarks} marks
                  </Badge>
                </div>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{quiz.duration} minutes</span>
                </div>
                <p className="text-sm">
                  Available until: {new Date(quiz.endTime).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/beta/quizzes/${quiz.id}`} className="w-full">
                  <Button className="w-full">Start Quiz</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
