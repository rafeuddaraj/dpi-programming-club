import { getWorkshopById } from "@/app/actions/workshops";
import WorkshopModuleAddAndEditForm from "../_components/workshop-module-add-and-edit-form";


export default async function WorkshopModuleCreatePage({ searchParams: searchParam }) {

  const searchParams = await searchParam
  const workshopId = searchParam?.workshopId

  const resp = await getWorkshopById(workshopId)
  if (resp?.error) {
    throw Error()
  }

  const workshop = resp?.data

  return (
    <>
      <WorkshopModuleAddAndEditForm workshop={workshop} />
    </>
  );
}