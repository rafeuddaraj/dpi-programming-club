"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { auth } from "../auth";

function generateLeaderboardData(data = []) {
  let rank = 1;
  return data.map((value, index, arr) => {
    if (index > 0 && value?.marks === arr[index - 1].marks) {
      value.rank = arr[index - 1].rank;
    } else {
      value.rank = rank;
      rank++;
    }
    const {
      marks,
      rank: sendRank,
      result: {
        user: { id, avatar, user },
      },
    } = value;
    return { marks, rank: sendRank, user, userId: id, avatar };
  });
}

function generateLeaderboard(results) {
  const studentScores = {};
  results.forEach((result) => {
    if (!studentScores[result.user?.id]?.marks) {
      studentScores[result.user?.id] = { marks: 0, result };
    }
    studentScores[result.user?.id] = {
      marks: studentScores[result.user?.id].marks + result.marks,
      result,
    };
  });

  const leaderboard = Object.values(studentScores);
  leaderboard.sort((a, b) => b.marks - a.marks);
  return generateLeaderboardData(leaderboard);
}

export const getSingleWorkshopAssignmentLeaderboard = async (workshopId) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) throw new Error("No user");
    const leaderboard = await prisma.assignmentSubmission.findMany({
      where: {
        assignment: {
          assignableType: "WORKSHOP",
          lessons: { module: { workshopId: workshopId } },
        },
        status: "PUBLISHED",
      },
      orderBy: [{ marks: "desc" }],
      include: {
        user: {
          select: {
            user: {
              select: {
                rollNo: true,
                name: true,
                session: true,
                semester: true,
              },
            },
            id: true,
            avatar: true,
          },
        },
      },
    });
    const workshopData = await prisma.workshop.findFirstOrThrow({
      where: { id: workshopId },
      select: { name: true },
    });
    const finalData = generateLeaderboard(leaderboard);
    const currentUser = finalData?.find((data) => data.userId === user?.id);

    return successResponse("Leaderboard fetched successfully", 200, {
      leaderboard: finalData.slice(0, 25),
      currentUser,
      participants: finalData?.length,
      workshopData,
    });
  } catch (error) {
    return errorResponse();
  }
};
