import ModeratorDetail from "../_components/moderator-detail";

export default async function ModeratorDetailPage({ params: param }) {
  const params = await param;
  return (
    <div className="container mx-auto px-4 py-8">
      <ModeratorDetail id={params.id} />
    </div>
  );
}
