import BackButtonWithoutText from "@/components/common/back-button-without-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ManagementYearForm from "../_components/management-year-form";

export default function NewElectionYear() {
  return (
    <div className="container mx-auto py-10">
      <div className="my-2">
        <BackButtonWithoutText />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Election Year</CardTitle>
          <CardDescription>
            Define a new Election year period with start and end dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ManagementYearForm />
        </CardContent>
      </Card>
    </div>
  );
}
