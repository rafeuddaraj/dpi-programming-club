import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, Calendar, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function FinancePage() {
  // Example data - replace with actual data from your API
  const recentIncome = [
    { id: 1, date: "2024-03-01", description: "Workshop Revenue", amount: 1200, category: "Workshop" },
    { id: 2, date: "2024-03-02", description: "Course Fees", amount: 800, category: "Course" },
    // ... more income records
  ]

  const recentExpenses = [
    { id: 1, date: "2024-03-01", description: "Office Supplies", amount: 350, category: "Supplies" },
    { id: 2, date: "2024-03-02", description: "Software License", amount: 500, category: "Software" },
    // ... more expense records
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Finance Management</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/dashboard/finance/income/create">
            <Button className="w-full md:w-auto">
              <TrendingUp className="mr-2 h-4 w-4" />
              Add Income
            </Button>
          </Link>
          <Link href="/dashboard/dashboard/finance/expense/create">
            <Button variant="outline" className="w-full md:w-auto">
              <TrendingDown className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$12,450</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$8,230</div>
            <p className="text-xs text-muted-foreground">+4.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,220</div>
            <p className="text-xs text-muted-foreground">+15.6% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Income */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Income</CardTitle>
          <Link href="/dashboard/finance/income">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium">
              <div>Date</div>
              <div className="md:col-span-2">Description</div>
              <div>Category</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {recentIncome.map((income) => (
                <div
                  key={income.id}
                  className="grid grid-cols-1 md:grid-cols-5 items-center p-4 text-sm hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {income.date}
                  </div>
                  <div className="md:col-span-2">{income.description}</div>
                  <div>{income.category}</div>
                  <div className="text-right font-medium text-green-600">${income.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Expenses</CardTitle>
          <Link href="/dashboard/finance/expenses">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium">
              <div>Date</div>
              <div className="md:col-span-2">Description</div>
              <div>Category</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="grid grid-cols-1 md:grid-cols-5 items-center p-4 text-sm hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {expense.date}
                  </div>
                  <div className="md:col-span-2">{expense.description}</div>
                  <div>{expense.category}</div>
                  <div className="text-right font-medium text-red-600">${expense.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Top Income Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Workshop Revenue</span>
                </div>
                <span className="font-medium">$5,240</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span>Course Fees</span>
                </div>
                <span className="font-medium">$4,130</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-300"></div>
                  <span>Subscriptions</span>
                </div>
                <span className="font-medium">$3,080</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Top Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Software & Tools</span>
                </div>
                <span className="font-medium">$2,840</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400"></div>
                  <span>Office Supplies</span>
                </div>
                <span className="font-medium">$1,930</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-300"></div>
                  <span>Equipment</span>
                </div>
                <span className="font-medium">$1,460</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

