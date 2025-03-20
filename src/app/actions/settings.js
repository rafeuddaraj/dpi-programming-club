"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const createOrUpdateSettings = async (settings) => {
  try {
    const session = await auth();
    const user = session?.user || {};
    const isAdmin = user?.role === "admin";
    if (!isAdmin) {
      throw new Error("Unauthorized");
    }

    // Ensure settings.id is available, otherwise create new settings
    if (!settings?.id) {
      // If id is missing, create new settings without using 'where' clause
      const resp = await prisma.settings.create({
        data: settings, // directly use settings for creation
      });
      revalidatePath("/dashboard/settings");
      return successResponse("Settings created", 200, resp);
    } else {
      // If id is provided, update existing settings
      const updatedData = { ...settings };
      delete updatedData?.id;
      const resp = await prisma.settings.upsert({
        where: { id: settings.id },
        update: updatedData,
        create: settings,
      });
      revalidatePath("/dashboard/settings");
      return successResponse("Settings updated", 200, resp);
    }
  } catch (err) {
    console.log("Error:", err.message);
    return errorResponse("Failed to update settings", 500);
  }
};
export const getSettings = async () => {
  try {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      return errorResponse("Settings not found", 404);
    }
    return successResponse("Settings fetched successfully", 200, settings);
  } catch (err) {
    console.log("Error:", err.message);
    return errorResponse("Failed to fetch settings", 500);
  }
};
