"use client";

import { createWorkshop, updateWorkshop } from "@/app/actions/workshops";
import { Button } from "@/components/button";
import AddAndEditForm from "@/components/common/add-and-edit-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateAndUpdateForm({ data }) {
  const router = useRouter();
  // Handle form submission
  const onSubmit = async (reqData) => {
    try {
      const resp = data
        ? await updateWorkshop({ workshopId: data?.id, data: reqData })
        : await createWorkshop(reqData);
      if (resp?.error) {
        throw Error();
      }
      toast.success(
        `Your workshop has been ${data ? "updated" : "created "} successfully.`
      );
      return router.push("/dashboard/workshops");
    } catch {
      toast.error("There was an problem!");
    }
  };
  return (
    <>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/workshops")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">
            {data ? "Edit Workshop" : "Create Workshop"}
          </h1>
        </div>
        <AddAndEditForm
          typeOfUse={"Workshop"}
          onSubmitHandler={onSubmit}
          data={data}
        />
      </div>
    </>
  );
}
