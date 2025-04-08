import { ParticipantTable } from "./participant-table";

export async function WorkshopParticipantDashboard({
  participants,
  isModerator,
}) {
  return (
    <div className="space-y-6">
      <ParticipantTable
        participants={participants}
        componentType={"Workshop"}
        isModerator={isModerator}
      />
    </div>
  );
}
