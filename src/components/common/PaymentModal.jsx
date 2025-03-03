"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  bkashNumber: z
    .string()
    .min(11, "Bkash number must be at least 11 digits")
    .max(14, "Bkash number must not exceed 14 digits")
    .regex(/^[0-9]+$/, "Bkash number must contain only digits"),
  amount: z
    .preprocess((val) => (val === "" ? undefined : Number(val)), z.number({ required_error: "Amount must be need." }))
    .refine((val) => val === Number(process.env.NEXT_PUBLIC_REGISTRATION_FEE), {
      message: "Amount must be exactly 50 Tk.",
    })

  ,
  transactionNumber: z
    .string()
    .min(10, "Transaction number must be at least 10 characters")
    .max(20, "Transaction number must not exceed 20 characters")
    .regex(/^[A-Za-z0-9]{10,20}$/, "Invalid transaction number"),
});

export default function PaymentModal({ isOpen, onClose, onSubmit, data }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bkashNumber: "",
      transactionNumber: "",
      amount: undefined,
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    await onSubmit(data, values);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md relative border-2 border-green-400"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold mb-4">Bkash Payment</h2>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Amount</AlertTitle>
              <AlertDescription>
                Please pay <span className="font-bold">50৳</span> to become a
                member of our club.
              </AlertDescription>
            </Alert>
            <Button className="my-4 mt-0" variant="outline">
              Bkash No: {process.env.NEXT_PUBLIC_BKASH_NO}
            </Button>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="bkashNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Bkash Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Bkash number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the transaction number"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? `Submitting...` : "Join Our Club"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
