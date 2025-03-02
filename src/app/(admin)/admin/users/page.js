import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, UserCheck, UserX, UserCog } from "lucide-react"

export default function UsersPage() {
  // Mock data for users
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Member", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Member", status: "Banned" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Member", status: "Restricted" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Moderator", status: "Active" },
    { id: 6, name: "Diana Miller", email: "diana@example.com", role: "Member", status: "Active" },
    { id: 7, name: "Edward Davis", email: "edward@example.com", role: "Member", status: "Banned" },
    { id: 8, name: "Fiona Clark", email: "fiona@example.com", role: "Member", status: "Active" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <UserCheck className="h-4 w-4 text-green-500" />
      case "Banned":
        return <UserX className="h-4 w-4 text-red-500" />
      case "Restricted":
        return <UserCog className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Banned":
        return "bg-red-100 text-red-800"
      case "Restricted":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Link href="/users/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="data-table-toolbar">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search users..." className="w-[250px] pl-8" />
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
                  <th className="data-table-head">Name</th>
                  <th className="data-table-head">Email</th>
                  <th className="data-table-head">Role</th>
                  <th className="data-table-head">Status</th>
                  <th className="data-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="data-table-body">
                {users.map((user) => (
                  <tr key={user.id} className="data-table-row">
                    <td className="data-table-cell font-medium">{user.name}</td>
                    <td className="data-table-cell">{user.email}</td>
                    <td className="data-table-cell">{user.role}</td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="data-table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/users/${user.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                        <Link href={`/users/${user.id}/edit`}>
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
              Showing <strong>1</strong> to <strong>8</strong> of <strong>100</strong> results
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
  )
}

