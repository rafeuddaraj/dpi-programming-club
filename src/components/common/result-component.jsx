import { AlertCircle, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ResultComponent({ result, isHeader = false }) {
  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((part) => part[0])
      ?.join("")
      ?.toUpperCase()
      ?.substring(0, 2);
  };
  // Filter out null GPAs and create semester cards
  const semesterGpas = Object.entries(result.cgps)
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => {
      const semesterNumber = key.replace("gpa", "");
      return {
        semester: semesterNumber,
        gpa: value,
      };
    })
    .sort((a, b) => Number(b.semester) - Number(a.semester));

  const getGpaColor = (gpa) => {
    if (gpa === null) return "";
    if (gpa === "ref") return "text-red-600 dark:text-red-400";
    if (typeof gpa === "number") {
      if (gpa >= 3.5) return "text-green-600 dark:text-green-400";
      if (gpa >= 2.5) return "text-amber-600 dark:text-amber-400";
      return "text-red-600 dark:text-red-400";
    }
    return "";
  };

  const getGpaBackgroundColor = (gpa) => {
    if (gpa === null) return "bg-slate-100 dark:bg-slate-800";
    if (gpa === "ref") return "bg-red-50 dark:bg-red-950/30";
    if (typeof gpa === "number") {
      if (gpa >= 3.5) return "bg-green-50 dark:bg-green-950/30";
      if (gpa >= 2.5) return "bg-amber-50 dark:bg-amber-950/30";
      return "bg-red-50 dark:bg-red-950/30";
    }
    return "bg-slate-100 dark:bg-slate-800";
  };

  // Calculate average GPA
  const totalGpa = semesterGpas.reduce((sum, item) => sum + (item.gpa || 0), 0);
  const averageGpa = totalGpa / semesterGpas.length;

  const pageTitle = `BTEB Result - ${result.roll} - ${
    result.name || "Student"
  }`;
  const pageDescription = `${result.institute} | ${result.exam} | Average GPA: ${averageGpa}`;

  return (
    <>
      {isHeader && (
        <Card className="mb-6 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              {result?.avatar && (
                <Avatar className="w-16 h-16 border-2 border-slate-200 dark:border-slate-700">
                  <AvatarImage
                    src={result.avatar}
                    alt={result.name || "Student"}
                  />
                  <AvatarFallback>
                    {result.name ? getInitials(result.name) : "ST"}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <CardTitle className="text-2xl">{result.institute}</CardTitle>
                <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm">
                    {result.exam}
                  </span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm">
                    Regulation: {result.regulation}
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Roll Number
                </p>
                <p className="font-medium">{result.roll}</p>
              </div>
              {result.name && (
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Student Name
                  </p>
                  <p className="font-medium">{result.name}</p>
                </div>
              )}
            </div>

            {result?.ref_sub && result?.ref_sub?.length > 0 && (
              <Alert variant="destructive" className="animate-pulse">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Failed Subjects</AlertTitle>
                <AlertDescription>
                  ❌ You have failed in one or more subjects.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {result.ref_sub && result.ref_sub.length > 0 && (
        <Card className="mb-6 border-red-200 dark:border-red-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-red-600 dark:text-red-400">
              Referred Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {result.ref_sub.map((subject, index) => (
                <li key={index} className="text-red-600 dark:text-red-400">
                  {subject}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {semesterGpas.map((item) => (
          <Card
            key={item.semester}
            className={`transition-all duration-300 hover:shadow-md ${getGpaBackgroundColor(
              item.gpa
            )}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {item.semester}
                <sup>{getSuffix(item.semester)}</sup> Semester
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  GPA
                </span>
                <span className={`text-2xl font-bold ${getGpaColor(item.gpa)}`}>
                  {typeof item.gpa === "number"
                    ? item.gpa.toFixed(2)
                    : item.gpa === "ref"
                    ? "Referred"
                    : item.gpa}
                </span>
              </div>
              {typeof item.gpa === "number" && item.gpa >= 3.5 && (
                <div className="mt-2 flex items-center text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Excellent
                </div>
              )}
              {item.gpa === "ref" && (
                <div className="mt-2 flex items-center text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Failed
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function getSuffix(num) {
  const n = Number.parseInt(num, 10);
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}
