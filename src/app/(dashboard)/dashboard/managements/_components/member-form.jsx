"use client";

import {
  createManagementMember,
  getUserByRoll,
  updateManagementMember,
} from "@/app/actions/managements";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Predefined roles
export const predefinedRoles = [
  { value: 1, name: "President" },
  { value: 2, name: "Vice President" },
  { value: 3, name: "General Secretary" },
  { value: 4, name: "Executive Officer" },
  { value: 5, name: "Deputy General Secretary" },
  { value: 6, name: "Executive Administrator" },
  { value: 7, name: "Finance Manager" },
  { value: 8, name: "Assistant Finance Manager" },
  { value: 9, name: "Technical Head" },
  { value: 10, name: "Assistant Technical Head" },
  { value: 11, name: "Cultural Editor" },
  { value: 12, name: "Cultural Editor (Female)" },
  { value: 13, name: "Assistant Cultural Editor" },
  { value: 14, name: "Publicity Secretary" },
  { value: 15, name: "Associate Publicity Secretary" },
];

// Form validation schema
const memberFormSchema = z.object({
  id: z.string().readonly(),
  rollNo: z.string().min(1, "Roll number is required"),
  name: z.string().min(1, "Name is required").readonly(),
  email: z.string().email("Invalid email address").readonly(),
  role: z.string().min(1, "Role is required"),
});

export default function MemberForm({ memberData, yearId, roles }) {
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [availableRoles, setAvailableRoles] = useState(roles);
  const [userFound, setUserFound] = useState(false);
  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(memberFormSchema),
    defaultValues: memberData || {
      rollNo: "",
      name: "",
      email: "",
      role: "",
    },
  });
  const onSubmit = async (data) => {
    if (!userFound && !memberData) {
      setSearchError("You must find a valid user by roll number first");
      return;
    }

    setIsLoading(true);

    try {
      let resp = null;
      const roleValue = parseInt(data?.role);
      const role = roles.find((role) => role.value === roleValue);
      data.role = role;
      if (memberData) {
        const memberId = memberData?.id;
        // const updatedData = {  };
        await toast.promise(updateManagementMember(memberId, { role }), {
          loading: "Updating...",
          error: "There was an problem!",
          success: "Updating done",
        });
      } else {
        data.electionId = yearId;

        data.userId = data?.id;
        delete data?.id;
        delete data?.rollNo;
        const resp = await toast.promise(createManagementMember(data), {
          loading: "Creating...",
          error: "There was an problem!",
          success: "Creating done",
        });
      }

      router.push(`/dashboard/managements/${yearId}/members`);
      router.refresh();
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload the file to your server or a storage service
      // For this demo, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSearch = async () => {
    const rollNo = form.getValues("rollNo");

    if (!rollNo) return;
    setIsSearching(true);
    setSearchError("");
    setUserFound(false);

    try {
      const resp = await getUserByRoll(rollNo, yearId);

      if (resp?.error) throw Error(resp?.message);
      const member = resp?.data;

      // Populate form with fetched data
      form.setValue("name", member?.name);
      form.setValue("email", member?.email);
      form.setValue("id", member?.user?.id);
      setPhotoUrl(member?.user?.avatar);
      setUserFound(true);
    } catch (error) {
      // console.log(error);

      setSearchError(
        error?.message || "Member not found. Please check the roll number."
      );
      form.setValue("name", "");
      form.setValue("email", "");
      setPhotoUrl(null);
    } finally {
      setIsSearching(false);
    }
  };
  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((part) => part[0])
      ?.join("")
      ?.toUpperCase();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!memberData && (
          <FormField
            control={form.control}
            name="rollNo"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Roll Number</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input {...field} placeholder="e.g., FY23-001" />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={handleSearch}
                    disabled={isSearching || !field.value}
                    variant="secondary"
                  >
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a roll number and click search to fetch member data
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {searchError && (
          <Alert variant="destructive">
            <AlertDescription>{searchError}</AlertDescription>
          </Alert>
        )}

        {(userFound || memberData) && (
          <>
            {userFound && (
              <Alert>
                <AlertDescription className="text-green-600">
                  User found! You can now add them to this Election year.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={photoUrl} alt={form.getValues("name")} />
                  <AvatarFallback>
                    {getInitials(form.getValues("name"))}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              disabled
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter member's full name"
                      readOnly={!userFound}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              disabled
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter member's email address"
                      readOnly={!userFound}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Role</FormLabel>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableRoles?.map(({ value, name }) => (
                          <SelectItem
                            key={value.toString()}
                            value={value.toString()}
                          >
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading ? true : false}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading ? true : false}>
                {isLoading
                  ? "Saving..."
                  : memberData
                  ? "Update Member"
                  : "Add Member"}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
