import {
  getEventParticipantDistributionStats,
  getEventParticipantsUsingAdminAndModerator,
} from "@/app/actions/events";
import Pagination from "../Pagination";
import { ParticipantTable } from "./participant-table";
import SearchFilter from "./search-filter";

export default async function EventParticipantDashboard({
  params,
  searchParams,
  componentType,
}) {
  const query = searchParams?.q;
  const page = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams?.limit) : 10;
  const status = searchParams?.status || "ALL";
  const paymentType = searchParams?.paymentType || "ALL";
  const resp = await getEventParticipantsUsingAdminAndModerator(
    params?.id,
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

  let eventStats = null;
  try {
    const resp = await getEventParticipantDistributionStats(params?.id);
    if (!resp?.error) eventStats = resp?.data;
  } catch {
    //
  }

  return (
    <div className="space-y-4 p-6">
      <SearchFilter
        isPaid={isPaid}
        componentType={componentType}
        stats={eventStats}
      />
      <div className="space-y-6">
        <ParticipantTable
          participants={participants}
          componentType={componentType}
        />
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
}
