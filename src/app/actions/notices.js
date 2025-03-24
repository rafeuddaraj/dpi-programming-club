"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

// Server-side function to fetch notices
export async function fetchNotices(query, page, limit) {
  try {
    await prisma.notice.findMany({
      include: {},
    });
    const resp = await commonGet(
      "notice",
      { status: true, name: { contains: query, mode: "insensitive" } },
      { user: { include: { user: true } } },
      page,
      limit,
      { createdAt: "desc" }
    );
    return successResponse("Notices fetched successfully", 200, resp);
  } catch {
    return errorResponse("Failed to fetch notices", 500);
  }
}

// Server-side function to create a new notice
export async function createNotice(data, userId) {
  try {
    const session = await auth();
    const notice = await prisma.notice.create({
      data: {
        ...data,
        userId: session?.user?.id,
      },
    });
    return successResponse("Notice created successfully", 201, notice);
  } catch (err) {
    console.log(err);

    return errorResponse("Failed to create notice", 500);
  }
}

// Server-side function to update a notice
export async function updateNotice(id, data) {
  try {
    const notice = await prisma.notice.update({
      where: { id },
      data,
    });
    return successResponse("Notice updated successfully", 200, notice);
  } catch (err) {
    console.log(err);

    return errorResponse("Failed to update notice", 500);
  }
}

// Server-side function to delete a notice
export async function deleteNotice(id) {
  try {
    await prisma.notice.delete({ where: { id } });
    revalidatePath("/dashboard/notice");
    return successResponse("Notice deleted successfully", 200);
  } catch {
    return errorResponse("Failed to delete notice", 500);
  }
}

// Server-side function to get a notice by id
export async function getNoticeById(id) {
  try {
    const notice = await prisma.notice.findUnique({
      where: { id },
    });
    return successResponse("Notice fetched successfully", 200, notice);
  } catch {
    return errorResponse("Failed to fetch notice", 500);
  }
}
