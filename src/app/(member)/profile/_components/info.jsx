import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import FeedbackPreview from "@/components/common/feedback-preview";
import { TabsContent } from "@/components/ui/tabs";
import SkillsDisplay from "./skill-card";

export default function Info({ user, approvedSkills }) {
  return (
    <>
      <TabsContent value="info" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackPreview markdownText={user?.about} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Approved Skills</CardTitle>
            <CardDescription>Skills you have been approved for</CardDescription>
          </CardHeader>
          <SkillsDisplay skills={approvedSkills} />
        </Card>
      </TabsContent>
    </>
  );
}
