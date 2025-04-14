import { Button } from "@/components/button";
import QuizForm from "@/components/common/quizzes/quiz-form";
import { ArrowLeft } from "lucide-react";

export default function CreateQuizPage() {
  return (
    <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center mb-6 flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          // onClick={() => router.push(`/dashboard/quizzes`)}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
          Create New Quiz
        </h1>
      </div>
      <QuizForm />
    </div>
  );
}
