import SubmissionsPage from "../submissions/page";

export default function ModeratorAssignmentPage({ searchParams }) {
  return (
    <>
      <SubmissionsPage searchParams={searchParams} isModerator={true} />
    </>
  );
}
