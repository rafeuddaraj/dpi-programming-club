"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const createEvent = async (data) => {
  try {
    data.price = parseInt(data.price);
    data.availableSeat = parseInt(data.availableSeat);
    data.startTime = new Date(data.startTime);
    data.endTime = new Date(data.endTime);
    data.registrationDeadline = new Date(data.registrationDeadline);
    const newEvent = await prisma.event.create({ data });
    revalidatePath("/dashboard/events");
    return successResponse("Event Successfully Created", 201, newEvent);
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};
export const updateEvent = async (id, data) => {
  try {
    data.price = parseInt(data.price);
    data.availableSeat = parseInt(data.availableSeat);
    data.startTime = new Date(data.startTime);
    data.endTime = new Date(data.endTime);
    data.registrationDeadline = new Date(data.registrationDeadline);
    const updatedEvent = await prisma.event.update({ data, where: { id } });
    revalidatePath("/dashboard/events");
    return successResponse("Event Successfully Update", 200, updatedEvent);
  } catch {
    return errorResponse();
  }
};

export const getEvents = async (query, status, page, limit) => {
  const now = new Date();
  const finding =
    status === "all"
      ? {}
      : status === "up-coming"
      ? { endTime: { gte: now } }
      : status === "complete"
      ? { endTime: { lte: now } }
      : {};
  const where = query
    ? {
        name: { contains: query, mode: "insensitive" },
        ...finding,
      }
    : { ...finding };
  const include = { EventParticipant: true };
  return commonGet("event", where, include, page, limit, {
    createdAt: "desc",
  });
};

export const getEventById = async (id) => {
  try {
    const now = new Date();
    let where = { id };
    const event = await prisma.event.findFirst({
      where,
      include: { EventParticipant: true },
    });

    return successResponse("", 200, event);
  } catch (err) {
    return errorResponse();
  }
};

export const deleteEvent = async (id) => {
  try {
    const data = await prisma.event.delete({ where: { id } });
    revalidatePath("/dashboard/events");
    return successResponse("", 200, data);
  } catch {
    return errorResponse();
  }
};

export const getAllUpcomingEvent = async () => {
  try {
    const currentTime = new Date(); // Get current time

    const events = await prisma.event.findMany({
      where: {
        registrationDeadline: {
          gte: currentTime,
        },
      },
      orderBy: {
        registrationDeadline: "asc",
      },
      include: { EventParticipant: true },
    });
    return successResponse("", 200, events);
  } catch {
    return errorResponse();
  }
};

export const getParticipantByEventId = async (query, id, page, limit) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    const role = user?.role;
    const where = query
      ? {
          OR: [
            {
              participant: {
                user: { name: { contains: query, mode: "insensitive" } },
              },
            },
            {
              participant: {
                user: { rollNo: { contains: query, mode: "insensitive" } },
              },
            },
            {
              participant: {
                user: { email: { contains: query, mode: "insensitive" } },
              },
            },
            {
              participant: {
                user: {
                  registrationNo: { contains: query, mode: "insensitive" },
                },
              },
            },
            {
              payment: {
                transactionId: { contains: query, mode: "insensitive" },
              },
            },
          ],
        }
      : { eventId: id };

    const include = {
      participant: { include: { user: true } },
      event: true,
      payment: true,
    };

    if (role === "moderator") {
      delete where?.eventId;
      where.examinerId = user?.id;
    }

    const orderBy = { payment: { paymentStatus: "asc" } };
    const participant = await commonGet(
      "eventParticipant",
      where,
      include,
      page,
      limit,
      orderBy
    );

    return successResponse("", 200, participant);
  } catch (err) {
    return errorResponse();
  }
};

export const getParticipantByEventIdOne = async (id) => {
  try {
    const where = { eventId: id };
    const include = {
      participant: { include: { user: true } },
      event: true,
      payment: true,
    };

    const orderBy = { payment: { paymentStatus: "asc" } };
    const participant = await prisma.eventParticipant.findMany({
      where,
      include,
    });

    return successResponse("", 200, participant);
  } catch (err) {
    return errorResponse();
  }
};

export const getSingleParticipantById = async (userId, eventId) => {
  try {
    const eventParticipant = await prisma.eventParticipant.findUnique({
      where: { id: eventId },
      include: {
        participant: { include: { user: true } },
        event: true,
        payment: true,
      },
    });
    return successResponse("success", 200, eventParticipant);
  } catch (err) {
    return errorResponse(err.message, 500);
  }
};

export const updateEventFeedBack = async (eventId, data, revalidatePathSrc) => {
  data.score = parseInt(data.score);

  try {
    const resp = await prisma.eventParticipant.update({
      where: { id: eventId },
      data,
    });
    revalidatePath(revalidatePathSrc);
    return successResponse("", 200, resp);
  } catch (err) {
    console.log(err);

    return errorResponse(err?.message, 500);
  }
};

export const enrollEvent = async (
  data,
  isPremium = false,
  revalidatePathSrc
) => {
  try {
    const session = await auth();
    const user = session?.user;
    let res = null;
    const bookedSeat =
      (await prisma.eventParticipant.findMany({
        where: { eventId: data?.id },
      })) || [];
    const currentEvent = await prisma.event.findUnique({
      where: { id: data?.id },
    });

    if (isPremium) {
      if (currentEvent.availableSeat > bookedSeat?.length)
        res = await prisma.$transaction(async (db) => {
          const paymentData = {
            userId: user?.id,
            accountNo: data.bkashNumber,
            amount: data.amount,
            paymentDetails: `${data?.name} - Event`,
            paymentMethod: "Bkash",
            transactionId: data?.transactionNumber,
          };

          const payment = await db.payment.create({ data: paymentData });
          const eventData = {
            eventId: data?.id,
            participantId: user?.id,
            paymentId: payment?.id,
            price: data?.amount,
            examinerId: null,
          };

          const event = await db.eventParticipant.create({
            data: eventData,
            include: { payment: true },
          });
          return event;
        });
      else {
        throw new Error("No seat available");
      }
    } else {
      if (currentEvent.availableSeat > bookedSeat?.length) {
        res = await prisma.eventParticipant.create({
          data: {
            participantId: user?.id,
            eventId: data?.eventId,
            examinerId: null,
          },
        });
      } else {
        throw new Error("No seat available");
      }
    }
    revalidatePath(revalidatePathSrc);
    return successResponse("", 201, res);
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};

export const getEventParticipantResult = async (participantId, eventId) => {
  try {
    return await prisma.eventParticipant.findFirst({
      where: { eventId, participantId },
      include: {
        event: true,
        participant: { include: { user: true } },
        payment: true,
      },
    });
  } catch {
    return errorResponse();
  }
};

export const getOwnEvents = async (participantId, query, page, limit) => {
  "no cached";
  const now = new Date();
  const where = query
    ? {
        event: { name: { contains: query, mode: "insensitive" } },
        participantId,
      }
    : { participantId };
  const include = { event: true, participant: { include: { user: true } } };
  return commonGet("eventParticipant", where, include, page, limit);
};

export const distributeAllEventsByModerator = async (eventId, pathname) => {
  try {
    const resp = await prisma?.$transaction(async (db) => {
      const moderators = await db?.user?.findMany({
        where: {
          role: "moderator",
          examiner: true,
        },
        select: { id: true },
      });

      if (!moderators.length) throw new Error("No eligible moderators found");

      const participants = await db?.eventParticipant?.findMany({
        where: {
          eventId,
          examinerId: null,
        },
      });

      if (!participants.length) {
        throw new Error("No participants found without examiner");
      }

      const shuffledParticipants = [...participants].sort(
        () => Math.random() - 0.5
      );

      const updates = shuffledParticipants.map((participant, index) => {
        const moderatorIndex = index % moderators.length;
        const moderatorId = moderators[moderatorIndex].id;

        return db.eventParticipant.update({
          where: { id: participant.id },
          data: { examinerId: moderatorId },
        });
      });

      await Promise.all(updates);

      return "Participants distributed randomly and evenly among moderators";
    });
    revalidatePath(pathname);
    return successResponse(resp);
  } catch (error) {
    console.error("Distribution Error:", error);
    return errorResponse();
  }
};

export const removePendingDistributionsByModerator = async (
  eventId,
  pathname
) => {
  try {
    const resp = await prisma?.$transaction(async (db) => {
      const distributedParticipants = await db.eventParticipant.findMany({
        where: {
          eventId,
          examinerId: { not: null },
          reviewStatus: "PENDING",
        },
      });

      if (!distributedParticipants.length) {
        throw new Error("No pending distributed participants found");
      }

      const updates = distributedParticipants.map((participant) => {
        return db.eventParticipant.update({
          where: { id: participant.id },
          data: { examinerId: null },
        });
      });

      await Promise.all(updates);

      return {
        message: "Pending distributions removed successfully",
        count: distributedParticipants.length,
      };
    });
    revalidatePath(pathname);
    return successResponse(resp?.message, 200, resp);
  } catch (error) {
    console.error("Remove Distribution Error:", error);
    return errorResponse();
  }
};

export const removePublishedDistributionsByModerator = async (
  moderatorId,
  pathname
) => {
  try {
    const resp = await prisma?.$transaction(async (db) => {
      const distributedParticipants = await db.eventParticipant.findMany({
        where: {
          examinerId: moderatorId,
          reviewStatus: "PUBLISHED",
        },
      });

      if (!distributedParticipants.length) {
        throw new Error(
          "No published distributed participants found for this moderator"
        );
      }

      const updates = distributedParticipants.map((participant) => {
        return db.eventParticipant.update({
          where: { id: participant.id },
          data: { examinerId: null },
        });
      });

      await Promise.all(updates);

      return {
        message:
          "Published distributions removed successfully for the moderator",
        count: distributedParticipants.length,
      };
    });
    revalidatePath(pathname);
    return successResponse(resp.message, 200, resp);
  } catch (error) {
    console.error("Remove Distribution Error:", error);
    return errorResponse();
  }
};

export const getEventParticipantDistributionStats = async (eventId) => {
  try {
    const stats = await prisma.$transaction(async (db) => {
      const undistributedCount = await db.eventParticipant.count({
        where: {
          eventId,
          examinerId: null,
        },
      });

      const distributedCount = await db.eventParticipant.count({
        where: {
          eventId,
          examinerId: { not: null },
          reviewStatus: { in: ["PENDING"] },
        },
      });

      const markedCount = await db.eventParticipant.count({
        where: {
          eventId,
          reviewStatus: "MARKED",
        },
      });

      const paymentCount = await db.payment.count({
        where: {
          EventParticipant: { some: { eventId } },
          paymentStatus: false,
        },
      });

      return {
        eventId,
        undistributedCount,
        distributedCount,
        markedCount,
        paymentCount,
      };
    });

    return successResponse("Success", 200, stats);
  } catch (error) {
    console.error("Error fetching distribution stats:", error);
    return errorResponse();
  }
};

export const publishAllEventMarkedParticipants = async (eventId, pathname) => {
  try {
    const updated = await prisma.eventParticipant.updateMany({
      where: {
        eventId,
        reviewStatus: "MARKED",
      },
      data: {
        reviewStatus: "PUBLISHED",
      },
    });
    revalidatePath(pathname);
    return successResponse(
      `${updated.count} participant(s) marked as published.`,
      200
    );
  } catch (error) {
    console.error("Publish Error:", error);
    return errorResponse();
  }
};

export const markAllEventParticipantsAsPaid = async (eventId, pathname) => {
  try {
    const updated = await prisma.payment.updateMany({
      where: {
        EventParticipant: { some: { eventId } },
      },
      data: {
        paymentStatus: true,
      },
    });
    revalidatePath(pathname);
    return successResponse(
      `${updated.count} participant(s) marked as paid.`,
      200
    );
  } catch (error) {
    console.error("Payment Status Update Error:", error);
    return errorResponse();
  }
};

// Only Admin
export const getEventParticipantsUsingAdminAndModerator = async (
  eventId,
  query = "",
  status = "",
  type,
  page = 1,
  limit = 10
) => {
  try {
    const session = await auth();

    let where = {};
    let include = {};
    let orderBy = {};
    const user = session?.user;
    const role = user?.role;
    if (role === "member") {
      where = { participantId: session?.user?.id, eventId };
      include = {
        event: true,
        payment: true,
        participant: { include: { user: true } },
      };
      orderBy = { joining: "asc" };
    } else if (role === "moderator") {
      status = status?.toString()?.toUpperCase();
      const access = ["MARKED", "PENDING", "RECHECK"];
      const isAccess = access?.includes(status);
      where = {
        participant: {
          user: {
            OR: [
              { email: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
              { rollNo: { contains: query, mode: "insensitive" } },
            ],
          },
        },
        payment: {
          paymentStatus:
            type?.toString()?.toUpperCase() === "PAID" ? true : false,
        },
        examinerId: user?.id,
        eventId,
        reviewStatus: { in: isAccess ? [status] : ["PENDING"] },
      };
      include = {
        event: true,
        payment: true,
        participant: { include: { user: true } },
        examiner: true,
      };
      orderBy = { joining: "asc" };
      if (status === "ALL") {
        where.reviewStatus = { in: access };
      }
    } else {
      status = status?.toString()?.toUpperCase();
      const access = ["MARKED", "PENDING", "RECHECK", "PUBLISHED"];
      const isAccess = access?.includes(status);
      where = {
        participant: {
          user: {
            OR: [
              { email: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
              { rollNo: { contains: query, mode: "insensitive" } },
            ],
          },
        },
        reviewStatus: { in: isAccess ? [status] : ["PENDING"] },
        eventId,
        payment: {
          paymentStatus:
            type?.toString()?.toUpperCase() === "PAID" ? true : false,
        },
      };
      include = {
        event: true,
        payment: true,
        participant: { include: { user: true } },
        examiner: { include: { user: true } },
      };
      orderBy = { joining: "asc" };
      if (status === "ALL") {
        delete where?.reviewStatus;
      }
    }

    if (type?.toString()?.toUpperCase() === "ALL") {
      delete where?.payment;
    }

    const participants = await commonGet(
      "eventParticipant",
      where,
      include,
      page,
      limit,
      orderBy
    );
    return successResponse(
      "Event participants retrieved successfully",
      200,
      participants
    );
  } catch (error) {
    return errorResponse(
      error.message || "Failed to fetch workshop participants"
    );
  }
};
