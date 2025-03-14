import { getWorkshopModuleById } from "@/app/actions/workshops";
import { redirect } from "next/navigation";
import WorkshopLessonAddEditForm from "../_components/workshop-lesson-add-edit-form";


export default async function page({ searchParams: searchParam }) {
  const searchParams = await searchParam
  const moduleId = searchParams?.moduleId
  if (!moduleId) {
    redirect("/dashboard/workshops")
  }
  const resp = await getWorkshopModuleById(moduleId)
  if (resp?.error) {
    throw Error()
  }
  const module = resp?.data

  return (
    <>
      <WorkshopLessonAddEditForm module={module} />
    </>
  );
}