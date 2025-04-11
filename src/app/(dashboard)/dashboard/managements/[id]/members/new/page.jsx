import { getSingleManagement } from "@/app/actions/managements";
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
import { Suspense } from "react";
import MemberForm from "../../../_components/member-form";

export default async function NewMember({
  params: param,
  searchParams: searchParam,
}) {
  const params = await param;

  const id = params?.id;
  const resp = await getSingleManagement(id);
  if (resp?.error) throw Error();
  const data = resp?.data;

  if (isExpiredDate(data?.endingDate)) {
    return redirect(`/dashboard/managements/${id}/members`);
  }
  let roles = data?.roles;

  const members = data?.members;

  const usedRoles = members?.map((member) => member?.role?.value);

  roles = roles?.filter((role) => !usedRoles.includes(role.value));

  const searchParams = await searchParam;
  return (
    <div className="container mx-auto py-10">
      <div className="my-2">
        <BackButtonWithoutText />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Member</CardTitle>
          <CardDescription>
            {searchParams?.rollNumber
              ? `Adding member with roll number: ${searchParams.rollNumber}`
              : "Search for a member by roll number to add them"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <MemberForm yearId={id} roles={roles} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
