import EventParticipantDashboard from "@/components/common/marking-system/event-participant-dashboard";

export default async function ModeratorEventPage({
  searchParams: searchParam,
}) {
  const searchParams = await searchParam;
  return (
    <>
      <EventParticipantDashboard
        componentType={"Event"}
        searchParams={searchParams}
        isModerator={true}
      />
    </>
  );
}
