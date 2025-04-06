"use client";
import { updateRegisteredUser } from "@/app/actions/registeredUsers";
import { updateUserByIdOne } from "@/app/actions/users";
import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form"; // Import Controller
import { toast } from "sonner";
import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot be longer than 100 characters")
    .readonly(),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email cannot be longer than 255 characters")
    .readonly(),
  rollNo: z
    .string()
    .min(1, "Roll number is required")
    .max(50, "Roll number cannot be longer than 50 characters")
    .readonly(),
  registrationNo: z
    .string()
    .min(1, "Registration number is required")
    .max(100, "Registration number cannot be longer than 100 characters")
    .readonly(),
  session: z
    .string()
    .min(1, "Session is required")
    .max(50, "Session cannot be longer than 50 characters")
    .readonly(),
  shift: z
    .string()
    .min(1, "Shift is required")
    .max(50, "Shift cannot be longer than 50 characters")
    .readonly(),
  semester: z
    .string()
    .min(1, "Semester is required")
    .max(50, "Semester cannot be longer than 50 characters")
    .readonly(),
  status: z
    .string()
    .min(1, "Status is required")
    .max(50, "Status cannot be longer than 50 characters"),
  role: z
    .string()
    .min(1, "Role is required")
    .max(50, "Role cannot be longer than 50 characters"),
  examiner: z.string().default("false")?.optional(),
});

export default function UserEditForm({ user }) {
  user.examiner = user?.examiner?.toString();

  const {
    register,
    handleSubmit,
    control, // Add control for Controller
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(userSchema), // Zod validation
    defaultValues: user, // Ensure default values are provided
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // Make sure we're sending the correct data
      const { status, role, examiner, ...otherData } = data || {};
      const updateData = {
        status,
        role,
      };
      // Proceed with updating the user
      if (role === "moderator") {
        updateData.examiner =
          examiner?.toString()?.toLowerCase() === "true" ? true : false;
      } else if (role === "member") {
        updateData.examiner = false;
      }
      const queuePromises = [
        updateUserByIdOne(user.id, updateData),
        updateRegisteredUser(user?.registeredUserId, otherData),
      ];
      const resps = await Promise.all(queuePromises);
      if (resps[0]?.error && resps[1]?.error) {
        throw new Error("Error updating user");
      }

      toast.success("Update successful");
      //   router.push("/dashboard/users");
    } catch (error) {
      toast.error("There was an error!");
      // console.error("Error occurred:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/users/${user.id}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to User Details
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit User</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  defaultValue={user?.user?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  defaultValue={user?.user?.email}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input
                  id="rollNo"
                  {...register("rollNo")}
                  defaultValue={user?.user?.rollNo}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNo">Registration Number</Label>
                <Input
                  id="registrationNo"
                  {...register("registrationNo")}
                  defaultValue={user?.user?.registrationNo}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Input
                  id="session"
                  {...register("session")}
                  defaultValue={user?.user?.session}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Input
                  id="shift"
                  {...register("shift")}
                  defaultValue={user?.user?.shift}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                {...register("semester")}
                defaultValue={user?.user?.semester}
                readOnly
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  defaultValue={user.status}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                        <SelectItem value="RESTRICTED">RESTRICTED</SelectItem>
                        <SelectItem value="BANNED">BANNED</SelectItem>
                        <SelectItem value="EXPIRED">EXPIRED</SelectItem>
                        <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                        <SelectItem value="EX">EX</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-red-500">{errors.status.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue={user.role}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>
              {watch("role") === "moderator" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Controller
                      name="examiner"
                      control={control}
                      defaultValue={user.examiner?.toString()}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select Examiner Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Stop</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.role && (
                      <p className="text-red-500">{errors.role.message}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Link href={`/dashboard/users/${user.id}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button disabled={isSubmitting} type="submit">
              {" "}
              {isSubmitting && <Loader />} Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
