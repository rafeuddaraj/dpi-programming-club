import { getWorkshopById } from "@/app/actions/workshops";
import { Button } from "@/components/button";
import Link from "next/link";
import CreateAndUpdateForm from "../../create/_components/create-and-update-form";


export default async function WorkshopEditPage({ params: param }) {

  const params = await param
  const workshopId = params?.id
  const resp = await getWorkshopById(workshopId)
  if (resp?.error) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop not found</h1>
        <p className="mb-6">The workshop you are trying to edit does not exist.</p>
        <Link href={`/dashboard/workshops`}><Button>Back to Workshops</Button></Link>
      </div>)
  }

  const workshop = await resp?.data
  const instructorName = workshop?.instructor
  workshop.instructor = { name: "", bio: '', portfolioUrl: "" }
  workshop.instructor["name"] = instructorName
  workshop.instructor["bio"] = workshop?.instructorDetails
  workshop.instructor["portfolioUrl"] = workshop?.instructorUrl
  return (
    <>
      <CreateAndUpdateForm data={workshop} />
    </>
  );
}