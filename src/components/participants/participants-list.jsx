import {
  getWorkshopParticipantDistributionStats,
  getWorkshopParticipantsUsingAdminAndModerator,
} from "@/app/actions/workshops";
import SearchFilter from "../common/marking-system/search-filter";
import { WorkshopParticipantDashboard } from "../common/marking-system/workshop-participant-dashboard";
import Pagination from "../common/Pagination";

export async function ParticipantsList({
  workshopId,
  searchParams,
  isModerator,
}) {
  const query = searchParams?.q;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams?.limit) : 10;
  const status = searchParams?.status || "ALL";
  const paymentType = searchParams?.paymentType || "ALL";
  const resp = await getWorkshopParticipantsUsingAdminAndModerator(
    workshopId,
    query,
    status,
    paymentType,
    page,
    limit
  );

  if (resp?.error) {
    throw Error();
  }
  const data = resp?.data?.data;
  const pagination = data?.pagination;
  const participants = data?.data;

  const isPaid = !!participants[0]?.payment;

  let workshopStats = null;
  try {
    const resp = await getWorkshopParticipantDistributionStats(workshopId);

    if (!resp?.error) workshopStats = resp?.data;
  } catch {
    // Just Bypassing the error
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchFilter
          isPaid={isPaid}
          stats={workshopStats}
          componentType={"Workshop"}
        />
      </div>

      <WorkshopParticipantDashboard
        participants={participants}
        isModerator={isModerator}
      />
      <Pagination pagination={pagination} />
    </div>
  );
}
