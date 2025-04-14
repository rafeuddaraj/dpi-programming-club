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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllQuizzes } from "@/lib/data";
import { ArrowLeft, Filter, Pencil, Plus, Tag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Simulated categories data (in a real app, this would be in your data store)
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

// Simulated quiz-category mappings (in a real app, this would be in your data store)
const quizCategories = [
  { quizId: "1", categoryId: "1" }, // JavaScript Fundamentals -> JavaScript
  { quizId: "2", categoryId: "2" }, // React Essentials -> React
  { quizId: "3", categoryId: "3" }, // CSS Mastery -> CSS
  { quizId: "1", categoryId: "4" }, // JavaScript Fundamentals -> General Knowledge
];

export default function CategoriesPage() {
  const router = useRouter();
  const quizzes = getAllQuizzes();
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    color: "bg-gray-500",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // Get quizzes for a category
  const getQuizzesForCategory = (categoryId) => {
    const quizIds = quizCategories
      .filter((qc) => qc.categoryId === categoryId)
      .map((qc) => qc.quizId);

    return quizzes.filter((quiz) => quizIds.includes(quiz.id));
  };

  // Get categories for a quiz
  const getCategoriesForQuiz = (quizId) => {
    const categoryIds = quizCategories
      .filter((qc) => qc.quizId === quizId)
      .map((qc) => qc.categoryId);

    return categories.filter((category) => categoryIds.includes(category.id));
  };

  const handleEditCategory = (category = categories[0]) => {
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color,
    });
    setCurrentCategoryId(category.id);
    setIsEditing(true);
  };

  const handleSaveCategory = () => {
    // In a real app, this would update your data store
    console.log(
      "Saving category:",
      isEditing ? "Update" : "Create",
      newCategory
    );

    // Reset form
    setNewCategory({ name: "", description: "", color: "bg-gray-500" });
    setIsEditing(false);
    setCurrentCategoryId(null);
  };

  const handleDeleteCategory = (categoryId) => {
    // In a real app, this would update your data store
    console.log("Deleting category:", categoryId);
  };

  const colorOptions = [
    { label: "Gray", value: "bg-gray-500" },
    { label: "Red", value: "bg-red-500" },
    { label: "Yellow", value: "bg-yellow-500" },
    { label: "Green", value: "bg-green-500" },
    { label: "Blue", value: "bg-blue-500" },
    { label: "Indigo", value: "bg-indigo-500" },
    { label: "Purple", value: "bg-purple-500" },
    { label: "Pink", value: "bg-pink-500" },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/beta/admin/dashboard")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Quiz Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categories
              </CardTitle>
              <CardDescription>
                Organize your quizzes with categories for better management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quizzes</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => {
                    const categoryQuizzes = getQuizzesForCategory(category.id);
                    return (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${category.color}`}
                            ></div>
                            <span>{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {category.description}
                        </TableCell>
                        <TableCell>{categoryQuizzes.length}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Categorized Quizzes
                </CardTitle>
                <CardDescription>
                  View and manage quiz categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz Name</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="text-right w-[100px]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes.map((quiz) => {
                      const quizCategories = getCategoriesForQuiz(quiz.id);
                      return (
                        <TableRow key={quiz.id}>
                          <TableCell>{quiz.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {quizCategories.map((category) => (
                                <Badge
                                  key={category.id}
                                  variant="outline"
                                  className={`text-white ${category.color}`}
                                >
                                  {category.name}
                                </Badge>
                              ))}
                              {quizCategories.length === 0 && (
                                <span className="text-muted-foreground text-sm">
                                  No categories
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={quiz.isActive ? "default" : "outline"}
                            >
                              {quiz.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Edit Categories
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Category" : "Create Category"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? "Update an existing category"
                  : "Add a new category to organize your quizzes"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Enter category name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryDescription">Description</Label>
                <Input
                  id="categoryDescription"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter category description"
                />
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((color) => (
                    <div
                      key={color.value}
                      className={`h-8 rounded-md cursor-pointer border-2 ${
                        color.value
                      } 
                        ${
                          newCategory.color === color.value
                            ? "border-black dark:border-white"
                            : "border-transparent"
                        }`}
                      onClick={() =>
                        setNewCategory({ ...newCategory, color: color.value })
                      }
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setNewCategory({
                    name: "",
                    description: "",
                    color: "bg-gray-500",
                  });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveCategory}>
                {isEditing ? (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Update Category
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
