"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Separator } from "@/components/ui/separator";
// import { getStudentResult, saveStudentResult } from "@/lib/database";
import { AlertCircle, Check, Save, Search } from "lucide-react";
import { useState } from "react";

export default function ResultManualEntry() {
  const [rollNumber, setRollNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [referredSubjects, setReferredSubjects] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      setMessage({ type: "error", text: "Please enter a roll number." });
      return;
    }

    setIsSearching(true);
    setMessage({ type: "", text: "" });

    try {
      // const result = await getStudentResult(rollNumber);

      if (result) {
        setStudentData(result);
        setReferredSubjects(result.referredSubjects?.join(", ") || "");
        setMessage({
          type: "success",
          text: "Student record found. You can update the details below.",
        });
      } else {
        // Initialize empty student data for new entry
        setStudentData({
          gpa1: 0,
          gpa2: 0,
          gpa3: 0,
          gpa4: 0,
          gpa5: 0,
          gpa6: 0,
        });
        setReferredSubjects("");
        setMessage({
          type: "info",
          text: "No existing record found. You can enter new details below.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error searching for student. Please try again.",
      });
      setStudentData(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSave = async () => {
    if (!rollNumber.trim() || !studentData) {
      setMessage({
        type: "error",
        text: "Please enter a roll number and student data.",
      });
      return;
    }

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // Process referred subjects
      const subjects = referredSubjects
        .split(",")
        .map((subject) => subject.trim())
        .filter((subject) => subject !== "");

      // Create updated student data
      const updatedData = {
        ...studentData,
        referredSubjects: subjects.length > 0 ? subjects : undefined,
      };

      // await saveStudentResult(rollNumber, updatedData);
      setMessage({ type: "success", text: "Student data saved successfully." });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error saving student data. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (!studentData) return;

    const numValue = Number.parseFloat(value) || 0;
    setStudentData({
      ...studentData,
      [field]: numValue,
    });
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Manual Entry System</CardTitle>
          <CardDescription>
            Search for a student by roll number to view or update their results,
            or enter new results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="roll-number">Student Roll Number</Label>
              <div className="flex mt-1">
                <Input
                  id="roll-number"
                  placeholder="Enter roll number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="ml-2"
                  onClick={handleSearch}
                  disabled={isSearching || !rollNumber.trim()}
                >
                  {isSearching ? (
                    "Searching..."
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {message.text && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          {message.type === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : message.type === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {message.type === "error"
              ? "Error"
              : message.type === "success"
              ? "Success"
              : "Information"}
          </AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {studentData && (
        <Card>
          <CardHeader>
            <CardTitle>Student Result Data</CardTitle>
            <CardDescription>
              {rollNumber
                ? `Editing results for Roll Number: ${rollNumber}`
                : "Enter student result data"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((semester) => (
                  <div key={semester} className="space-y-2">
                    <Label htmlFor={`gpa${semester}`}>
                      Semester {semester} GPA
                    </Label>
                    <Input
                      id={`gpa${semester}`}
                      type="number"
                      min="0"
                      max="4"
                      step="0.01"
                      value={studentData[`gpa${semester}`] || ""}
                      onChange={(e) =>
                        handleInputChange(`gpa${semester}`, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="referred-subjects">
                  Referred Subjects (comma separated)
                </Label>
                <Input
                  id="referred-subjects"
                  placeholder="e.g. Math101, Physics102"
                  value={referredSubjects}
                  onChange={(e) => setReferredSubjects(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Results"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
