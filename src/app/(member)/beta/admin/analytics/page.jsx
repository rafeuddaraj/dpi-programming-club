"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllQuizzes, quizResults, users } from "@/lib/data";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Download,
  LineChart,
  PieChart,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnalyticsPage() {
  const router = useRouter();
  const quizzes = getAllQuizzes();
  const [selectedQuiz, setSelectedQuiz] = useState("all");
  const [timeRange, setTimeRange] = useState("month");

  // Filter results based on selected quiz and time range
  const filteredResults = quizResults.filter((result) => {
    const isQuizMatch =
      selectedQuiz === "all" || result.quizId === selectedQuiz;

    // Time range filter
    const resultDate = new Date(result.completedAt);
    const now = new Date();

    let isInTimeRange = true;
    if (timeRange === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      isInTimeRange = resultDate >= weekAgo;
    } else if (timeRange === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      isInTimeRange = resultDate >= monthAgo;
    } else if (timeRange === "year") {
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      isInTimeRange = resultDate >= yearAgo;
    } else if (timeRange === "all") {
      isInTimeRange = true;
    }

    return isQuizMatch && isInTimeRange;
  });

  // Calculate stats
  const averageScore =
    filteredResults.length > 0
      ? Math.round(
          filteredResults.reduce((acc, result) => acc + result.score, 0) /
            filteredResults.length
        )
      : 0;

  const totalParticipants = filteredResults.length;

  const scoreDistribution = {
    excellent: filteredResults.filter((r) => r.score >= 80).length,
    good: filteredResults.filter((r) => r.score >= 60 && r.score < 80).length,
    average: filteredResults.filter((r) => r.score >= 40 && r.score < 60)
      .length,
    poor: filteredResults.filter((r) => r.score < 40).length,
  };

  const passRate =
    filteredResults.length > 0
      ? Math.round(
          (filteredResults.filter((r) => r.score >= 60).length /
            filteredResults.length) *
            100
        )
      : 0;

  // Find top performers
  const userScores = users
    .map((user) => {
      const userResults = filteredResults.filter((r) => r.userId === user.id);
      const avgScore =
        userResults.length > 0
          ? Math.round(
              userResults.reduce((acc, r) => acc + r.score, 0) /
                userResults.length
            )
          : 0;
      return {
        ...user,
        avgScore,
        quizzesTaken: userResults.length,
      };
    })
    .sort((a, b) => b.avgScore - a.avgScore);

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
        <h1 className="text-3xl font-bold tracking-tight">Quiz Analytics</h1>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Quiz:</span>
          <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Quiz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quizzes</SelectItem>
              {quizzes.map((quiz) => (
                <SelectItem key={quiz.id} value={quiz.id}>
                  {quiz.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Time Range:</span>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="ml-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              {selectedQuiz === "all"
                ? "Across all quizzes"
                : `For ${
                    quizzes.find((q) => q.id === selectedQuiz)?.name || ""
                  }`}
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
              Based on {filteredResults.length} completions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{passRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Passing score: 60%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Period</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {timeRange === "week"
                ? "Last 7 days"
                : timeRange === "month"
                ? "Last 30 days"
                : timeRange === "year"
                ? "Last 365 days"
                : "All time"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date().toLocaleDateString()} -{" "}
              {timeRange === "week"
                ? new Date(
                    Date.now() - 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()
                : timeRange === "month"
                ? new Date(
                    Date.now() - 30 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()
                : timeRange === "year"
                ? new Date(
                    Date.now() - 365 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()
                : "Beginning"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="distribution">Score Distribution</TabsTrigger>
          <TabsTrigger value="participants">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Quiz performance metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Performance chart would render here
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>
                Breakdown of scores across different ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 rounded-md bg-green-100 dark:bg-green-900/20">
                  <span className="text-xl font-bold text-green-700 dark:text-green-300">
                    {scoreDistribution.excellent}
                  </span>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Excellent (80-100%)
                  </span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-md bg-blue-100 dark:bg-blue-900/20">
                  <span className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {scoreDistribution.good}
                  </span>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    Good (60-79%)
                  </span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-md bg-yellow-100 dark:bg-yellow-900/20">
                  <span className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                    {scoreDistribution.average}
                  </span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">
                    Average (40-59%)
                  </span>
                </div>

                <div className="flex flex-col items-center p-4 rounded-md bg-red-100 dark:bg-red-900/20">
                  <span className="text-xl font-bold text-red-700 dark:text-red-300">
                    {scoreDistribution.poor}
                  </span>
                  <span className="text-sm text-red-600 dark:text-red-400">
                    Needs Improvement (0-39%)
                  </span>
                </div>
              </div>

              <div className="h-[200px] mt-6 flex items-center justify-center bg-muted/40 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Score distribution chart would render here
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>
                Users with the highest average scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Quizzes Taken</TableHead>
                    <TableHead>Avg. Score</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userScores.slice(0, 5).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.quizzesTaken}</TableCell>
                      <TableCell>{user.avgScore}%</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.avgScore >= 80
                              ? "bg-green-500"
                              : user.avgScore >= 60
                              ? "bg-blue-500"
                              : user.avgScore >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }
                        >
                          {user.avgScore >= 80
                            ? "Excellent"
                            : user.avgScore >= 60
                            ? "Good"
                            : user.avgScore >= 40
                            ? "Average"
                            : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}

                  {userScores.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
