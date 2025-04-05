"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";

export const getAllModerators = async () => {
  try {
    const resp = await prisma.user?.findMany({
      where: { role: "moderator" },
      include: {
        user: true,
        assignmentSubmissions: true,
        EventParticipant: true,
        workshopParticipants: true,
        skillsReviewer: true,
      },
    });
    const pendingAssignments = resp?.filter((user) =>
      user.assignmentSubmissions.filter(({ status }) => {
        status === "PENDING";
      })
    );
    return successResponse("Moderators found", 200, resp);
  } catch {
    return errorResponse();
  }
};
