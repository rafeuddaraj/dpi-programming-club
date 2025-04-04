"use client";

import { deleteFile, uploadFile } from "@/app/actions/uploads";
import { updateUserById } from "@/app/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import DepartmentList from "@/utils/DepartmentList";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import CommaInput from "./common/comma-input";
import Loader from "./common/loader";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").readonly(),
  avatar: z.string().optional(),
  address: z.string().min(2, "Address Required."),
  semester: z.string().min(1, "Semester is required"),
  email: z.string().email("Invalid email address").readonly(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .readonly(),
  linkedin: z.string().url("Invalid LinkedIn URL"),
  github: z.string().url("Invalid GitHub URL"),
  discord: z.string().optional(),
  bio: z.string().max(100, "Bio must be 100 characters or less"),
  about: z.string().max(500, "About must be 100 characters or less"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

const upload = async (avatar, values, authUser, updateSession) => {
  const formData = new FormData();
  formData.append("file", avatar);
  const avatarResp = await uploadFile(formData);
  if (avatarResp.error) {
    throw new Error("Something went wrong");
  }
  values.avatar = avatarResp.url;

  updateSession({ ...authUser, avatar: values.avatar });
};

export function ProfileEditForm({ user }) {
  const [avatar, setAvatar] = useState(user.avatar || "/avatar.svg");

  user = { ...user, ...user?.user };
  user.department = DepartmentList(user?.department);
  const { update: updateSession, data } = useSession() || {};
  const authUser = data?.user || null;
  for (let key in user) {
    user[key] = user[key] || "";
  }
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: user,
  });

  const router = useRouter();

  async function onSubmit(values) {
    try {
      if (typeof avatar !== "string") {
        if (user?.avatar) {
          const resp = await deleteFile(user.avatar);
          if (resp.error) {
            throw new Error("Something went wrong");
          }
          await upload(avatar, values, authUser, updateSession);
        } else {
          await upload(avatar, values, authUser, updateSession);
        }
      }

      const res = await updateUserById(values);
      if (res.error) {
        throw new Error("Something went Wrong");
      }
      toast.success("Profile Update Success");
      return router.push("/profile");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={
                      typeof avatar === "string"
                        ? avatar
                        : URL.createObjectURL(avatar)
                    }
                    alt="Profile picture"
                  />
                  <AvatarFallback>
                    {form
                      .watch("name")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                >
                  Change Avatar
                </Button>
                <Input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 1048576) {
                      alert("File size must be less than 1MB");
                      return;
                    }

                    if (file) {
                      setAvatar(file);
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="IoT Enthusiast" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Technology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <SelectItem
                              disabled={field.value > sem}
                              key={sem}
                              value={`${sem}`}
                            >
                              {sem}th Semester
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discord</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe#1234"
                          {...field}
                          disabled={user.discord}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <MDEditor
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Write a short bio about yourself. Max 500 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Polytechnic ave, Dhaka"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <CommaInput
                      name="skills"
                      control={form.control}
                      label="Skills"
                      placeholder="Type skills separated by commas..."
                    />
                    <FormDescription>
                      Add up to 10 skills that best describe your expertise.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  form.formState.isSubmitSuccessful ||
                  !form.formState.isDirty
                }
              >
                {form.formState.isSubmitting && <Loader />} Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
