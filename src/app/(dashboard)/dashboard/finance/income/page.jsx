import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, Calendar, Search, Download, Filter } from "lucide-react"

export default function AllIncomePage() {
  // Example data - replace with actual data from your API
  const incomeList = [
    {
      id: 1,
      date: "2024-03-01",
      description: "Workshop Revenue",
      amount: 1200,
      category: "Workshop",
      paymentMethod: "Bank Transfer",
      reference: "WS-2024-001",
    },
    // Add more income records...
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Income Transactions</h1>
        <div className="flex flex-wrap gap-2">
          <Link href="/finance/income/create">
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              Add Income
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
            <CardTitle>All Income Transactions</CardTitle>
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
              <div>Reference</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {incomeList.map((income) => (
                <Link
                  key={income.id}
                  href={`/finance/income/${income.id}`}
                  className="block hover:bg-muted/50 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-6 items-center p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {income.date}
                    </div>
                    <div className="md:col-span-2">{income.description}</div>
                    <div>{income.category}</div>
                    <div>{income.reference}</div>
                    <div className="text-right font-medium text-green-600">${income.amount}</div>
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

