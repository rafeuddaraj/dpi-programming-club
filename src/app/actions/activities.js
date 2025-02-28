import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";

export const getAllActivitiesByUserId = async (
  id,
  select = {},
  include = {}
) => {
  try {
    const event = await prisma.eventParticipant.findMany({
      where: { participantId: id },
      include: { event: true, participant: true },
    });
    const course = await prisma.courseEnrollment.findMany({
      where: { participantId: id },
      include: { course: true, participant: true },
    });
    const workshop = await prisma.workshopParticipant.findMany({
      where: { participantId: id },
      include: { workshop: true, participant: true },
    });
    return successResponse("Success fetched", 200, { workshop, course, event });
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};
