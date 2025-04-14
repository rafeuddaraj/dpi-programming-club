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
import {
  BarChart3,
  FileText,
  Users,
  Clock,
  Calendar,
  Settings,
  Copy,
  Download,
  Upload,
} from "lucide-react";
import { getAllQuizzes, quizResults, users } from "@/lib/data";

export default function AdminDashboardPage() {
  const quizzes = getAllQuizzes();
  const activeQuizzes = quizzes.filter((quiz) => quiz.isActive);
  const upcomingQuizzes = quizzes.filter(
    (quiz) => new Date(quiz.startTime) > new Date()
  );
  const totalParticipants = quizResults.length;
  const averageScore =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce((acc, result) => acc + result.score, 0) /
            quizResults.length
        )
      : 0;

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Quiz Management Dashboard
        </h1>
        <div className="flex space-x-2">
          <Link href="/beta/admin/quizzes/create">
            <Button>Create Quiz</Button>
          </Link>
          <Link href="/beta/admin/settings">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quizzes.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeQuizzes.length} active, {upcomingQuizzes.length} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Participants
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across{" "}
              {quizResults.length > 0
                ? new Set(quizResults.map((r) => r.quizId)).size
                : 0}{" "}
              quizzes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {quizResults.length} completed quizzes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((totalParticipants / users.length) * 100)}%
              participation rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest quiz completions and participations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizResults.slice(0, 5).map((result) => {
                const quiz = quizzes.find((q) => q.id === result.quizId);
                const user = users.find((u) => u.id === result.userId);

                return (
                  <div
                    key={result.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">
                        {user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Completed "{quiz?.name || "Unknown Quiz"}"
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2">{result.score}%</Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}

              {quizResults.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No activity yet</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/beta/admin/results" className="w-full">
              <Button variant="outline" className="w-full">
                View All Results
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Quizzes</CardTitle>
            <CardDescription>Quizzes scheduled to start soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingQuizzes.slice(0, 5).map((quiz) => {
                const daysUntilStart = Math.ceil(
                  (new Date(quiz.startTime).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                );

                return (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-medium">{quiz.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{quiz.duration} min</span>
                        <span className="mx-1">•</span>
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(quiz.startTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={daysUntilStart <= 3 ? "default" : "outline"}
                    >
                      {daysUntilStart <= 0
                        ? "Today"
                        : `In ${daysUntilStart} days`}
                    </Badge>
                  </div>
                );
              })}

              {upcomingQuizzes.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No upcoming quizzes</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/beta/admin/quizzes" className="w-full">
              <Button variant="outline" className="w-full">
                Manage All Quizzes
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Templates</CardTitle>
            <CardDescription>
              Duplicate and reuse existing quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizzes.slice(0, 3).map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{quiz.name}</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/beta/admin/templates" className="w-full">
              <Button variant="outline" className="w-full">
                Manage Templates
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Import/Export</CardTitle>
            <CardDescription>
              Import or export quizzes in various formats
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Quiz
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Quiz
            </Button>
          </CardContent>
          <CardFooter>
            <Link href="/beta/admin/import-export" className="w-full">
              <Button variant="outline" className="w-full">
                Advanced Options
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Assignment</CardTitle>
            <CardDescription>Assign quizzes to specific users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.slice(0, 3).map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm">{user.name}</span>
                  <Button variant="ghost" size="sm">
                    Assign
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/beta/admin/assignments" className="w-full">
              <Button variant="outline" className="w-full">
                Manage Assignments
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
