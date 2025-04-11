import { getAllManagements } from "@/app/actions/managements";
import Pagination from "@/components/common/Pagination";
import SearchAction from "@/components/notice/search";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ManagementYearList from "./_components/management-year-list";

export default async function Home({ searchParams: searchParam }) {
  const searchParams = await searchParam;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const query = searchParams?.q;
  const resp = await getAllManagements(query, page, limit);
  if (resp?.error) throw Error();
  const data = resp?.data?.data;
  const pagination = data?.pagination;
  const elections = data?.data;
  return (
    <main className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Election Year Management</h1>
        <Link href="/dashboard/managements/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Election Year
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchAction placeholder={"Search by name"} />
        <ManagementYearList data={elections} limit={limit} page={page} />
        <Pagination pagination={pagination} />
      </Suspense>
    </main>
  );
}
