"use client";

import { sendEmail } from "@/app/actions/email-services";
import {
  createRegisteredUser,
  updateRegisteredUser,
} from "@/app/actions/registeredUsers";
import MembershipConfirmationTemplate from "@/components/email-templates/membership-confirmation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useMemberCollectState } from "./PageWrapper";

const departments = [
  { value: "cst", label: "Computer Science and Technology" },
  { value: "mt", label: "Mechanical Technology" },
  { value: "ct", label: "Civil Technology" },
  { value: "et", label: "Electrical Technology" },
  { value: "ent", label: "Electronics Technology" },
  { value: "pt", label: "Power Technology" },
];

const shifts = ["morning", "day"];

const studentSchema = z.object({
  name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  rollNo: z.string().min(1, {
    message: "Roll number is required.",
  }),
  registrationNo: z.string().min(1, {
    message: "Registration number is required.",
  }),
  session: z.string().min(1, {
    message: "Session is required.",
  }),
  shift: z.string().min(1, {
    message: "Shift is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string({
    message:
      "Phone number must be 11 digits or start with +880 followed by 10 digits.",
  }),
  department: z.string().min(1, {
    message: "Department is required.",
  }),
  gender: z.enum(["male", "female"], {
    message: "Gender is required.",
  }),
  semester: z.string().min(1, { message: "Semester is required." }),
});

export function StudentForm() {
  const {
    currentStudent: student,
    onCloseForm: onCancel,
    isFormOpen,
  } = useMemberCollectState();
  // Initialize the form with React Hook Form and Zod validation
  const defaultValues = {
    name: "",
    rollNo: "",
    registrationNo: "",
    session: "",
    shift: "",
    email: "",
    department: "",
    phoneNumber: "",
    gender: "",
    semester: "",
  };
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: student || defaultValues,
  });

  useEffect(() => {
    form.reset(student);
  }, [student]);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (student) {
        delete values?.email;
        delete values?.rollNo;
        await updateRegisteredUser(student?.id, values);
        toast.success("Student updated successfully!");
        form.reset(defaultValues);
        return onCancel();
      } else {
        // Create student
        const resp = await createRegisteredUser(values);
        if (resp?.error) {
          toast.error(resp.message);
          return;
        }
        // Email Sending for SecretCode
        const respData = resp?.data;
        sendEmail(
          {
            to: respData?.email,
            subject: "Welcome! Your Membership is Confirmed!",
          },
          ReactDOMServer.renderToStaticMarkup(
            <MembershipConfirmationTemplate
              secretCode={respData?.secretCode}
              userName={respData?.name}
            />
          )
        )
          .then(() => {})
          .catch((err) => {
            toast.error("Email Sending Failed");
          });
        toast.success("Student added successfully!");
        form.reset(defaultValues);
        return onCancel();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {isFormOpen ? (
        <Dialog
          open={isFormOpen}
          onOpenChange={() => {
            onCancel();
            form.reset(defaultValues);
          }}
        >
          <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-full sm:w-auto overflow-y-auto max-h-[90vh] p-4">
            <DialogHeader>
              <DialogTitle>
                {student ? "Edit Student" : "Add New Student"}
              </DialogTitle>
              <DialogDescription>
                {student
                  ? "Update the student information in the form below."
                  : "Fill in the details to add a new student to the system."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 py-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    disabled={!!student?.email}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            disabled={!!student?.email}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rollNo"
                    disabled={!!student?.rollNo}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Roll Number{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} disabled={!!student?.rollNo} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Registration Number{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="session"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                              <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1st Semester</SelectItem>
                            <SelectItem value="2">2nd Semester</SelectItem>
                            <SelectItem value="3">3rd Semester</SelectItem>
                            <SelectItem value="4">4th Semester</SelectItem>
                            <SelectItem value="5">5th Semester</SelectItem>
                            <SelectItem value="6">6th Semester</SelectItem>
                            <SelectItem value="7">7th Semester</SelectItem>
                            <SelectItem value="8">8th Semester</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shift</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                className="uppercase"
                                placeholder="Select shift"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shifts.map((shift) => (
                              <SelectItem
                                className={"uppercase"}
                                key={shift}
                                value={shift}
                              >
                                {shift}
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((department) => (
                              <SelectItem
                                key={department?.value}
                                value={department.value}
                                disabled={department.value !== "cst"}
                              >
                                {department?.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <span>
                        {" "}
                        <Loader2 className="animate-spin" /> Submitting...
                      </span>
                    ) : student ? (
                      "Update Student"
                    ) : (
                      "Add Student"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
