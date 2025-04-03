"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { auth } from "../auth";

export const getSingleResult = async ({ roll, exam, regulation }) => {
  try {
    let where = { roll };
    const session = await auth();
    const userData = await prisma.registeredUser.findFirst({
      where: { rollNo: roll },
      select: { name: true, user: { select: { avatar: true } } },
    });
    if (exam) where.exam = exam;
    if (regulation && regulation?.toString()?.toLowerCase() !== "any")
      where.regulation = regulation;
    const resp = await prisma.results.findFirst({
      where,
    });
    if (userData?.name) {
      resp.name = userData.name;
      resp.avatar = userData?.user?.avatar || null;
    }
    return successResponse("Result fetched success.", 200, resp);
  } catch {
    return errorResponse();
  }
};
