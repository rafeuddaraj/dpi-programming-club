"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  createQuizQuestion,
  deleteQuizQuestion,
  getQuestionsByQuizId,
  getQuizById,
  updateQuizQuestion,
} from "@/lib/data";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  GripVertical,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function QuizQuestionsPage({ params }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    quizId: params.id,
    question: "",
    options: ["", ""],
    isActive: true,
    correctIndices: [],
    marks: 10,
    timeLimit: 30, // Default 30 seconds per question
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Simulate fetching quiz data
  useEffect(() => {
    const fetchedQuiz = getQuizById(params.id);
    if (fetchedQuiz) {
      setQuiz(fetchedQuiz);
      const fetchedQuestions = getQuestionsByQuizId(params.id);

      // Convert single correctIndex to array of correctIndices
      const extendedQuestions = fetchedQuestions.map((q, index) => ({
        ...q,
        correctIndices: [q.correctIndex],
        timeLimit: 15 + (index % 3) * 15, // Add simulated time limits (15, 30, or 45 seconds)
      }));

      setQuestions(extendedQuestions);
    }
    setIsLoading(false);
  }, [params.id]);

  const handleQuestionChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleAddOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions.splice(index, 1);

    // Update correctIndices to account for removed option
    let newCorrectIndices = [...(currentQuestion.correctIndices || [])];
    newCorrectIndices = newCorrectIndices.filter((i) => i !== index);
    newCorrectIndices = newCorrectIndices.map((i) => (i > index ? i - 1 : i));

    setCurrentQuestion((prev) => ({
      ...prev,
      options: newOptions,
      correctIndices: newCorrectIndices,
    }));
  };

  const handleCorrectAnswerToggle = (index) => {
    setCurrentQuestion((prev) => {
      const currentCorrectIndices = [...(prev.correctIndices || [])];

      if (currentCorrectIndices.includes(index)) {
        return {
          ...prev,
          correctIndices: currentCorrectIndices.filter((i) => i !== index),
        };
      } else {
        return {
          ...prev,
          correctIndices: [...currentCorrectIndices, index],
        };
      }
    });
  };

  const handleMarksChange = (e) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      marks: Number.parseInt(e.target.value),
    }));
  };

  const handleIsActiveChange = (checked) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleSaveQuestion = () => {
    if (
      !currentQuestion.question ||
      !currentQuestion.options?.length ||
      currentQuestion.options.some((opt) => !opt) ||
      !currentQuestion.correctIndices?.length
    ) {
      alert("Please fill in all fields and select at least one correct answer");
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && currentQuestion.id) {
        // For backward compatibility, use the first correct answer as the correctIndex
        const correctIndex = currentQuestion.correctIndices?.[0] || 0;

        // Update existing question
        updateQuizQuestion(currentQuestion.id, {
          ...currentQuestion,
          correctIndex,
        });

        setQuestions((prev) =>
          prev.map((q, idx) =>
            idx === editingIndex ? { ...currentQuestion } : q
          )
        );
      } else {
        // For backward compatibility, use the first correct answer as the correctIndex
        const correctIndex = currentQuestion.correctIndices?.[0] || 0;

        // Create new question
        const newQuestion = createQuizQuestion({
          ...currentQuestion,
          correctIndex,
        });

        // Add to our extended questions array
        const extendedNewQuestion = {
          ...newQuestion,
          correctIndices: currentQuestion.correctIndices || [correctIndex],
          timeLimit: currentQuestion.timeLimit || 30,
        };

        setQuestions((prev) => [...prev, extendedNewQuestion]);
      }

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error saving question:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditQuestion = (question, index) => {
    setCurrentQuestion(question);
    setIsEditing(true);
    setEditingIndex(index);
    setExpandedQuestion(null); // Close any expanded question
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteQuizQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleDuplicateQuestion = (question) => {
    const duplicatedQuestion = {
      ...question,
      id: undefined,
      question: `${question.question} (Copy)`,
    };

    setCurrentQuestion(duplicatedQuestion);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const resetForm = () => {
    setCurrentQuestion({
      quizId: params.id,
      question: "",
      options: ["", ""],
      isActive: true,
      correctIndices: [],
      marks: 10,
      timeLimit: 30,
    });
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleAddNewQuestion = () => {
    resetForm();
  };

  const moveQuestionUp = (index) => {
    if (index === 0) return;

    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index - 1];
    newQuestions[index - 1] = temp;

    setQuestions(newQuestions);
  };

  const moveQuestionDown = (index) => {
    if (index === questions.length - 1) return;

    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + 1];
    newQuestions[index + 1] = temp;

    setQuestions(newQuestions);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">
            Loading quiz questions...
          </h2>
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
          <AlertDescription>Quiz not found.</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button onClick={() => router.push("/beta/admin/quizzes")}>
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6">
      <div className="flex items-center mb-6 flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/quizzes")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quizzes
        </Button>
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
          Manage Questions: {quiz.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Question" : "Add New Question"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? "Update the question details below"
                  : "Fill in the details to add a new question to this quiz"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  value={currentQuestion.question}
                  onChange={handleQuestionChange}
                  placeholder="Enter your question"
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Answer Options</Label>
                  <Badge variant="outline" className="font-normal">
                    {currentQuestion.correctIndices?.length || 0} correct
                    answer(s) selected
                  </Badge>
                </div>

                {currentQuestion.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-none">
                      <Checkbox
                        id={`correct-${index}`}
                        checked={
                          currentQuestion.correctIndices?.includes(index) ||
                          false
                        }
                        onCheckedChange={() => handleCorrectAnswerToggle(index)}
                      />
                    </div>
                    <Input
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      required
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                      disabled={currentQuestion.options?.length <= 2}
                      className="flex-none"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddOption}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marks">Marks</Label>
                  <Input
                    id="marks"
                    type="number"
                    min="1"
                    value={currentQuestion.marks}
                    onChange={handleMarksChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="timeLimit"
                      type="number"
                      min="5"
                      max="300"
                      value={currentQuestion.timeLimit}
                      onChange={(e) =>
                        setCurrentQuestion((prev) => ({
                          ...prev,
                          timeLimit: Number.parseInt(e.target.value),
                        }))
                      }
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Time allowed to answer this question
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end">
                <Switch
                  id="isActive"
                  checked={currentQuestion.isActive}
                  onCheckedChange={handleIsActiveChange}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveQuestion}
                disabled={isSaving}
              >
                {isSaving ? (
                  "Saving..."
                ) : isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Question
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle>Questions ({questions.length})</CardTitle>
                <CardDescription>
                  Manage the questions for this quiz
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddNewQuestion}
                className="ml-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Question
              </Button>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No questions added yet
                  </p>
                </div>
              ) : (
                <Accordion
                  type="single"
                  collapsible
                  value={expandedQuestion}
                  onValueChange={setExpandedQuestion}
                  className="space-y-4"
                >
                  {questions.map((question, index) => (
                    <AccordionItem
                      key={question.id}
                      value={question.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="flex items-center border-b p-3 sm:p-4">
                        <div className="flex items-center mr-2 text-muted-foreground">
                          <GripVertical className="h-5 w-5" />
                          <span className="font-medium ml-1">{index + 1}</span>
                        </div>

                        <AccordionTrigger className="hover:no-underline py-0 flex-grow">
                          <div className="flex items-start justify-between w-full text-left">
                            <div className="flex-grow mr-2">
                              <p className="font-medium line-clamp-1 text-sm sm:text-base">
                                {question.question}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 flex-wrap justify-end">
                              {!question.isActive && (
                                <Badge
                                  variant="outline"
                                  className="text-xs sm:text-sm"
                                >
                                  Inactive
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className="text-xs sm:text-sm"
                              >
                                {question.marks} marks
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs sm:text-sm"
                              >
                                <Clock className="h-3 w-3 mr-1" />
                                {question.timeLimit || 30}s
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <div className="flex ml-2 gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveQuestionUp(index);
                            }}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveQuestionDown(index);
                            }}
                            disabled={index === questions.length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <AccordionContent className="pt-0">
                        <div className="p-3 sm:p-4 pt-2">
                          <div className="grid gap-2 mb-4">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`p-2 text-sm rounded flex items-center ${
                                  question.correctIndices.includes(optIndex)
                                    ? "bg-green-100 dark:bg-green-900/20"
                                    : "bg-muted/40"
                                }`}
                              >
                                <span className="mr-2 font-medium">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span className="flex-grow">{option}</span>
                                {question.correctIndices.includes(optIndex) && (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100 dark:bg-green-900/20 ml-2"
                                  >
                                    Correct
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-end space-x-2 flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateQuestion(question);
                              }}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditQuestion(question, index);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteQuestion(question.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/admin/quizzes/${params.id}/edit`)}
              >
                Back to Quiz Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
