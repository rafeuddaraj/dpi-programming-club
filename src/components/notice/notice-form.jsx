"use client";

import { createNotice, updateNotice } from "@/app/actions/notices";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import { Switch } from "../switch";

// Define the workshop schema with Zod
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: `Notice name must be at least 3 characters"` }),
  document: z.string().url({ message: "Please enter a valid URL" }),
  status: z.boolean().optional(),
});

export default function NoticeForm({ notice }) {
  const router = useRouter();

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: notice || {
      name: "",
      document: "",
      status: false,
    },
  });

  const onSubmit = async (formData) => {
    try {
      let resp = null;
      if (notice) {
        resp = await updateNotice(notice.id, formData);
      } else {
        resp = await createNotice(formData);
      }

      if (resp?.error) {
        throw new Error(resp.error);
      }
      router.push("/dashboard/notice");
      router.refresh();
      toast.success("Notice saved successfully");
    } catch (error) {
      // console.error("Failed to save notice:", error);
      toast.error("Failed to save notice");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notice Name</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter notice name`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`https://document.com/notice.pdf`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={form.watch("status")}
                        onCheckedChange={(check) =>
                          form.setValue("status", check)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Link href="/">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Saving...
                  </>
                ) : notice ? (
                  "Update Notice"
                ) : (
                  "Create Notice"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
