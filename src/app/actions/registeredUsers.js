"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";

export const createRegisteredUser = async (data) => {
  try {
    const resp = await prisma.registeredUser.create(data);
    return successResponse("User created successfully", 201, resp);
  } catch {
    return errorResponse("Something went wrong", 500);
  }
};
