"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form validation schema
const searchFormSchema = z.object({
  query: z.string().min(1, "Please enter a roll number to search"),
});

// Mock database function - replace with actual API call in a real application
const searchMemberByRollNumber = async (rollNumber) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock database with some sample users
  const mockDatabase = [
    {
      id: "1",
      rollNumber: "FY23-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Treasurer",
      photoUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      rollNumber: "FY23-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Secretary",
      photoUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      rollNumber: "FY23-003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "Member",
      photoUrl: "/placeholder.svg?height=40&width=40",
    },
  ];

  const member = mockDatabase.find((m) =>
    m.rollNumber.toLowerCase().includes(rollNumber.toLowerCase())
  );
  return member || null;
};

export default function MemberSearch({ ElectionYearId }) {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.query) return;

    setIsSearching(true);
    setError("");
    setSearchResult(null);

    try {
      const result = await searchMemberByRollNumber(data.query);
      if (result) {
        setSearchResult(result);
      } else {
        setError("No member found with that roll number");
      }
    } catch (error) {
      setError("An error occurred while searching");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddMember = () => {
    if (ElectionYearId && searchResult) {
      router.push(
        `/dashboard/managements/${ElectionYearId}/members/new?rollNumber=${searchResult.rollNumber}`
      );
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="search"
                    placeholder="Search by roll number..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSearching || !form.watch("query")}>
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Form>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {searchResult && (
        <Card className="w-full max-w-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Image
                src={searchResult.photoUrl || "/placeholder.svg"}
                alt={searchResult.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-medium">{searchResult.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {searchResult.rollNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  {searchResult.email}
                </p>
              </div>
              {ElectionYearId && (
                <Button size="sm" onClick={handleAddMember}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
