import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CreditCard,
  Calendar,
  User,
} from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function PaymentsPage() {
  // Mock data for payments
  const payments = [
    {
      id: 1,
      user: "John Doe",
      amount: 50.0,
      date: "2023-05-15",
      paymentMethod: "Credit Card",
      purpose: "Membership Fee",
      status: "Completed",
    },
    {
      id: 2,
      user: "Jane Smith",
      amount: 25.0,
      date: "2023-05-20",
      paymentMethod: "PayPal",
      purpose: "Workshop Registration",
      status: "Completed",
    },
    {
      id: 3,
      user: "Bob Johnson",
      amount: 75.0,
      date: "2023-06-01",
      paymentMethod: "Bank Transfer",
      purpose: "Event Registration",
      status: "Pending",
    },
    {
      id: 4,
      user: "Alice Brown",
      amount: 100.0,
      date: "2023-06-05",
      paymentMethod: "Credit Card",
      purpose: "Course Fee",
      status: "Completed",
    },
    {
      id: 5,
      user: "Charlie Wilson",
      amount: 30.0,
      date: "2023-06-10",
      paymentMethod: "PayPal",
      purpose: "Membership Fee",
      status: "Failed",
    },
    {
      id: 6,
      user: "Diana Miller",
      amount: 45.0,
      date: "2023-06-15",
      paymentMethod: "Credit Card",
      purpose: "Workshop Registration",
      status: "Completed",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <Link href="/dashboard/payments/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search payments..."
                  className="w-[250px] pl-8"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead className="data-table-header">
                <tr>
                  <th className="data-table-head">ID</th>
                  <th className="data-table-head">User</th>
                  <th className="data-table-head">Amount</th>
                  <th className="data-table-head">Date</th>
                  <th className="data-table-head">Payment Method</th>
                  <th className="data-table-head">Purpose</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {payments.map((payment) => (
                  <tr key={payment.id} className="data-table-row">
                    <td className="data-table-cell">
                      #{payment.id.toString().padStart(4, "0")}
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {payment.user}
                      </div>
                    </td>
                    <td className="data-table-cell font-medium">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatDate(payment.date)}
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        {payment.paymentMethod}
                      </div>
                    </td>
                    <td className="data-table-cell">{payment.purpose}</td>
                    <td className="data-table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/payments/${payment.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/payments/${payment.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="data-table-pagination">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>6</strong> of{" "}
              <strong>20</strong> results
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
