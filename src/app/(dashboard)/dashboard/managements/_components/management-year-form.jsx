"use client";

import { createManagement, updateManagement } from "@/app/actions/managements";
import { Label } from "@/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { predefinedRoles } from "./member-form";

// Create a schema for form validation
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Election year name is required" }),
    startingDate: z.date({
      required_error: "Start date is required",
    }),
    endingDate: z.date({
      required_error: "End date is required",
    }),
    role: z.string().optional(),
  })
  .refine(
    (data) => {
      // If end date is provided, it must be after start date
      if (data.endingDate && data.startingDate) {
        return data.endingDate > data.startingDate;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endingDate"],
    }
  );

export default function ManagementYearForm({ yearData }) {
  const router = useRouter();
  const roles = yearData?.roles || predefinedRoles;
  const [customRole, setCustomRole] = useState({
    value: roles[roles?.length - 1]?.value + 1,
    name: "",
  });
  const [availableRoles, setAvailableRoles] = useState(roles);
  // Initialize form with react-hook-form and zod resolver
  if (yearData) {
    yearData.role = "";
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: yearData || {
      name: "",
      startingDate: undefined,
      endingDate: undefined,
      role: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data) => {
    try {
      delete data?.role;
      let resp = null;
      data.roles = availableRoles;
      if (yearData) {
        resp = await updateManagement(yearData?.id, { ...data });
      } else {
        resp = await createManagement(data);
      }
      if (!resp && resp?.error) throw Error("");
      toast.success("Success", {
        description: "Management Year Successfully done.",
      });
      router.push("/dashboard/managements");
      router.refresh();
    } catch (error) {
      toast.error("Error", { description: "There was an problem." });
    }
  };

  const [isAddingCustomRole, setIsAddingCustomRole] = useState(false);
  const handleAddCustomRole = () => {
    if (
      customRole.name &&
      !availableRoles.some(
        (role) => customRole.name?.trim() === role.name?.trim()
      )
    ) {
      setAvailableRoles([...availableRoles, customRole]);
      form.setValue("role", "");

      setCustomRole((prev) => ({ name: "", value: prev?.value + 1 }));
      setIsAddingCustomRole(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Election Year Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Election Year 2023-2024" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startingDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Select date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endingDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Select date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => {
                        const startingDate = form.getValues("startingDate");
                        return startingDate ? date < startingDate : false;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
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
                        <SelectValue placeholder="Available roles in this election" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoles.map(({ value, name }) => (
                        <SelectItem
                          key={value.toString()}
                          value={value.toString()}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Dialog
                    open={isAddingCustomRole}
                    onOpenChange={setIsAddingCustomRole}
                  >
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" size="icon">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Custom Role</DialogTitle>
                        <DialogDescription>
                          Create a new role that will be available for all
                          members.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="custom">Role Position</Label>
                        <Input
                          id="custom"
                          value={customRole.value}
                          disabled
                          onChange={() => {}}
                          className="mt-2"
                        />
                      </div>
                      <div className="py-4">
                        <Label htmlFor="customRole">Role Name</Label>
                        <Input
                          id="customRole"
                          value={customRole.name}
                          onChange={(e) =>
                            setCustomRole((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter custom role name"
                          className="mt-2"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddingCustomRole(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleAddCustomRole}
                          disabled={!customRole}
                        >
                          Add Role
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : yearData
              ? "Update Election Year"
              : "Create Election Year"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
