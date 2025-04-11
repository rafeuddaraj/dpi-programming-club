import { getAllManagementTeam } from "@/app/actions/managements";
import { CommonEmptyState } from "@/components/common/empty-states";
import Pagination from "@/components/common/Pagination";
import PrevElectionCard from "@/components/members/prev-election-card";
import SearchAction from "@/components/notice/search";
import { Users } from "lucide-react";

export default async function ElectionsList({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const query = searchParams?.q;
  const resp = await getAllManagementTeam(query, page, limit);
  const data = resp?.data?.data;
  const pagination = data?.pagination;
  const elections = data?.data;
  if (!elections?.length)
    return (
      <CommonEmptyState
        title="No Elections Found"
        description="So far, no previous elections have been recorded. Once an election is held, the details will appear here."
        icon={<Users className="h-12 w-12 text-muted-foreground/60" />}
      />
    );

  return (
    <div className="space-y-6">
      <SearchAction placeholder={"Search by name"} className={"w-full"} />
      {elections.map((election) => (
        <PrevElectionCard key={election.id} election={election} />
      ))}
      <Pagination pagination={pagination} />
    </div>
  );
}
