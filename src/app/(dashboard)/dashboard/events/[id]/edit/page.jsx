import EventForm from "../../_components/Form";


export default async function page({ params }) {
  const param = await params
  return (
    <>
      <EventForm isEdit={true} id={param?.id} />
    </>
  );
}