import { getPinnedManagementTeam } from "@/app/actions/managements";
import { CommonEmptyState } from "@/components/common/empty-states";
import Masonry from "@/components/common/masonary";
import { ManagementMemberCard } from "@/components/members/management-member-card";
import { Progress } from "@/components/ui/progress";
import { LoaderCircle } from "lucide-react";

export function calculateTermProgress(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  if (now < start) return 0;
  if (now > end) return 100;

  return Math.round(((now - start) / (end - start)) * 100);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getRoleColor(roleId) {
  // Color mapping for all predefined roles
  const roleColors = {
    // Leadership roles - gold/amber tones
    1: "from-amber-500 to-yellow-500", // President
    2: "from-amber-400 to-yellow-400", // Vice President

    // Secretary roles - green/teal tones
    3: "from-emerald-500 to-green-500", // General Secretary
    5: "from-emerald-400 to-green-400", // Deputy General Secretary

    // Executive roles - purple/violet tones
    4: "from-violet-500 to-purple-500", // Executive Officer
    6: "from-violet-400 to-purple-400", // Executive Administrator

    // Finance roles - blue tones
    7: "from-blue-500 to-cyan-500", // Finance Manager
    8: "from-blue-400 to-cyan-400", // Assistant Finance Manager

    // Technical roles - red/orange tones
    9: "from-red-500 to-orange-500", // Technical Head
    10: "from-red-400 to-orange-400", // Assistant Technical Head

    // Cultural roles - pink/rose tones
    11: "from-rose-500 to-pink-500", // Cultural Editor
    12: "from-rose-400 to-pink-400", // Cultural Editor (Female)
    13: "from-rose-300 to-pink-300", // Assistant Cultural Editor

    // Publicity roles - indigo/blue tones
    14: "from-indigo-500 to-blue-500", // Publicity Secretary
    15: "from-indigo-400 to-blue-400", // Associate Publicity Secretary
  };

  return roleColors[roleId] || "from-gray-500 to-slate-500";
}

export function getGenderBadgeColor(gender) {
  return gender === "Male" || gender === "MALE"
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
}

// Breakpoint columns for the masonry layout
const breakpointColumnsObj = {
  default: 2,
  1100: 2,
  700: 1,
};

export default async function FeaturedElection() {
  const resp = await getPinnedManagementTeam();
  const election = resp?.data || null;

  if (!election)
    return (
      <CommonEmptyState
        className="shadow-md"
        title="Election Process Ongoing"
        description="The user list will be available once the current election process is successfully completed."
        icon={
          <LoaderCircle className="h-12 w-12 animate-spin text-muted-foreground/60" />
        }
      />
    );

  const termProgress = calculateTermProgress(
    election.startingDate,
    election.endingDate
  );

  election?.members?.sort((a, b) => a?.role?.value - b?.role?.value);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">{election.name}</h2>
            <p className="text-muted-foreground">
              Term: {formatDate(election.startingDate)} -{" "}
              {formatDate(election.endingDate)}
            </p>
            <p className="text-muted-foreground">
              Total Members: {election?.members?.length}
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Term Progress:</span>
              <span className="text-sm font-medium">{termProgress}%</span>
            </div>
            <Progress value={termProgress} className="h-2" />
          </div>
        </div>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {election.members.map((member) => (
          <div key={member.id} className="mb-4">
            <ManagementMemberCard
              member={member}
              electionName={election.name}
              startTime={election.startingDate}
              endTime={election.endingDate}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
