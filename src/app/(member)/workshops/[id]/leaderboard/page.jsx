import { getSingleWorkshopAssignmentLeaderboard } from "@/app/actions/leaderboard";
import { Leaderboard } from "@/components/common/leaderboard";
export default async function page({ params: param }) {
  const params = await param;
  const workshopId = params?.id;
  const resp = await getSingleWorkshopAssignmentLeaderboard(workshopId);
  if (resp?.error) throw Error(resp.message);
  const data = resp?.data || [];

  return (
    <div className="py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
        Leaderboard - {data?.workshopData?.name}
      </h1>
      <Leaderboard data={data} />
    </div>
  );
}
