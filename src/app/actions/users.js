"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
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

export const updateUserById = async (data) => {
  try {
    const session = await auth();
    if (!session) {
      throw Error("Unauthenticated");
    }
    const id = session?.user?.id;
    delete data.password;
    const updatedUser = await prisma.user.update({ data, where: { id } });
    return successResponse("User Update success", 200, updatedUser);
  } catch {
    return errorResponse();
  }
};
