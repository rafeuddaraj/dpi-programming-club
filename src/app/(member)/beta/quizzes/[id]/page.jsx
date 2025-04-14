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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  createQuizResult,
  getQuestionsByQuizId,
  getQuizById,
} from "@/lib/data";
import { AlertTriangle, Clock, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage({ params }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(0); // Time left for current question
  const [timedOutQuestions, setTimedOutQuestions] = useState([]); // Track which questions timed out
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching quiz data
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

      // Set initial question time
      if (extendedQuestions.length > 0) {
        setQuestionTimeLeft(extendedQuestions[0].timeLimit);
      }

      // Initialize selected answers array with empty arrays (no selection)
      setSelectedAnswers(new Array(extendedQuestions.length).fill([]));
    }
    setIsLoading(false);
  }, [params.id]);

  // Question timer effect
  useEffect(() => {
    if (!quiz || questions.length === 0) return;

    // Reset question timer when changing questions
    const currentQuestion = questions[currentQuestionIndex];
    setQuestionTimeLeft(currentQuestion.timeLimit);

    const questionTimer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(questionTimer);

          // Mark question as timed out if no answer selected
          if (selectedAnswers[currentQuestionIndex]?.length === 0) {
            setTimedOutQuestions((prev) => [...prev, currentQuestionIndex]);
          }

          // Move to next question or submit if last question
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          } else {
            handleSubmitQuiz();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(questionTimer);
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === "single") {
      // For single-choice questions, replace the selection
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestionIndex] = [answerIndex];
      setSelectedAnswers(newSelectedAnswers);
    } else {
      // For multiple-choice questions, toggle the selection
      const newSelectedAnswers = [...selectedAnswers];
      const currentSelections = [
        ...(newSelectedAnswers[currentQuestionIndex] || []),
      ];

      if (currentSelections.includes(answerIndex)) {
        // Remove if already selected
        newSelectedAnswers[currentQuestionIndex] = currentSelections.filter(
          (i) => i !== answerIndex
        );
      } else {
        // Add if not already selected
        newSelectedAnswers[currentQuestionIndex] = [
          ...currentSelections,
          answerIndex,
        ];
      }

      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // Calculate score
    let score = 0;
    let totalPossibleScore = 0;

    selectedAnswers.forEach((selectedIndices, index) => {
      const question = questions[index];
      if (!question) return;

      totalPossibleScore += question.marks;

      // If question timed out, no points
      if (timedOutQuestions.includes(index)) {
        return;
      }

      if (question.type === "single") {
        // For single-choice questions, the answer is correct if the selected index matches the correct index
        if (
          selectedIndices.length === 1 &&
          selectedIndices[0] === question.correctIndices[0]
        ) {
          score += question.marks;
        }
      } else {
        // For multiple-choice questions, partial credit based on correct selections
        if (selectedIndices.length === 0) return; // No credit for no selection

        // Count correct selections
        const correctSelections = selectedIndices.filter((index) =>
          question.correctIndices.includes(index)
        ).length;

        // Count incorrect selections
        const incorrectSelections = selectedIndices.filter(
          (index) => !question.correctIndices.includes(index)
        ).length;

        // Calculate partial score - award points for correct selections, penalize for incorrect ones
        // but never go below zero for a question
        const partialScore = Math.max(
          0,
          (correctSelections / question.correctIndices.length) *
            question.marks -
            incorrectSelections * (question.marks / question.options.length)
        );

        score += Math.round(partialScore);
      }
    });

    // Convert to percentage
    const percentageScore = Math.round((score / totalPossibleScore) * 100);

    // Simulate saving result with timed out questions
    if (quiz) {
      createQuizResult({
        quizId: quiz.id,
        userId: "1", // Assuming user ID 1 for demo
        score: percentageScore,
        completedAt: new Date(),
      });

      // In a real app, you would also save the timedOutQuestions array
      console.log("Timed out questions:", timedOutQuestions);
    }

    // Redirect to results page
    router.push(`/beta/results/${params.id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Loading quiz...</h2>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Quiz not found or no longer available.
          </AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.push("/beta/quizzes")}>
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Calculate question timer percentage for progress bar
  const questionTimePercentage = currentQuestion
    ? (questionTimeLeft / currentQuestion.timeLimit) * 100
    : 0;

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <CardTitle className="text-xl sm:text-2xl">{quiz.name}</CardTitle>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-md self-start ${
                questionTimeLeft < 10
                  ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-mono">{questionTimeLeft}s</span>
            </div>
          </div>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>

        {currentQuestion && (
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-start gap-2">
                    <h3 className="text-lg font-medium">
                      {currentQuestion.question}
                    </h3>
                    {currentQuestion.type === "multiple" && (
                      <Badge variant="outline" className="mt-1">
                        Multiple answers
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Question timer progress bar */}
                <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                  <div
                    className={`h-1.5 rounded-full ${
                      questionTimeLeft < 10
                        ? "bg-red-500"
                        : questionTimeLeft < 20
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${questionTimePercentage}%` }}
                  ></div>
                </div>

                {currentQuestion.type === "multiple" && (
                  <Alert className="mb-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Multiple answers required</AlertTitle>
                    <AlertDescription>
                      This question has multiple correct answers. Select all
                      that apply.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <Checkbox
                        id={`option-${index}`}
                        checked={
                          selectedAnswers[currentQuestionIndex]?.includes(
                            index
                          ) || false
                        }
                        onCheckedChange={() => handleAnswerSelect(index)}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-grow cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button onClick={handleSubmitQuiz} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
