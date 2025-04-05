"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const getUserById = async (id, select = {}, include = {}) => {
  try {
    const user = await prisma.user.findFirst({
      where: { OR: [{ id }, { user: { rollNo: id } }] },
      ...(include && { include }),
    });

    if (!user) return errorResponse("User not found");

    if (user.password) {
      delete user.password;
    }

    return user;
  } catch (err) {
    console.log("Error form Get User By Id", err);
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
    // Normal User Action Update Date
    const { name, semester, email, phoneNumber, ...updatedUserData } =
      data || {};
    const updatedUser = await prisma.user.update({
      data: updatedUserData,
      where: { id },
    });
    if (semester) {
      await prisma.registeredUser.update({
        where: { id: updatedUser?.registeredUserId },
        data: { semester },
      });
    }
    revalidatePath("/profile");
    return successResponse("User Update success", 200, updatedUser);
  } catch (err) {
    console.log(err);

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

export const getAllUsers = async (
  query,
  page,
  limit,
  role = "all",
  status = "all"
) => {
  const now = new Date();
  const where = query
    ? {
        OR: [
          { user: { name: { contains: query, mode: "insensitive" } } },
          { user: { email: { contains: query, mode: "insensitive" } } },
          { user: { rollNo: { contains: query, mode: "insensitive" } } },
        ],
        role: { not: "admin" },
      }
    : {
        role: { not: "admin" },
      };
  role = role?.toLowerCase();
  if (role === "all") {
    where.role = { in: ["moderator", "member"] };
  }
  if (role === "member") {
    where.role = role;
  }
  if (role === "moderator") {
    where.role = role;
  }
  status = status?.toLowerCase();
  if (status !== "all") {
    where.status = status.toUpperCase();
  }
  return commonGet("user", where, { user: true }, page, limit, {
    createdAt: "desc",
  });
};

export const deleteUser = async (userId) => {
  try {
    const user = await prisma.$transaction(async (db) => {
      await db.session.delete({ where: { userId } }).catch(() => {});

      await db.eventParticipant
        .deleteMany({
          where: { participantId: userId },
        })
        .catch(() => {});

      await db.courseEnrollment
        .deleteMany({
          where: { participantId: userId },
        })
        .catch(() => {});

      await db.workshopParticipant
        .deleteMany({
          where: { participantId: userId },
        })
        .catch(() => {});

      await db.user.delete({ where: { id: userId } }).catch(() => {});

      return true;
    });
    revalidatePath("/dashboard/users");

    return true;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const createUser = async (data) => {
  try {
    const today = new Date();
    const renewalDate = new Date();

    // 6 Month Subscriptions
    renewalDate.setMonth(today.getMonth() + 6);
    const user = await prisma.user.create({
      data: { renewalDate, ...data },
    });
    revalidatePath("/dashboard/users");
    return successResponse("Create user  success", 201, user);
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};
