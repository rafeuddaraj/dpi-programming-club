"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

export default function OtpInput({
  value,
  onChange,
  onOtpExpired,
  expiryTime,
}) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const targetTime = new Date(expiryTime).getTime();
  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());
  const inputRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle countdown timer
  useEffect(() => {
    // If the target time has already passed, don't start the timer
    if (timeLeft <= 0) {
      onOtpExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000); // Decrease the time by 1 second every interval
    }, 1000);

    // Clear the interval when time is up
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Update parent component when OTP changes
  useEffect(() => {
    onChange(otp.join(""));
  }, [otp]);

  // Initialize OTP array from value prop
  useEffect(() => {
    if (value) {
      const otpArray = value.split("").slice(0, 6);
      setOtp([...otpArray, ...Array(6 - otpArray.length).fill("")]);
    }
  }, [value]);

  const handleChange = (e, index) => {
    const val = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(val)) return;

    // Take only the last character if multiple are pasted
    const digit = val.slice(-1);

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input if a digit was entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Only allow numbers
    if (!/^\d+$/.test(pastedData)) return;

    // Take only the first 6 digits
    const digits = pastedData.slice(0, 6).split("");

    // Update the OTP array
    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      newOtp[index] = digit;
    });
    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000); // Get minutes
    const seconds = Math.floor((time % 60000) / 1000); // Get remaining seconds
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-lg p-0"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`inline-block px-4 py-2 rounded-md ${
                timeLeft <= 10
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <span className="font-mono font-bold text-2xl">
                {formatTime(timeLeft)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {timeLeft <= 10 ? "OTP expiring soon!" : "OTP expires in"}
            </span>
          </div>
          {timeLeft <= 30 && (
            <p className="text-xs mt-1 text-muted-foreground">
              {timeLeft <= 10
                ? "Please verify quickly or request a new OTP"
                : "Please verify before the timer expires"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
