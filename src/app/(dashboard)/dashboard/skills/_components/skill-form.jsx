"use client";

import { addSkill, updateSkill } from "@/app/actions/skills";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const skillFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Skill name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
});

export default function SkillForm({ currentSkill, skills }) {
  const [formMode, setFormMode] = useState("create");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedSkillId = searchParams.get("id");
  useEffect(() => {
    if (selectedSkillId) {
      setFormMode("update");
      form.reset({
        name: currentSkill.name,
        description: currentSkill.description,
      });
    } else {
      setFormMode("create");
    }
  }, [selectedSkillId]);

  const form = useForm({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleModeChange = (value) => {
    setFormMode(value);
    if (value === "create") router.replace(pathname);
    form.reset({ name: "", description: "" });
    setSelectedSkillId("");
  };

  const handleFormSubmit = async (data) => {
    try {
      if (formMode === "create") {
        const resp = await addSkill(data);
        if (resp?.error) {
          throw resp.message;
        }
        toast.success("Skill created successfully!");
        form.reset({ name: "", description: "" });
        return;
      } else {
        const resp = await updateSkill(selectedSkillId, data);
        if (resp?.error) {
          throw resp.message;
        }
        toast.success("Skill updated successfully!");
        router.replace(pathname);
        form.reset({ name: "", description: "" });
        return;
      }

      // Reset form
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter skill name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter skill description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          {formMode === "create" ? "Create Skill" : "Update Skill"}
        </Button>
        {formMode === "update" && (
          <Button
            className="w-full"
            type={"button"}
            onClick={() => router.replace(pathname)}
          >
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}
