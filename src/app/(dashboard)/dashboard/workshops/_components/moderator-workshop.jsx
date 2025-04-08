import { ParticipantsList } from "@/components/participants/participants-list";

// Moderator means Examiner Page
export default async function ModeratorWorkshop({ searchParams: searchParam }) {
  const searchParams = await searchParam;
  return (
    <>
      <ParticipantsList searchParams={searchParams} isModerator={true} />
    </>
  );
}
