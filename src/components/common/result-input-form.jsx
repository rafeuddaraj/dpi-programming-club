"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
export default function ResultInputForm({ onSubmit, existingResults }) {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSemester) {
      toast({
        title: "Error",
        description: "Please select a semester",
        variant: "destructive",
      });
      return;
    }

    const cgpaValue = Number.parseFloat(cgpa);
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 4) {
      toast.warning("Invalid CGPA", {
        description: "CGPA must be a number between 0 and 4",
      });
      return;
    }

    onSubmit({
      semester: Number.parseInt(selectedSemester),
      cgpa: cgpaValue,
    });

    toast.success("Success", {
      description: `Semester ${selectedSemester} result saved successfully`,
    });

    // Reset form
    setCgpa("");
  };

  const loadExistingResult = (semester) => {
    setSelectedSemester(semester);
    const existingResult = existingResults.find(
      (r) => r.semester === Number.parseInt(semester)
    );
    if (existingResult) {
      setCgpa(existingResult.cgpa.toString());
    } else {
      setCgpa("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="semester">Select Semester</Label>
        <Select value={selectedSemester} onValueChange={loadExistingResult}>
          <SelectTrigger id="semester">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
              <SelectItem key={semester} value={semester.toString()}>
                {semester}
                {getOrdinalSuffix(semester)} Semester
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cgpa">CGPA (out of 4.0)</Label>
        <Input
          id="cgpa"
          type="number"
          step="0.01"
          min="0"
          max="4"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          placeholder="Enter CGPA"
        />
      </div>

      <Button type="submit" className="w-full">
        Save Result
      </Button>
    </form>
  );
}

function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
