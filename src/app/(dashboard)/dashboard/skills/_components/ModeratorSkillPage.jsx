import { getAllSkills } from "@/app/actions/skills";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Suspense } from "react";
import AdminApproval from "./admin-approval";

export default async function ModeratorSkillPage({
  searchParams: searchParam,
}) {
  const searchParams = await searchParam;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit) : 10;
  const query = searchParams?.q;
  const statusFilter = searchParams?.status;
  const resp = await getAllSkills(page, limit);
  if (resp?.error) throw resp.message;
  const data = resp?.data;
  const pagination = data?.pagination;

  const skills = data?.data || [];

  const skillId = searchParams?.id || null;
  let currentUpdateSkill = null;
  if (skillId) {
    try {
      const resp = await getSkillById(skillId);
      if (!resp?.error) {
        currentUpdateSkill = resp?.data;
      }
    } catch (err) {
      //
    }
  }
  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Skill Management System</h1>
        <Card>
          <CardHeader>
            <CardTitle>Skill Approval Dashboard</CardTitle>
            <CardDescription>Manage user skill requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<h2>Loading...</h2>}>
              <AdminApproval
                page={page}
                limit={limit}
                query={query}
                statusFilter={statusFilter}
              />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
