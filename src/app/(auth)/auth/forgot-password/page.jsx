"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { changePassword, generateOTP, verifyOtp } from "@/app/actions/auth";
import { sendEmail } from "@/app/actions/email-services";
import OtpInput from "@/components/common/otp-input";
import { generateOTPEmail } from "@/components/email-templates/password-change";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Label } from "@/components/ui/label";

// Step 1: Initial form schema
const initialFormSchema = z.object({
  roll: z.string().min(1, "Roll number is required"),
  email: z.string().email("Please enter a valid email"),
});

// Step 3: Reset password schema
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// OTP schema
const otpSchema = z.object({
  otp: z.string().length(6, "Please enter a valid 6-digit OTP"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState("initial");
  const [error, setError] = useState(null);
  const [expiredTime, setExpiredTime] = useState(5 * 1000);
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState(null);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  // Initial form
  const initialForm = useForm({
    resolver: zodResolver(initialFormSchema),
    defaultValues: {
      roll: "",
      email: "",
    },
  });

  // Reset password form
  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSendOtp = async (values) => {
    setError(null);

    try {
      const resp = await generateOTP(values.email, values.roll);

      if (resp?.error) {
        throw new Error(resp.message || "Failed to send OTP");
      }

      const data = resp?.data;

      sendEmail(
        {
          to: data?.found?.email,
          subject: "CST Club - DPI Verification Code",
        },
        generateOTPEmail(data?.found?.name, data?.otp, data?.expiredMinute)
      )
        .then(() => {})
        .catch((err) => {});

      setExpiredTime(data?.expiredMinute * 60);
      setStep("otp");
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again");
    }
  };

  const handleVerifyOtp = async () => {
    setIsOtpLoading(true);
    setError(null);

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setIsOtpLoading(false);
      return;
    }

    try {
      const resp = await verifyOtp(otp);

      if (resp?.error) {
        setError(resp?.message || "Invalid OTP");
        setIsOtpLoading(false);
        return;
      }

      const userData = await resp?.data;
      setUserData(userData);
      setStep("reset");
    } catch (err) {
      setError(err.message || "Failed to verify OTP. Please try again");
    }
    setIsOtpLoading(false);
  };

  const handleResetPassword = async (values) => {
    setError(null);

    try {
      const resp = await changePassword(userData?.id, values.newPassword);

      if (resp?.error) {
        setError(resp?.message || "Failed to reset password");
        return;
      }

      router.push("/auth/login");
      toast.success("Password reset successful. You can now log in.");
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again");
    }
  };

  const handleOtpExpired = () => {
    setError("OTP has expired. Please request a new one.");
    setStep("initial");
    setUserData(null);
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            {step === "initial" &&
              "Enter your roll number and email to receive an OTP"}
            {step === "otp" && "Enter the OTP sent to your email"}
            {step === "reset" && "Create a new password"}
            {step === "success" && "Password reset successful"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "initial" && (
            <Form {...initialForm}>
              <form
                onSubmit={initialForm.handleSubmit(handleSendOtp)}
                className="space-y-4"
              >
                <FormField
                  control={initialForm.control}
                  name="roll"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roll Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your roll number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={initialForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={initialForm.formState.isSubmitting}
                  className="w-full"
                >
                  {initialForm.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send OTP
                </Button>
              </form>
            </Form>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Enter OTP</Label>
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  onExpire={handleOtpExpired}
                  expiryTime={expiredTime}
                />
              </div>
              <Button
                disabled={otp.length !== 6 || isOtpLoading}
                onClick={handleVerifyOtp}
                className="w-full"
              >
                {isOtpLoading && <Loader2 className="animate-spin" />}Verify OTP
              </Button>
            </div>
          )}

          {step === "reset" && (
            <Form {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(handleResetPassword)}
                className="space-y-4"
              >
                <FormField
                  control={resetForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={resetForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={resetForm.formState.isSubmitting}
                  className="w-full"
                >
                  {resetForm.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Reset Password
                </Button>
              </form>
            </Form>
          )}

          {step === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your password has been reset successfully. You can now login
                with your new password.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        {step !== "initial" && step !== "success" && (
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => setStep("initial")}
              className="w-full"
            >
              Back
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
