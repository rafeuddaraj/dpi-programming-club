import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function CreatePaymentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/payments">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payments
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Payment</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Input id="user" type="text" placeholder="Enter user..." />
          </div>
          {/* rest of code here */}
        </CardContent>
        <CardFooter>
          <Button>Create Payment</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
