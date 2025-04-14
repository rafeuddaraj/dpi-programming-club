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
import { getQuizById, getResultsByUserId } from "@/lib/data";
import Link from "next/link";

export default function ResultsPage() {
  // Assuming user ID 1 for demo
  const userId = "1";
  const results = getResultsByUserId(userId);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Your Quiz Results</h1>
        <p className="text-muted-foreground max-w-[600px]">
          View your performance across all quizzes you've taken.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground mb-4">
            You haven't completed any quizzes yet.
          </p>
          <Link href="/beta/quizzes">
            <Button>Take a Quiz</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => {
            const quiz = getQuizById(result.quizId);
            if (!quiz) return null;

            const percentage = (result.score / quiz.totalMarks) * 100;
            let badgeVariant = "outline";

            if (percentage >= 80) badgeVariant = "success";
            else if (percentage >= 60) badgeVariant = "default";
            else badgeVariant = "destructive";

            return (
              <Card key={result.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-medium">
                      {quiz.name}
                    </CardTitle>
                    <Badge variant={badgeVariant} className="ml-2">
                      {result.score}/{quiz.totalMarks}
                    </Badge>
                  </div>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-2">
                    Completed on:{" "}
                    {new Date(result.completedAt).toLocaleDateString()}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        percentage >= 80
                          ? "bg-green-500"
                          : percentage >= 60
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-2 text-right">
                    {percentage.toFixed(1)}%
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/beta/results/${result.quizId}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
