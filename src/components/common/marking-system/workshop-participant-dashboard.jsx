import { ParticipantTable } from "./participant-table";

export async function WorkshopParticipantDashboard({ participants }) {
  return (
    <div className="space-y-6">
      <ParticipantTable
        participants={participants}
        componentType={"Workshop"}
      />
    </div>
  );
}
