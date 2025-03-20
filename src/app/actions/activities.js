"use server";
import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";

export const getAllActivitiesByUserId = async (
  id,
  select = {},
  include = {}
) => {
  try {
    const event = await prisma.eventParticipant.findMany({
      where: { participantId: id, complete: true },
      include: { event: true, participant: true },
    });

    const workshop = await prisma.workshopParticipant.findMany({
      where: { participantId: id, complete: true },
      include: { workshop: true, participant: true },
    });

    console.log("Workshop=", workshop);

    return successResponse("Success fetched", 200, { workshop, event });
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};
