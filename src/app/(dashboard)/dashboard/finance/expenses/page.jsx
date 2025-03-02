import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Download, Filter, Search, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function AllExpensesPage() {
  // Example data - replace with actual data from your API
  const expenseList = [
    {
      id: 1,
      date: "2024-03-01",
      description: "Office Supplies",
      amount: 350,
      category: "Supplies",
      vendor: "Office Store",
      receipt: "EXP-2024-001",
    },
    // Add more expense records...
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Expense Transactions</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/finance/expense/create">
            <Button>
              <TrendingDown className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Expense Transactions</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-6 p-4 text-sm font-medium">
              <div>Date</div>
              <div className="md:col-span-2">Description</div>
              <div>Category</div>
              <div>Receipt</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {expenseList.map((expense) => (
                <Link
                  key={expense.id}
                  href={`/dashboard/finance/expenses/${expense.id}`}
                  className="block hover:bg-muted/50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {expense.date}
                    </div>
                    <div className="md:col-span-2">{expense.description}</div>
                    <div>{expense.category}</div>
                    <div>{expense.receipt}</div>
                    <div className="text-right font-medium text-red-600">${expense.amount}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

