import { getSingleManagementUser } from "@/app/actions/managements";
import BackButtonWithoutText from "@/components/common/back-button-without-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isExpiredDate } from "@/lib/utils";
import { redirect } from "next/navigation";
import MemberForm from "../../../../_components/member-form";

export default async function EditMember({ params: param }) {
  const params = await param;
  const resp = await getSingleManagementUser(params?.memberId);
  if (resp?.error) throw Error();
  const data = resp?.data;

  if (isExpiredDate(data?.election?.endingDate)) {
    return redirect(`/dashboard/managements/${params?.id}/members`);
  }

  const memberData = {
    rollNo: data?.user?.user?.rollNo,
    id: data?.id,
    name: data?.user?.user?.name,
    email: data?.user?.user?.email,
    role: String(data?.role?.value),
  };

  return (
    <div className="container mx-auto py-10">
      <div className="my-2">
        <BackButtonWithoutText />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Member</CardTitle>
          <CardDescription>Update member information</CardDescription>
        </CardHeader>
        <CardContent>
          <MemberForm
            memberData={memberData}
            yearId={params?.id}
            roles={data?.election?.roles}
          />
        </CardContent>
      </Card>
    </div>
  );
}
