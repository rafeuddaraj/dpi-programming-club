import { getAllManagementMemberByManagementId } from "@/app/actions/managements";
import BackButtonWithoutText from "@/components/common/back-button-without-text";
import Pagination from "@/components/common/Pagination";
import SearchAction from "@/components/notice/search";
import { Button } from "@/components/ui/button";
import { isExpiredDate } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import MemberList from "../../_components/member-list";
import MemberSearch from "../../_components/member-search";

export default async function MembersPage({
  params: param,
  searchParams: searchParam,
}) {
  const params = await param;
  const searchParams = await searchParam;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const query = searchParams?.q;
  const resp = await getAllManagementMemberByManagementId(
    params?.id,
    query,
    page,
    limit
  );
  if (resp?.error) throw Error();
  const data = resp?.data?.data;
  const pagination = data?.pagination;
  const members = data?.data;
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center gap-4">
        <BackButtonWithoutText />
        <h1 className="text-3xl font-bold">Election Year Members</h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <MemberSearch ElectionYearId={params.id} />
        {!isExpiredDate(members[0]?.election?.endingDate) && (
          <Link href={`/dashboard/managements/${params.id}/members/new`}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </Link>
        )}
      </div>
      <SearchAction placeholder={"Search by Roll"} />
      <MemberList
        members={members}
        yearId={params?.id}
        page={page}
        limit={limit}
      />
      <Pagination pagination={pagination} />
    </div>
  );
}
