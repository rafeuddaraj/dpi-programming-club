import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Tag, CreditCard, FileText, Receipt, Building, Pencil, Trash2 } from "lucide-react"

export default function ExpenseDetailsPage({ params }) {
  // Example data - replace with actual data from your API
  const expense = {
    id: params.id,
    date: "2024-03-01",
    description: "Office Supplies",
    amount: 350,
    category: "Supplies",
    paymentMethod: "Credit Card",
    receipt: "EXP-2024-001",
    vendor: "Office Store",
    notes: "Monthly office supplies including paper, ink, and stationery",
    createdAt: "2024-03-01 10:30:00",
    updatedAt: "2024-03-01 10:30:00",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/finance/expenses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Expenses
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Expense Details</h1>
        <div className="flex flex-wrap gap-2">
          <Link href={`/dashboard/finance/expenses/${params.id}/edit`}>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </div>
              <span className="font-medium">{expense.date}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>Category</span>
              </div>
              <span className="font-medium">{expense.category}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>Vendor</span>
              </div>
              <span className="font-medium">{expense.vendor}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                <span>Payment Method</span>
              </div>
              <span className="font-medium">{expense.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Receipt className="h-4 w-4" />
                <span>Receipt Number</span>
              </div>
              <span className="font-medium">{expense.receipt}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Amount</span>
              </div>
              <span className="text-xl font-bold text-red-600">${expense.amount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            </div>
            {expense.notes && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground">{expense.notes}</p>
              </div>
            )}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span>{expense.createdAt}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{expense.updatedAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

