"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function PaymentStatusSwitch({ isChecked, onToggle }) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="payment-status"
        checked={isChecked}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="payment-status" className="text-xs">
        {isChecked ? "Paid" : "Unpaid"}
      </Label>
    </div>
  );
}
