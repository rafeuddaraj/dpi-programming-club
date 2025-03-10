import { getAllUsers } from "@/app/actions/users";
import CommonAlert from "@/components/common/alert";
import FilterAction from "@/components/common/FilterAction";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import {
  Hourglass,
  MoreHorizontal,
  Plus,
  Timer,
  UserCheck,
  UserCog,
  UserMinus,
  UserX,
} from "lucide-react";

import Link from "next/link";

export default async function UsersPage({ params, searchParams }) {
  const urlSearchParams = await searchParams;

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return <UserCheck className="h-4 w-4 text-green-500" />;
      case "RESTRICTED":
        return <UserCog className="h-4 w-4 text-amber-500" />;
      case "BANNED":
        return <UserX className="h-4 w-4 text-red-500" />;
      case "EXPIRED":
        return <UserMinus className="h-4 w-4 text-gray-500" />;
      case "PROCESSING":
        return <Hourglass className="h-4 w-4 text-blue-500" />;
      case "EX":
        return <Timer className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "RESTRICTED":
        return "bg-amber-100 text-amber-800";
      case "BANNED":
        return "bg-red-100 text-red-800";
      case "EXPIRED":
        return "bg-gray-300 text-gray-700";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "EX":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const resp = await getAllUsers(
    urlSearchParams?.q,
    parseInt(urlSearchParams?.page) || 1,
    parseInt(urlSearchParams?.limit) || 10
  );

  if (resp?.error) {
    throw Error();
  }
  const users = resp?.data?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Link href="/dashboard/users/create">
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
              <FilterAction />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>

          <div className="data-table-container">
            {users?.length ? (
              <table className="data-table">
                <thead className="data-table-header">
                  <tr>
                    <th className="data-table-head">Name</th>
                    <th className="data-table-head">Email</th>
                    <th className="data-table-head">Roll</th>
                    <th className="data-table-head">Session</th>
                    <th className="data-table-head">Expired Date</th>
                    <th className="data-table-head">Role</th>
                    <th className="data-table-head">Status</th>
                    <th className="data-table-head">Actions</th>
                  </tr>
                </thead>
                <tbody className="data-table-body">
                  {users.map((user) => (
                    <tr key={user.id} className="data-table-row">
                      <td className="data-table-cell font-medium">
                        {user.name}
                      </td>
                      <td className="data-table-cell">{user.email}</td>
                      <td className="data-table-cell">{user.rollNo}</td>
                      <td className="data-table-cell">
                        {user.session} ({user?.semester})
                      </td>
                      <td className="data-table-cell">
                        {formatDate(user.renewalDate, { time: true })}
                      </td>
                      <td className="data-table-cell">{user.role}</td>
                      <td className="data-table-cell">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(user.status)}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="data-table-cell">
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/users/${user.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                          <Link href={`/dashboard/users/${user.id}/edit`}>
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
            ) : (
              <CommonAlert
                title={"User not found"}
                description={"User not found."}
              />
            )}
          </div>

          <div className="data-table-pagination">
            <Pagination pagination={resp?.data?.pagination} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
