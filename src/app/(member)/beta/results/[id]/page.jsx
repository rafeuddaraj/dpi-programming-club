"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  getQuestionsByQuizId,
  getQuizById,
  getQuizResultForUser,
} from "@/lib/data";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Info,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizResultPage({ params }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // For demo purposes, we'll simulate the user's selected answers
  const [userAnswers, setUserAnswers] = useState([]);

  // For demo purposes, we'll simulate which questions timed out
  const [timedOutQuestions, setTimedOutQuestions] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    const fetchedQuiz = getQuizById(params.id);
    if (fetchedQuiz) {
      setQuiz(fetchedQuiz);

      const fetchedQuestions = getQuestionsByQuizId(params.id);

      // Convert to extended questions with multiple answer support and time limits
      const extendedQuestions = fetchedQuestions.map((q, index) => {
        // For demo, we'll simulate some questions having multiple correct answers
        const isMultipleChoice = index % 3 === 0;

        // For multiple choice questions, add a second correct answer
        const correctIndices = isMultipleChoice
          ? [q.correctIndex, (q.correctIndex + 2) % q.options.length]
          : [q.correctIndex];

        // Assign different time limits to questions (between 15-45 seconds)
        const timeLimit = 15 + (index % 3) * 15; // 15, 30, or 45 seconds

        return {
          ...q,
          correctIndices,
          type: isMultipleChoice ? "multiple" : "single",
          timeLimit,
        };
      });

      setQuestions(extendedQuestions);

      // Assuming user ID 1 for demo
      const userId = "1";
      const fetchedResult = getQuizResultForUser(params.id, userId);
      setResult(fetchedResult || null);

      // Simulate user answers for demo purposes
      // In a real app, you would store and retrieve the user's actual answers
      const simulatedUserAnswers = extendedQuestions.map((q, index) => {
        // Simulate some questions timing out (every 5th question)
        if (index % 5 === 0) {
          return [];
        }

        if (q.type === "single") {
          // For single-choice questions, simulate correct/incorrect answers
          return index % 2 === 0
            ? [q.correctIndices[0]]
            : [(q.correctIndices[0] + 1) % q.options.length];
        } else {
          // For multiple-choice questions, simulate partially correct answers
          if (index % 4 === 1) {
            // All correct
            return [...q.correctIndices];
          } else if (index % 4 === 2) {
            // Partially correct (missing one)
            return [q.correctIndices[0]];
          } else if (index % 4 === 3) {
            // Partially correct (with an incorrect one)
            const incorrectIndex = q.options.findIndex(
              (_, i) => !q.correctIndices.includes(i)
            );
            return [
              ...q.correctIndices,
              incorrectIndex >= 0 ? incorrectIndex : 0,
            ];
          } else {
            // Completely wrong
            const incorrectIndices = q.options
              .map((_, i) => i)
              .filter((i) => !q.correctIndices.includes(i))
              .slice(0, 2);
            return incorrectIndices;
          }
        }
      });

      setUserAnswers(simulatedUserAnswers);

      // Simulate timed out questions (every 5th question)
      const timedOut = extendedQuestions
        .map((_, index) => index)
        .filter((index) => index % 5 === 0);

      setTimedOutQuestions(timedOut);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Loading result...</h2>
        </div>
      </div>
    );
  }

  if (!quiz || !result) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Result not found or you haven't taken this quiz yet.
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.push("/results")}>
            Back to Results
          </Button>
        </div>
      </div>
    );
  }

  const percentage = result.score;

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-2">
            <CardTitle className="text-xl sm:text-2xl">
              {quiz.name} - Result
            </CardTitle>
            <div className="text-xl sm:text-2xl font-bold">
              {result.score}% (
              {result.score >= quiz.totalMarks * 0.6 ? "Pass" : "Fail"})
            </div>
          </div>
          <CardDescription>
            Completed on: {new Date(result.completedAt).toLocaleDateString()}
          </CardDescription>
          <div className="w-full bg-muted rounded-full h-2.5 mt-4">
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
        </CardHeader>

        <CardContent>
          <h3 className="text-lg font-medium mb-4">Question Analysis</h3>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const isTimedOut = timedOutQuestions.includes(index);
              const userSelectedIndices = userAnswers[index] || [];

              // If timed out, it's automatically incorrect
              const isCorrect =
                !isTimedOut &&
                (question.type === "single"
                  ? userSelectedIndices.length === 1 &&
                    userSelectedIndices[0] === question.correctIndices[0]
                  : userSelectedIndices.length > 0 &&
                    userSelectedIndices.every((i) =>
                      question.correctIndices.includes(i)
                    ) &&
                    question.correctIndices.every((i) =>
                      userSelectedIndices.includes(i)
                    ));

              const isPartiallyCorrect =
                !isTimedOut &&
                !isCorrect &&
                question.type === "multiple" &&
                userSelectedIndices.some((i) =>
                  question.correctIndices.includes(i)
                );

              return (
                <div key={question.id} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    {isTimedOut ? (
                      <Clock className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    ) : isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : isPartiallyCorrect ? (
                      <Info className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-start gap-2 flex-wrap">
                        <p className="font-medium mb-2 break-words">
                          {question.question}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {question.type === "multiple" && (
                            <Badge variant="outline" className="mt-0.5">
                              Multiple answers
                            </Badge>
                          )}
                          {isTimedOut && (
                            <Badge variant="destructive" className="mt-0.5">
                              Time expired
                            </Badge>
                          )}
                        </div>
                      </div>

                      {isTimedOut && (
                        <Alert variant="destructive" className="mb-3 text-sm">
                          <Clock className="h-4 w-4" />
                          <AlertTitle>Time Expired</AlertTitle>
                          <AlertDescription>
                            You didn't answer this question within the time
                            limit of {question.timeLimit} seconds.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="grid gap-2 mt-2">
                        {question.options.map((option, optIndex) => {
                          const isUserSelected =
                            userSelectedIndices.includes(optIndex);
                          const isCorrectAnswer =
                            question.correctIndices.includes(optIndex);

                          let bgClass = "bg-muted/40";
                          if (isTimedOut && isCorrectAnswer) {
                            bgClass =
                              "bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
                          } else if (isUserSelected && isCorrectAnswer) {
                            bgClass =
                              "bg-green-100 border border-green-200 dark:bg-green-900/20 dark:border-green-800";
                          } else if (isUserSelected && !isCorrectAnswer) {
                            bgClass =
                              "bg-red-100 border border-red-200 dark:bg-red-900/20 dark:border-red-800";
                          } else if (!isUserSelected && isCorrectAnswer) {
                            bgClass =
                              "bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
                          }

                          return (
                            <div
                              key={optIndex}
                              className={`p-2 rounded-md text-sm flex items-center ${bgClass}`}
                            >
                              <span className="mr-2 font-medium">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span className="flex-grow">{option}</span>

                              {isTimedOut && isCorrectAnswer && (
                                <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                  Correct Answer
                                </Badge>
                              )}

                              {!isTimedOut &&
                                isUserSelected &&
                                isCorrectAnswer && (
                                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Correct
                                  </Badge>
                                )}

                              {!isTimedOut &&
                                isUserSelected &&
                                !isCorrectAnswer && (
                                  <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                                    Incorrect
                                  </Badge>
                                )}

                              {!isTimedOut &&
                                !isUserSelected &&
                                isCorrectAnswer && (
                                  <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                    Missed
                                  </Badge>
                                )}
                            </div>
                          );
                        })}
                      </div>

                      {question.type === "multiple" && !isTimedOut && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          <p>
                            This question required selecting{" "}
                            {question.correctIndices.length} correct answers.
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-right whitespace-nowrap ml-2">
                      <span
                        className={`font-medium ${
                          isTimedOut
                            ? "text-red-600 dark:text-red-400"
                            : isCorrect
                            ? "text-green-600 dark:text-green-400"
                            : isPartiallyCorrect
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isTimedOut
                          ? "0"
                          : isCorrect
                          ? `+${question.marks}`
                          : isPartiallyCorrect
                          ? `+${Math.round(question.marks / 2)}`
                          : "0"}
                        /{question.marks}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/beta/results")}
          >
            Back to Results
          </Button>
          <Button onClick={() => router.push("/beta/quizzes")}>
            Take Another Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
