import { getWorkshopLessonById } from "@/app/actions/workshops";
import WorkshopLessonAddEditForm from "../../_components/workshop-lesson-add-edit-form";


export default async function page({ params: param }) {
  const params = await param
  const lessonId = params?.id

  const resp = await getWorkshopLessonById(lessonId)
  if (resp?.error) {
    throw Error()
  }
  const { module, ...lesson } = resp?.data



  return (
    <>
      <WorkshopLessonAddEditForm module={module} lessonData={lesson} />
    </>
  );
}