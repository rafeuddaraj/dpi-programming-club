"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  roll: z.string().min(6, "Roll number must be at least 6 characters"),
  regulation: z.string(),
  examType: z.string(),
});

const EXAMS = [
  "Diploma In Engineering",
  "Diploma In Engineering (Army)",
  "Diploma In Engineering (Naval)",
  "Diploma In Tourism And Hospitality",
  "Diploma In Textile Engineering",
  "Diploma In Agriculture",
  "Diploma In Fisheries",
  "Diploma In Forestry",
  "Diploma In Livestock",
  "Diploma In Medical Technology",
  "Certificate In Medical Ultrasound",
  "Diploma In Commerce",
  "Certificate In Marine Trade",
  "Advanced Certificate Course",
  "National Skill Standard Basic Certificate Course",
  "HSC (Business Management)",
  "HSC (Vocational)",
];

const REGULATIONS = ["ANY", "2010", "2016", "2022"];

export default function CheckResult() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const clientSearchParams = useSearchParams();
  // console.log(clientSearchParams);

  const searchParams = new URLSearchParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roll: "",
      regulation: REGULATIONS[REGULATIONS?.length - 1],
      examType: EXAMS[0].toUpperCase(),
    },
  });

  // useEffect(() => {
  //   const roll = clientSearchParams.get("roll");
  //   const regulation = clientSearchParams.get("regulation");
  //   const exam = clientSearchParams?.get("exam");
  //   console.log({ exam });

  //   form.reset({ examType: exam, regulation, roll });
  //   console.log({ roll, exam, regulation });
  // }, [clientSearchParams]);

  function onSubmit(values) {
    setIsSubmitting(true);
    searchParams.append("regulation", values?.regulation);
    searchParams.append("exam", values?.examType);
    router.push(
      `/bteb-results/results/${values.roll}?${searchParams?.toString()}`
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto my-10">
      <CardHeader>
        <Link
          href="/bteb-results"
          className="flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 mb-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
        <CardTitle className="text-2xl">Check Your Result</CardTitle>
        <CardDescription>
          Enter your details to view your examination results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="roll"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your roll number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="regulation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regulation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select regulation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REGULATIONS?.map((regulation) => (
                        <SelectItem value={regulation}>{regulation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXAMS?.map((exam) => (
                        <SelectItem key={exam} value={exam?.toUpperCase()}>
                          {exam}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search Result
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
