"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    BookOpen,
    CheckCircle,
    Loader2,
    Lock,
    Mail,
    Phone,
    User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { registerAction } from "@/app/actions/auth";
import { getRegisteredUserById } from "@/app/actions/registeredUsers";
import { PasswordStrengthMeter } from "@/components/password-strength-meter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Fingerprint, IdCard, Server, Shield } from "lucide-react";
import { signIn } from "next-auth/react";

// Schema for the initial form with roll number and secret code
const initialSchema = z.object({
    rollNo: z.string().min(1, "Roll number is required"),
    secretCode: z.string().min(1, "Secret code is required"),
});

// Schema for the registration form
const registerSchema = z
    .object({
        name: z.string().readonly(),
        rollNo: z.string().readonly(),
        registrationNo: z.string().readonly(),
        phoneNumber: z.string().readonly(),
        email: z.string().email().readonly(),
        department: z.string().readonly(),
        semester: z.string().readonly(),
        gender: z.string().readonly(),
        shift: z.string().readonly(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        session: z.string().readonly(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "Passwords do not match",
            });
        }
    });


// Function to calculate password strength (0-100)
const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 25;

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25; // Has uppercase
    if (/[0-9]/.test(password)) strength += 25; // Has number
    if (/[^A-Za-z0-9]/.test(password)) strength += 25; // Has special char

    return strength;
};

export default function RegisterForm() {
    const [step, setStep] = useState("initial"); // "initial", "form", "success"
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [userData, setUserData] = useState(null);

    const router = useRouter();

    // Form for initial step (roll number and secret code)
    const initialForm = useForm({
        resolver: zodResolver(initialSchema),
        defaultValues: {
            rollNo: "",
            secretCode: "",
        },
    });

    // Form for registration step
    const registrationForm = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            rollNo: "",
            registrationNo: "",
            phoneNumber: "",
            email: "",
            department: "",
            semester: "",
            shift: "",
            gender: "",
            password: "",
            confirmPassword: "",
            session: "",
        },
    });

    // Handle submission of initial form
    const onInitialSubmit = async (values) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getRegisteredUserById(
                values.rollNo,
                values.secretCode
            );
            if (response?.error) {
                return setError(response.message);
            }
            setUserData(response.data);
            registrationForm.reset(response.data);
            setStep("form");
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    // Handle submission of registration form
    const onRegisterSubmit = async (values) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const sendData = { password: values.password, registeredUserId: userData?.id }
            const resp = await registerAction(sendData)
            if (resp?.error) {
                throw Error()
            }
            setStep("success")
            await signIn("credentials", { email: values.email, password: values.password, redirectTo: "/profile" })
        } catch (err) {
            setError(
                "An unexpected error occurred during registration. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    };

    return (
        <div className="w-full flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-md">
                    <CardHeader className="text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        >
                            <User className="h-8 w-8 " />
                        </motion.div>
                        <CardTitle className="text-3xl font-bold ">
                            {step === "initial" && "Register"}
                            {step === "form" && "Complete Profile"}
                            {step === "success" && "Welcome!"}
                        </CardTitle>
                        <CardDescription className="">
                            {step === "initial" && "Enter your credentials to continue"}
                            {step === "form" && "Set your password to complete registration"}
                            {step === "success" &&
                                "Your account has been created successfully"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-4">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Alert variant="destructive" className="mb-6">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}

                            {step === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Alert className="mb-6  border-gray-200">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <AlertTitle>Registration Successful</AlertTitle>
                                        <AlertDescription>
                                            Your account has been created successfully. Redirecting to
                                            your profile...
                                        </AlertDescription>
                                    </Alert>

                                    <motion.div
                                        className="w-full flex justify-center my-8"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: 360 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    >
                                        <div className="w-24 h-24 rounded-full  flex items-center justify-center">
                                            <CheckCircle className="h-12 w-12 text-green-500" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}

                            {step === "initial" && (
                                <motion.div
                                    key="initial-form"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <Form {...initialForm}>
                                        <form
                                            onSubmit={initialForm.handleSubmit(onInitialSubmit)}
                                            className="space-y-6"
                                        >
                                            <motion.div variants={itemVariants}>
                                                <FormField
                                                    control={initialForm.control}
                                                    name="rollNo"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Roll Number</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                        <BookOpen className="h-5 w-5" />
                                                                    </span>
                                                                    <Input
                                                                        placeholder="Enter your roll number"
                                                                        {...field}
                                                                        className="pl-10 transition-all duration-200"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <FormField
                                                    control={initialForm.control}
                                                    name="secretCode"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Secret Code</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                        <Lock className="h-5 w-5" />
                                                                    </span>
                                                                    <Input
                                                                        type="password"
                                                                        placeholder="Enter your secret code"
                                                                        {...field}
                                                                        className="pl-10 transition-all duration-200"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <Button
                                                    type="submit"
                                                    className="w-full transition-all duration-300"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Verifying...
                                                        </>
                                                    ) : (
                                                        "Continue"
                                                    )}
                                                </Button>
                                            </motion.div>

                                            <motion.div
                                                variants={itemVariants}
                                                className="text-center"
                                            >
                                                <Link
                                                    href="/auth/login"
                                                    className="text-sm  hover:underline transition-colors"
                                                >
                                                    Already have an account? Login
                                                </Link>
                                            </motion.div>
                                        </form>
                                    </Form>
                                </motion.div>
                            )}

                            {step === "form" && (
                                <motion.div
                                    key="registration-form"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {isLoading ? (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-28" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-16" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-24" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-10 w-full" />
                                            </div>
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    ) : (
                                        <Form {...registrationForm}>
                                            <form
                                                onSubmit={registrationForm.handleSubmit(
                                                    onRegisterSubmit
                                                )}
                                                className="space-y-6"
                                            >
                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="name"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Full Name</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <User className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="gender"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Gender</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Shield className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="email"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Mail className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="phoneNumber"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Phone Number</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Phone className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="rollNo"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Roll No</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <IdCard className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="registrationNo"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Registration No</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Fingerprint className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>
                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="department"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Department</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Server className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            {...field}
                                                                            readOnly
                                                                            className="pl-10 "
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    variants={itemVariants}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                                >
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="shift"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Shift</FormLabel>
                                                                <FormControl>
                                                                    <Input {...field} readOnly />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="semester"
                                                        disabled
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Semester</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
                                                                    disabled
                                                                >
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select semester" />
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
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="password"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Password</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Lock className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            type="password"
                                                                            placeholder="Create a strong password"
                                                                            {...field}
                                                                            className="pl-10 transition-all duration-200"
                                                                            onChange={(e) => {
                                                                                field.onChange(e);
                                                                                setPasswordStrength(
                                                                                    calculatePasswordStrength(
                                                                                        e.target.value
                                                                                    )
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <PasswordStrengthMeter
                                                                    strength={passwordStrength}
                                                                />
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <FormField
                                                        control={registrationForm.control}
                                                        name="confirmPassword"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Confirm Password</FormLabel>
                                                                <FormControl>
                                                                    <div className="relative">
                                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 ">
                                                                            <Lock className="h-5 w-5" />
                                                                        </span>
                                                                        <Input
                                                                            type="password"
                                                                            placeholder="Confirm your password"
                                                                            {...field}
                                                                            className="pl-10 transition-all duration-200"
                                                                        />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    variants={itemVariants}
                                                    className="flex flex-col sm:flex-row gap-3"
                                                >
                                                    <Button
                                                        type="submit"
                                                        className="flex-1 transition-all duration-300"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                Registering...
                                                            </>
                                                        ) : (
                                                            "Complete Registration"
                                                        )}
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => setStep("initial")}
                                                        disabled={isSubmitting}
                                                    >
                                                        Back
                                                    </Button>
                                                </motion.div>
                                            </form>
                                        </Form>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
