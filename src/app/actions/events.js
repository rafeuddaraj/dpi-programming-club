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

export const getEvents = async (query, page, limit) => {
  const now = new Date();
  const where = query
    ? {
        name: { contains: query, mode: "insensitive" },
        endTime: { gte: now },
      }
    : { endTime: { gte: now } };
  const include = { EventParticipant: true };
  return commonGet("event", where, include, page, limit, {
    createdAt: "desc",
  });
};

export const getEventById = async (id, isClient = false) => {
  try {
    const now = new Date();
    let where = isClient ? { id, registrationDeadline: { gte: now } } : { id };
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
    const where = query
      ? {
          OR: [
            { participant: { name: { contains: query, mode: "insensitive" } } },
            {
              participant: { rollNo: { contains: query, mode: "insensitive" } },
            },
            {
              participant: { email: { contains: query, mode: "insensitive" } },
            },
            { payment: { transactionId: { contains: query } } },
          ],
          eventId: id,
        }
      : { eventId: id };
    const include = { participant: true, event: true, payment: true };

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

export const getSingleParticipantById = async (userId, eventId) => {
  try {
    const eventParticipant = await prisma.eventParticipant.findUnique({
      where: { id: eventId },
      include: { participant: true, event: true, payment: true },
    });
    return successResponse("success", 200, eventParticipant);
  } catch (err) {
    return errorResponse(err.message, 500);
  }
};

export const updateEventFeedBack = async (eventId, data, revalidatePathSrc) => {
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
      console.log("I am Comming");

      if (currentEvent.availableSeat > bookedSeat?.length) {
        res = await prisma.eventParticipant.create({
          data: { participantId: user?.id, eventId: data?.eventId },
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
      include: { event: true, participant: true, payment: true },
    });
  } catch {
    return errorResponse();
  }
};

export const getOwnEvents = async (participantId, query, page, limit) => {
  const now = new Date();
  const where = query
    ? {
        name: { contains: query, mode: "insensitive" },
        participantId,
      }
    : { participantId };
  const include = { event: true, participant: true };
  return commonGet("eventParticipant", where, include, page, limit);
};
