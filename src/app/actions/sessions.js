"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";

export const getAllSessions = async (query, page = 1, limit = 10) => {
  try {
    const where = {
      user: {
        user: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { rollNo: { contains: query, mode: "insensitive" } },
            { phoneNumber: { contains: query, mode: "insensitive" } },
          ],
        },
        role: { in: ["member", "moderator"] },
      },
    };
    if (!query) {
      delete where.user.user;
    }
    const include = { user: { include: { user: true } } };
    const resp = await commonGet("session", where, include, page, limit);
    return successResponse("Success", 200, resp);
  } catch {
    return errorResponse();
  }
};
export const deleteSingleSessionSession = async (id) => {
  try {
    const resp = await prisma.session.delete({ where: { id } });
    revalidatePath("/dashboard/sessions");
    return successResponse("done", 200);
  } catch {
    return errorResponse();
  }
};

export const deleteAllSessions = async () => {
  try {
    const resp = await prisma.session.deleteMany({
      where: { user: { role: { not: "admin" } } },
    });
    revalidatePath("/dashboard/sessions");
    return successResponse();
  } catch {
    return errorResponse();
  }
};
