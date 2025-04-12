import { getAllSkills, getSkillById } from "@/app/actions/skills";
import { auth } from "@/app/auth";
import Pagination from "@/components/common/Pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import AdminApproval from "./admin-approval";
export default async function AdminSkillPage({ searchParams: searchParam }) {
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
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Skill Management System</h1>
      <Tabs defaultValue="skill-request" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="skills">Manage Skills</TabsTrigger>
          <TabsTrigger value="skill-request">Admin Approval</TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {skillId ? "Update Skill" : "Create Skill"}
                </CardTitle>
                <CardDescription>
                  Add a new skill or update existing ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SkillForm skills={skills} currentSkill={currentUpdateSkill} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill List</CardTitle>
                <CardDescription>View all available skills</CardDescription>
              </CardHeader>
              <CardContent>
                <SkillList
                  skills={skills}
                  pagination={pagination}
                  page={page}
                  limit={limit}
                />
                <Pagination pagination={pagination} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="skill-request">
          <Card>
            <CardHeader>
              <CardTitle>Skill Approval Dashboard</CardTitle>
              <CardDescription>
                Manage user and moderator skill requests with distribute
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<h2>Loading...</h2>}>
                <AdminApproval
                  page={page}
                  limit={limit}
                  query={query}
                  statusFilter={statusFilter}
                  isAdmin={true}
                />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
