"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const getUserById = async (id, select = null, include = null) => {
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ id }, { rollNo: id }] },
      ...(select && { select }),
      ...(include && { include }),
    });

    if (!user) return errorResponse("User not found");

    if (user.password) {
      delete user.password;
    }

    return user;
  } catch (err) {
    console.log(err);
    return errorResponse();
  }
};
export const getUserAllParticipants = async (participantId) => {
  try {
    const events = await prisma.eventParticipant.findMany({
      where: { participantId },
      include: { event: true },
    });
    const courses = await prisma.courseEnrollment.findMany({
      where: { participantId },
      include: { course: true },
    });
    const workshops = await prisma.workshopParticipant.findMany({
      where: { participantId },
      include: { workshop: true },
    });

    return { courses, events, workshops };

    return user;
  } catch (err) {
    return errorResponse();
  }
};

export const updateUserById = async (data) => {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated");
    }
    const id = session?.user?.id;
    delete data.password;
    const updatedUser = await prisma.user.update({ data, where: { id } });
    revalidatePath("/profile");
    return successResponse("User Update success", 200, updatedUser);
  } catch {
    return errorResponse();
  }
};
export const updateUserByIdOne = async (id, data) => {
  try {
    console.log({ id, data });

    const updatedUser = await prisma.user.update({ where: { id }, data });
    revalidatePath("/dashboard/users");
    revalidatePath(`/dashboard/users/${id}`);
    return successResponse("User Update success", 200, updatedUser);
  } catch {
    return errorResponse();
  }
};

export const getAllUsers = async (query, page, limit) => {
  const now = new Date();
  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { rollNo: { contains: query, mode: "insensitive" } },
        ],
        role: { not: "admin" },
      }
    : {
        role: { not: "admin" },
      };
  return commonGet("user", where, {}, page, limit, {
    createdAt: "desc",
  });
};

export const deleteUser = async (userId) => {
  try {
    const user = await prisma.$transaction(async (db) => {
      const user = await db.user.delete({ where: userId });
      const event = await db.eventParticipant.deleteMany({
        where: { participantId: userId },
      });
      const courses = await db.courseEnrollment.deleteMany({
        where: { participantId: userId },
      });
      const workshops = await db.workshopParticipant.deleteMany({
        where: { participantId: userId },
      });
      return true;
    });
    return true;
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};
