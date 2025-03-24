"use client";

import { enrollWorkshop } from "@/app/actions/workshops";
import { Button } from "@/components/button";
import PaymentModal from "@/components/common/PaymentModal";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function EnrollWorkshop({ workshop }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const handleEnrollWorkshop = async () => {
    setIsLoading(true);
    try {
      if (workshop?.price) {
        setIsPaymentModal(true);
      } else {
        const resp = await enrollWorkshop(
          workshop,
          false,
          `/workshops/${workshop?.id}`
        );
        if (resp?.error) {
          if (resp?.message === "User not found") {
            signOut({ redirectTo: "/auth/login" });
            return toast.error("Your are not verified user!");
          }
          throw new Error();
        }
        toast.success("Congratulations!");
      }
    } catch {
      toast.error("Something went wrong!");
    }
    setIsLoading(false);
  };

  const enrollPremiumWorkshop = async (_, paymentData) => {
    try {
      workshop.amount = workshop?.price;
      const resp = await enrollWorkshop(
        { ...paymentData, ...workshop },
        true,
        `/workshops/${workshop?.id}`
      );
      if (resp?.error) {
        throw Error();
      }
      toast.success("Congratulations");
    } catch {
      toast.error("There was an problem!");
    }
  };
  const title = (
    <>
      This workshop is premium! Join now for just{" "}
      <span className="font-bold">{workshop?.price}৳</span> and unlock an
      exclusive experience!
    </>
  );

  return (
    <>
      <Button onClick={handleEnrollWorkshop} disabled={isLoading}>
        {" "}
        {isLoading && <Loader2 className="animate-spin" />} Enroll Now
      </Button>
      {isPaymentModal && (
        <PaymentModal
          onSubmit={enrollPremiumWorkshop}
          isOpen={isPaymentModal}
          onClose={() => setIsPaymentModal(false)}
          title={title}
          data={workshop}
        />
      )}
    </>
  );
}
