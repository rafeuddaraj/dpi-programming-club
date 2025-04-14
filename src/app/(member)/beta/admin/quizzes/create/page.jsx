"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createQuiz } from "@/lib/data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  FileText,
  Import,
  Plus,
  Settings,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Simulated categories data (in a real app, this would be fetched from your data store)
const categories = [
  {
    id: "1",
    name: "JavaScript",
    description: "JavaScript programming concepts and techniques",
    color: "bg-yellow-500",
  },
  {
    id: "2",
    name: "React",
    description: "React framework and component development",
    color: "bg-blue-500",
  },
  {
    id: "3",
    name: "CSS",
    description: "CSS styling and layout techniques",
    color: "bg-pink-500",
  },
  {
    id: "4",
    name: "General Knowledge",
    description: "General programming knowledge and concepts",
    color: "bg-green-500",
  },
  {
    id: "5",
    name: "TypeScript",
    description: "TypeScript type system and features",
    color: "bg-blue-700",
  },
];

export default function CreateQuizPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalMarks: 100,
    isActive: false,
    startTime: new Date().toISOString().split("T")[0],
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    passingScore: 60,
    attemptsAllowed: 1,
    showResults: "immediately", // immediately, after_end_date, never
    randomizeQuestions: false,
    questionTimeLimit: 30, // Default time per question in seconds
    autoAdvance: true,
    markUnansweredAsIncorrect: true,
    selectedCategories: [],
    quizType: "standard", // standard, practice, survey
    showCorrectAnswers: true,
    allowReview: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSwitchChange = (name) => (checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => {
      const selectedCategories = [...prev.selectedCategories];
      if (selectedCategories.includes(categoryId)) {
        return {
          ...prev,
          selectedCategories: selectedCategories.filter(
            (id) => id !== categoryId
          ),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...selectedCategories, categoryId],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert string dates to Date objects
      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);

      // Create the quiz
      const newQuiz = createQuiz({
        ...formData,
        totalMarks: Number(formData.totalMarks),
        startTime,
        endTime,
      });

      // In a real app, you would also save the categories and other settings
      console.log("Selected categories:", formData.selectedCategories);
      console.log("Quiz settings:", formData);

      // Redirect to questions page
      router.push(`/beta/admin/quizzes/${newQuiz.id}/questions`);
    } catch (error) {
      console.error("Error creating quiz:", error);
      setIsSubmitting(false);
    }
  };

  const getSelectedCategoryNames = () => {
    return formData.selectedCategories
      .map((id) => categories.find((cat) => cat.id === id)?.name)
      .filter(Boolean);
  };

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
          Create New Quiz
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Basic Info</span>
                </TabsTrigger>
                <TabsTrigger value="timing" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">Timing</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className="flex items-center gap-2"
                >
                  <Tag className="h-4 w-4" />
                  <span className="hidden sm:inline">Categories</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Enter the basic details for your quiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Quiz Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter quiz name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter quiz description"
                        required
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="totalMarks">Total Marks</Label>
                        <Input
                          id="totalMarks"
                          name="totalMarks"
                          type="number"
                          min="1"
                          value={formData.totalMarks}
                          onChange={handleNumberChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passingScore">Passing Score (%)</Label>
                        <Input
                          id="passingScore"
                          name="passingScore"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.passingScore}
                          onChange={handleNumberChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quizType">Quiz Type</Label>
                      <Select
                        value={formData.quizType}
                        onValueChange={handleSelectChange("quizType")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select quiz type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard Assessment
                          </SelectItem>
                          <SelectItem value="practice">
                            Practice Quiz
                          </SelectItem>
                          <SelectItem value="survey">Survey/Poll</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.quizType === "standard"
                          ? "Standard quizzes are graded and have time limits."
                          : formData.quizType === "practice"
                          ? "Practice quizzes allow multiple attempts and show correct answers."
                          : "Surveys collect opinions without right or wrong answers."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Timing & Availability</CardTitle>
                    <CardDescription>
                      Set when the quiz is available and how long participants
                      have to complete it
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Date</Label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="startTime"
                            name="startTime"
                            type="date"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Date</Label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="endTime"
                            name="endTime"
                            type="date"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="questionTimeLimit">
                        Default Time Per Question (seconds)
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="questionTimeLimit"
                          name="questionTimeLimit"
                          type="number"
                          min="5"
                          max="300"
                          value={formData.questionTimeLimit}
                          onChange={handleNumberChange}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        This is the default time limit for each question. You
                        can customize time limits for individual questions
                        later.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoAdvance"
                        checked={formData.autoAdvance}
                        onCheckedChange={handleSwitchChange("autoAdvance")}
                      />
                      <Label htmlFor="autoAdvance">
                        Automatically advance to next question when time expires
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="markUnansweredAsIncorrect"
                        checked={formData.markUnansweredAsIncorrect}
                        onCheckedChange={handleSwitchChange(
                          "markUnansweredAsIncorrect"
                        )}
                      />
                      <Label htmlFor="markUnansweredAsIncorrect">
                        Mark unanswered questions as incorrect
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={handleSwitchChange("isActive")}
                      />
                      <Label htmlFor="isActive">
                        Make quiz active immediately
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Settings</CardTitle>
                    <CardDescription>
                      Configure how the quiz behaves and what participants can
                      see
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="attemptsAllowed">Attempts Allowed</Label>
                      <Input
                        id="attemptsAllowed"
                        name="attemptsAllowed"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.attemptsAllowed}
                        onChange={handleNumberChange}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        How many times a participant can take this quiz
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="showResults">Show Results</Label>
                      <Select
                        value={formData.showResults}
                        onValueChange={handleSelectChange("showResults")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select when to show results" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediately">
                            Immediately after completion
                          </SelectItem>
                          <SelectItem value="after_end_date">
                            After quiz end date
                          </SelectItem>
                          <SelectItem value="never">
                            Never (admin only)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="randomizeQuestions"
                        checked={formData.randomizeQuestions}
                        onCheckedChange={handleSwitchChange(
                          "randomizeQuestions"
                        )}
                      />
                      <Label htmlFor="randomizeQuestions">
                        Randomize question order
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showCorrectAnswers"
                        checked={formData.showCorrectAnswers}
                        onCheckedChange={handleSwitchChange(
                          "showCorrectAnswers"
                        )}
                      />
                      <Label htmlFor="showCorrectAnswers">
                        Show correct answers after completion
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowReview"
                        checked={formData.allowReview}
                        onCheckedChange={handleSwitchChange("allowReview")}
                      />
                      <Label htmlFor="allowReview">
                        Allow participants to review their answers
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>
                      Assign categories to organize and filter your quiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors
                            ${
                              formData.selectedCategories.includes(category.id)
                                ? "border-primary bg-primary/10"
                                : "border-border hover:bg-muted/50"
                            }`}
                          onClick={() => handleCategoryToggle(category.id)}
                        >
                          <div
                            className={`h-3 w-3 rounded-full mr-3 ${category.color}`}
                          ></div>
                          <div className="flex-grow">
                            <p className="font-medium">{category.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {category.description}
                            </p>
                          </div>
                          <Switch
                            checked={formData.selectedCategories.includes(
                              category.id
                            )}
                            onCheckedChange={() =>
                              handleCategoryToggle(category.id)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Create New Category
                      </Button>

                      <div className="text-sm text-muted-foreground">
                        {formData.selectedCategories.length} categories selected
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Quiz Summary</CardTitle>
                <CardDescription>
                  Review your quiz details before creating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">
                    {formData.name || "Untitled Quiz"}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.description || "No description provided"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">
                      {formData.quizType}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Marks</p>
                    <p className="font-medium">{formData.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time Limit</p>
                    <p className="font-medium">
                      {formData.questionTimeLimit} seconds per question
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Passing Score</p>
                    <p className="font-medium">{formData.passingScore}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Availability
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>
                      {new Date(formData.startTime).toLocaleDateString()} -{" "}
                      {new Date(formData.endTime).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {formData.selectedCategories.length > 0 ? (
                      getSelectedCategoryNames().map((name, index) => (
                        <Badge key={index} variant="outline">
                          {name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No categories selected
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <Import className="h-4 w-4" />
                    Import Questions
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Preview Quiz
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Quiz"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/admin/quizzes")}
                  className="w-full"
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
