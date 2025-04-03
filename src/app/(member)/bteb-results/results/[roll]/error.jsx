"use client";

import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ErrorPage({ error }) {
  const router = useRouter();
  return (
    <>
      <Card className="w-full max-w-md mx-auto py-10">
        <CardHeader>
          <CardTitle className="text-2xl">Result Not Found</CardTitle>
          <CardDescription>
            We couldn't find any results matching your search criteria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error ||
                "No result found for the provided roll number. Please check and try again."}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Link href="/check-result">
            <Button>Try Again</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
