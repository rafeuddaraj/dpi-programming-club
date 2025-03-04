"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";

export const createEvent = async (data) => {
  try {
    data.price = parseInt(data.price);
    data.availableSeat = parseInt(data.availableSeat);
    console.log(data);
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
  const where = query ? { name: { contains: query, mode: "insensitive" } } : {};
  const include = { EventParticipant: true };
  return commonGet("event", where, include, page, limit, { createdAt: "desc" });
};

export const getEventById = async (id) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: { EventParticipant: true },
    });
    console.log(event);

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
