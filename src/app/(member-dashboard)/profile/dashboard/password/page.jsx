"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  changePasswordByUser,
  generateOTPByCurrentUserPassword,
  verifyOtp,
} from "@/app/actions/auth";
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
import { toast } from "sonner";

// Password form schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePassword() {
  const [step, setStep] = useState("initial");
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState(null);

  // Password form
  const form = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [expiredTime, setExpiredTime] = useState(5 * 60);

  const handleSubmit = async (values) => {
    setError(null);

    try {
      const resp = await generateOTPByCurrentUserPassword(
        values?.currentPassword
      );
      if (resp?.error) {
        setError(resp.message);
        return;
      }
      setStep("otp");
      const data = resp?.data;

      setUserData(data);
      await sendEmail(
        {
          to: data?.found?.user?.email,
          subject: "Password Change Confirmation OTP!",
        },
        generateOTPEmail(
          data?.found?.user?.name,
          data?.otp,
          data?.expiredMinute
        )
      );
      setExpiredTime(data?.expiredMinute * 60);
      setPassword(values?.password);
    } catch (err) {
      setError(err.message || "Failed to verify password. Please try again");
    }
  };

  const handleVerifyOtp = async () => {
    setError(null);
    setIsVerifying(true);

    try {
      // Validate OTP
      if (otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setIsVerifying(false);
        return;
      }

      const resp = await verifyOtp(otp);
      if (resp?.error) {
        setError(resp.message);
        setIsVerifying(false);
        return;
      }
      if (resp?.status === 200) {
        const passwordResp = await changePasswordByUser(password);
        if (passwordResp?.error) {
          setError(passwordResp.message);
          setIsVerifying(false);
          return;
        } else {
          setStep("success");
          setIsVerifying(false);
          setPassword(null);
          setUserData(null);
          toast.success("Password changed successfully");
        }
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP. Please try again");
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleOtpExpired = () => {
    setError("Your OTP has expired. Please try again.");
    // Wait a moment before resetting to initial state to ensure the user sees the message
    setTimeout(() => {
      setStep("initial");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Change Password</CardTitle>
          <CardDescription>
            {step === "initial" &&
              "Update your password by entering your current and new password"}
            {step === "otp" && "Enter the OTP sent to your email"}
            {step === "success" && "Password changed successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "initial" && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Change Password
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
                onClick={handleVerifyOtp}
                disabled={isVerifying || otp.length !== 6}
                className="w-full"
              >
                {isVerifying && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify OTP
              </Button>
            </div>
          )}

          {step === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your password has been changed successfully.
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
