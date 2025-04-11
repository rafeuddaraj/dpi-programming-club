import { getSingleManagement } from "@/app/actions/managements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isExpiredDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import ManagementYearForm from "../../_components/management-year-form";

export default async function EditElectionYear({ params: param }) {
  const params = await param;
  const resp = await getSingleManagement(params?.id);
  if (resp?.error) throw Error();
  const data = resp?.data;

  if (isExpiredDate(data?.endingDate)) {
    return redirect("/dashboard/managements");
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Election Year</CardTitle>
          <CardDescription>
            Update the details for this Election year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ManagementYearForm yearData={data} />
        </CardContent>
      </Card>
    </div>
  );
}
