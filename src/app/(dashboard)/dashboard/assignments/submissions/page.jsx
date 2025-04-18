import {
  getAllMarksCount,
  getAssignmentSubmissionUnMarking,
} from "@/app/actions/assignments";
import SubmissionsTable from "@/components/assignments/submissions-table";
import Pagination from "@/components/common/Pagination";
import FilterAction from "./_components/filter";
import MarkingAction from "./_components/marking";

export default async function SubmissionsPage({
  searchParams: searchParam,
  isModerator,
}) {
  const searchParams = await searchParam;

  const query = searchParams.q;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const status = searchParams.status || "all";

  const resp = await getAssignmentSubmissionUnMarking(
    query,
    status,
    page,
    limit
  );
  if (resp?.error) {
    throw Error();
  }
  const submissions = resp?.data?.data;
  const pagination = resp?.data?.pagination;
  const countResp = await getAllMarksCount();
  if (countResp?.error) {
  }
  const counts = countResp?.data;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        All Submissions
      </h1>
      <p className="text-muted-foreground mb-6">
        View and manage all assignment submissions.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <FilterAction
          placeholder={"Search Assignment...."}
          isModerator={isModerator}
        />
        {!isModerator && <MarkingAction counts={counts} />}
      </div>
      <SubmissionsTable
        submissions={submissions}
        isModerator={isModerator}
        page={page}
        limit={limit}
      />
      <Pagination pagination={pagination} />
    </div>
  );
}
