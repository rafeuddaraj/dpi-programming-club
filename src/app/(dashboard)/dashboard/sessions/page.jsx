import { getAllSessions } from "@/app/actions/sessions";
import Pagination from "@/components/common/Pagination";
import SearchAction from "@/components/notice/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SessionsTable } from "./_components/session-table";

export default async function SessionsPage({ searchParams: searchParam }) {
  let sessions = [];
  let pagination = null;
  const searchParams = await searchParam;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const query = searchParams?.q;
  try {
    const resp = await getAllSessions(query, page, limit);
    if (resp?.error) throw Error();

    sessions = resp?.data?.data?.data;
    pagination = resp?.data?.data?.pagination;
  } catch {
    //
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Sessions</CardTitle>
              <CardDescription>
                Manage all active user sessions across the platform.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <SearchAction placeholder={"Search on"} />
          <SessionsTable sessions={sessions} limit={limit} page={page} />
          <Pagination pagination={pagination} />
        </CardContent>
      </Card>
    </div>
  );
}
