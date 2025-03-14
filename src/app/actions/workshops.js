"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
// Workshop Managements
export const createWorkshop = async (data) => {
  try {
    const resp = await prisma.workshop.create({ data });
    return successResponse("Workshop created successfully", 201, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to create workshop");
  }
};

export const getWorkshopById = async (workshopId) => {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId },
      include: { modules: true, participants: true },
    });
    if (!workshop) return errorResponse("Workshop not found", 404);
    return successResponse("Workshop retrieved successfully", 200, workshop);
  } catch (error) {
    return errorResponse(error.message || "Failed to fetch workshop");
  }
};

export const getWorkshops = async (query, status, type, page, limit) => {
  const now = new Date();
  const statusFinding =
    status === "all"
      ? {}
      : status === "inactive"
      ? { isActive: false }
      : status === "active"
      ? { isActive: true }
      : {};
  const typeFinding = type === "all" ? {} : { type: type?.toUpperCase() };
  const where = query
    ? {
        name: { contains: query, mode: "insensitive" },
        ...statusFinding,
        ...typeFinding,
      }
    : { ...statusFinding, ...typeFinding };
  console.log(query);

  const include = { participants: true, modules: true };
  return commonGet("workshop", where, include, page, limit, {
    createdAt: "desc",
  });
};

export const updateWorkshop = async ({ workshopId, data }) => {
  try {
    const resp = await prisma.workshop.update({
      where: { id: workshopId },
      data,
    });
    return successResponse("Workshop updated successfully", 200, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to update workshop");
  }
};

export const deleteWorkshop = async (workshopId) => {
  try {
    await prisma.workshop.delete({ where: { id: workshopId } });
    return successResponse("Workshop deleted successfully", 200);
  } catch (error) {
    return errorResponse(error.message || "Failed to delete workshop");
  }
};

// Workshop Module Management

export const createWorkshopModule = async ({ workshopId, data }) => {
  try {
    let position = 0;
    const workshop = await prisma.workshopModule.findFirst({
      where: { workshopId },
      orderBy: { position: "desc" },
    });

    if (workshop) {
      position = workshop.position + 1;
    }
    const resp = await prisma.workshopModule.create({
      data: { workshopId, position, ...data },
    });
    return successResponse("Workshop resp created successfully", 201, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to create workshop resp");
  }
};

export const getWorkshopModuleById = async (workshopModuleId) => {
  try {
    const resp = await prisma.workshopModule.findUnique({
      where: { id: workshopModuleId },
      include: { lessons: true, workshop: true },
    });
    if (!resp) return errorResponse("Workshop module not found", 404);
    return successResponse("Workshop module retrieved successfully", 200, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to fetch workshop resp");
  }
};

export const getModuleByWorkshopId = async (workshopId) => {
  try {
    const resp = await prisma.workshopModule.findMany({
      where: { workshopId },
      include: { lessons: { orderBy: { position: "desc" } }, workshop: true },
    });
    if (!resp) return errorResponse("Workshop module not found", 404);
    return successResponse("Workshop module retrieved successfully", 200, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to fetch workshop resp");
  }
};

export const updateWorkshopModule = async ({ workshopModuleId, data }) => {
  try {
    const resp = await prisma.workshopModule.update({
      where: { id: workshopModuleId },
      data,
    });
    return successResponse("Workshop module updated successfully", 200, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to update workshop module");
  }
};

export const deleteWorkshopModule = async (workshopModuleId) => {
  try {
    await prisma.$transaction(async (db) => {
      await db.workshopLesson
        .deleteMany({ where: { workshopModuleId } })
        .then(() => {})
        .catch(() => {});
      await db.workshopModule
        .delete({ where: { id: workshopModuleId } })
        .then(() => {})
        .catch(() => {});
      return true;
    });
    return successResponse("Workshop module deleted successfully", 200);
  } catch (error) {
    return errorResponse(error.message || "Failed to delete workshop module");
  }
};

// Workshop Lesson Management

export const createWorkshopLesson = async ({ workshopModuleId, data }) => {
  try {
    let position = 0;
    const workshopLesson = await prisma.workshopLesson.findFirst({
      where: { workshopModuleId },
      orderBy: { position: "desc" },
    });
    if (workshopLesson) {
      position = workshopLesson.position + 1;
    }
    const resp = await prisma.workshopLesson.create({
      data: { workshopModuleId, position, ...data },
    });
    return successResponse("Workshop lesson created successfully", 201, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to create workshop lesson");
  }
};

export const getWorkshopLessonById = async (workshopLessonId) => {
  try {
    const lesson = await prisma.workshopLesson.findUnique({
      where: { id: workshopLessonId },
      include: { module: true },
    });
    if (!lesson) return errorResponse("Workshop lesson not found", 404);
    return successResponse(
      "Workshop lesson retrieved successfully",
      200,
      lesson
    );
  } catch (error) {
    return errorResponse(error.message || "Failed to fetch workshop lesson");
  }
};

export const updateWorkshopLesson = async ({ workshopLessonId, data }) => {
  try {
    const resp = await prisma.workshopLesson.update({
      where: { id: workshopLessonId },
      data,
    });
    return successResponse("Workshop lesson updated successfully", 200, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to update workshop lesson");
  }
};

export const deleteWorkshopLesson = async (workshopLessonId) => {
  try {
    await prisma.workshopLesson.delete({ where: { id: workshopLessonId } });
    return successResponse("Workshop lesson deleted successfully", 200);
  } catch (error) {
    return errorResponse(error.message || "Failed to delete workshop lesson");
  }
};
