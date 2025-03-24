import { getAllRegisteredUsers } from "@/app/actions/registeredUsers";
import Pagination from "@/components/common/Pagination";
import AddMemberButton from "./_components/add-member-button";
import MemberCollectWrapperProvider from "./_components/PageWrapper";
import { StudentForm } from "./_components/student-form";
import { StudentTable } from "./_components/student-table";

export default async function DashboardPage({ searchParams: searchParam }) {
  const searchParams = await searchParam;
  const page = parseInt(searchParams?.page) || 1;
  const query = searchParams?.q;
  const limit = parseInt(searchParams?.limit) || 10;
  const resp = await getAllRegisteredUsers(query, page, limit);
  if (resp?.error) {
    throw new Error(resp.error);
  }
  const respData = resp?.data;
  const pagination = respData.pagination;
  const students = respData.data;

  return (
    <MemberCollectWrapperProvider>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Students
          </h1>
          <p className="text-muted-foreground">
            Manage student records and information
          </p>
        </div>
        <AddMemberButton />
      </div>

      <StudentTable students={students} />
      <Pagination pagination={pagination} />
      <StudentForm />
    </MemberCollectWrapperProvider>
  );
}
