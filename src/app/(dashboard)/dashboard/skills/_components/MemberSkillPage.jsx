import {
  getAllSkillRequestsByUserId,
  getAllSkillWithoutPrevSkills,
} from "@/app/actions/skills";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserSkillSelector from "./user-skill-selector";
import UserSkillsOverview from "./user-skills-overview";

export default async function MemberSkillPage() {
  let availableSkills = [];
  let userSkills = [];
  try {
    const resp = await getAllSkillWithoutPrevSkills();
    if (!resp?.error) availableSkills = resp?.data;
  } catch {
    //
  }
  try {
    const resp = await getAllSkillRequestsByUserId();
    if (!resp?.error) userSkills = resp?.data;
  } catch {
    //
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Manage Your Skills</h1>

      <div>
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Select Your Skills</CardTitle>
            <CardDescription>
              Choose skills from the list to add to your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserSkillSelector availableSkills={availableSkills} />
          </CardContent>
        </Card>
        <UserSkillsOverview
          skillRequests={userSkills}
          // onUpdateStatus={updateSkillRequestStatus}
        />
      </div>
    </div>
  );
}
