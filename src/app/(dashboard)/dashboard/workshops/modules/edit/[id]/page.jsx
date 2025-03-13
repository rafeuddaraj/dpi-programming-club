import { getWorkshopModuleById } from "@/app/actions/workshops";
import { Button } from "@/components/button";
import Link from "next/link";
import WorkshopModuleAddAndEditForm from "../../_components/workshop-module-add-and-edit-form";


export default async function WorkshopModuleUpdatePage({ params: param }) {

  const params = await param
  const moduleId = params?.id

  const resp = await getWorkshopModuleById(moduleId)
  if (resp?.error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <p className="mb-6">The module you are trying to edit does not exist.</p>
        <Link href={"/dashboard/workshops"}><Button>Back to Workshops</Button></Link>
      </div>
    )
  }

  const module = resp?.data
  const workshop = module?.workshop

  console.log(module);



  return (
    <>
      <WorkshopModuleAddAndEditForm workshop={workshop} moduleData={module} />
    </>
  );
}