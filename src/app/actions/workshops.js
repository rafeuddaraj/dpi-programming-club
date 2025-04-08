"use server";

import prisma from "@/lib/prisma";
import { commonGet, getStatus, getStatusClass } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";
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
      include: {
        modules: { include: { lessons: true } },
        participants: {
          include: {
            participant: { include: { user: true } },
            payment: true,
            workshop: true,
          },
        },
      },
    });
    if (!workshop) return errorResponse("Workshop not found", 404);
    return successResponse("Workshop retrieved successfully", 200, workshop);
  } catch (error) {
    console.log(error);

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
  const include = { participants: true, modules: true };
  return commonGet("workshop", where, include, page, limit, {
    createdAt: "desc",
  });
};

// Upcoming Workshop Fetching
export const getAllUpcomingWorkshop = async () => {
  try {
    const workshops = await prisma.workshop.findMany({
      where: {
        registrationDeadline: {
          gte: new Date(),
        },
        isActive: true,
      },
      include: { modules: { include: { lessons: true } }, participants: true },
      orderBy: {
        registrationDeadline: "asc",
      },
    });

    return successResponse("Workshop retrieved successfully", 200, workshops);
  } catch (error) {
    console.error("Error fetching upcoming workshops:", error);
    errorResponse("Failed to fetch upcoming workshops");
  }
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
    const resp = await prisma.$transaction(async (db) => {
      const participant = await db.workshopParticipant.count({
        where: { workshopId },
      });
      if (participant) {
        throw Error(
          "Can't delete this workshop cause this workshop are participant here."
        );
      }
      await db.workshopLesson.deleteMany({
        where: { module: { workshopId } },
      });
      await db.workshopModule.deleteMany({ where: { workshopId } });
      await db.assignments.deleteMany({
        where: { lessons: { module: { workshopId } } },
      });
      await db.workshop.delete({ where: { id: workshopId } });
      return "Workshop deleted successfully";
    });
    return successResponse(resp, 200);
  } catch (error) {
    console.log(error);

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

export const getModuleByWorkshopId = async (workshopId, isAdmin = false) => {
  try {
    const where = isAdmin ? {} : { isActive: true };
    console.log(where);

    const resp = await prisma.workshopModule.findMany({
      where: { workshopId },
      include: {
        lessons: { orderBy: { position: "asc" }, where: { ...where } },
        workshop: true,
      },
    });
    if (!resp) return errorResponse("Workshop module not found", 404);
    return successResponse("Workshop module retrieved successfully", 200, resp);
  } catch (error) {
    return errorResponse(error.message || "Failed to fetch workshop resp");
  }
};

export const updateWorkshopModulePosition = async (modules) => {
  try {
    const updatePromises = modules?.map((module) =>
      prisma.workshopModule.update({
        where: { id: module.id },
        data: { position: module.position },
      })
    );

    const updatedModules = await Promise.all(updatePromises);

    return successResponse(
      "Workshop modules updated successfully",
      200,
      updatedModules
    );
  } catch (error) {
    console.log(error);

    return errorResponse(error.message || "Failed to update workshop modules");
  }
};
export const updateWorkshopModule = async ({ workshopModuleId, data }) => {
  try {
    const updatedModule = await prisma.workshopModule.update({
      where: { id: workshopModuleId },
      data,
    });
    return successResponse(
      "Workshop modules updated successfully",
      200,
      updatedModule
    );
  } catch (error) {
    console.log(error);

    return errorResponse(error.message || "Failed to update workshop modules");
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
      include: { module: true, assignment: true },
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

export const updateWorkshopLessons = async (lessons) => {
  try {
    const updatePromises = lessons.map((lesson) =>
      prisma.workshopLesson.update({
        where: { id: lesson.id },
        data: { position: lesson.position },
      })
    );

    const updatedLessons = await Promise.all(updatePromises);

    return successResponse(
      "Workshop lessons updated successfully",
      200,
      updatedLessons
    );
  } catch (error) {
    return errorResponse(error.message || "Failed to update workshop lessons");
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

// Enroll Workshop

export const enrollWorkshop = async (
  data,
  isPremium = false,
  revalidatePathSrc
) => {
  try {
    const session = await auth();
    const user = session?.user;
    const userResp = await prisma?.user?.findUnique({
      where: { id: user?.id },
    });
    if (!userResp) {
      throw new Error("User not found");
    }
    let res = null;
    const bookedSeat =
      (await prisma.workshopParticipant.findMany({
        where: { workshopId: data?.id },
      })) || [];
    const currentWorkshop = await prisma.workshop.findUnique({
      where: { id: data?.id },
    });

    if (isPremium) {
      console.log("I am Called");

      if (
        currentWorkshop.totalSeats > bookedSeat?.length ||
        currentWorkshop?.type === "ONLINE"
      ) {
        res = await prisma.$transaction(async (db) => {
          const paymentData = {
            userId: user?.id,
            accountNo: data.bkashNumber,
            amount: data.amount,
            paymentDetails: `${data?.name} - Workshop`,
            paymentMethod: "Bkash",
            transactionId: data?.transactionNumber,
          };

          const payment = await db.payment.create({ data: paymentData });
          const workshopData = {
            workshopId: data?.id,
            participantId: user?.id,
            paymentId: payment?.id,
            price: data?.amount,
          };

          const workshop = await db.workshopParticipant.create({
            data: workshopData,
            include: { payment: true },
          });
          return workshop;
        });
      } else {
        throw new Error("No seat available");
      }
    } else {
      if (
        currentWorkshop.totalSeats > bookedSeat?.length ||
        currentWorkshop.totalSeats === null
      ) {
        res = await prisma.workshopParticipant.create({
          data: { participantId: user?.id, workshopId: data?.id },
        });
      } else {
        throw new Error("No seat available");
      }
    }
    revalidatePath(revalidatePathSrc);
    return successResponse("", 201, res);
  } catch (err) {
    return errorResponse(err?.message);
  }
};

export const getWorkshopParticipant = async (workshopId) => {
  const session = await auth();
  const { user } = session || {};

  const participant = await prisma.workshopParticipant.findFirst({
    where: { workshopId, participantId: user?.id },
    include: { workshop: true },
  });
  return participant;
};

// Updating Last Module and Lesson Id
export const updateLastModuleAndLesson = async (
  workshopParticipantId,
  data
) => {
  try {
    const session = await auth();

    const resp = await prisma.workshopParticipant.update({
      where: { participantId: session?.user?.id, id: workshopParticipantId },
      data,
    });
    return successResponse("Active Lesson and Module updated", 200);
  } catch {
    return errorResponse();
  }
};

export const getActiveLessonAndModule = async (workshopId) => {
  try {
    const session = await auth();
    const active = await prisma.workshopParticipant.findFirst({
      where: { workshopId, participantId: session?.user?.id },
    });
    if (active?.lastLessonId && active?.lastLessonId) {
      const lesson = await prisma.workshopLesson.findFirst({
        where: { id: active?.lastLessonId, isActive: true },
        orderBy: { position: "asc" },
        include: { assignment: true },
      });
      const workshopModule = await prisma.workshopModule.findFirst({
        where: { id: active.lastModuleId, isActive: true },
        orderBy: { position: "asc" },
      });
      const data = { lesson, module: workshopModule };
      return successResponse("success", 200, data);
    } else {
      const workshopModule = await prisma.workshopModule.findFirst({
        where: { workshopId, isActive: true },
        include: {
          lessons: {
            orderBy: { position: "asc" },
            include: { assignment: true },
          },
        },
      });
      const { lessons, ...module } = workshopModule;
      const lesson = lessons[0];
      return successResponse("success", 200, { lesson, module });
    }
  } catch (err) {
    return errorResponse();
  }
};

export const getModuleAndLesson = async (workshopId, lessonId) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) throw new Error("User not found");
    const resp = await prisma.workshopParticipant.findFirstOrThrow({
      where: { workshopId: workshopId, participantId: user?.id },
    });
    if (!resp) {
      throw new Error("User not found");
    }
    const lesson = await prisma.workshopLesson.findFirst({
      where: { id: lessonId, isActive: true },
      include: { assignment: true, module: true },
    });
    return successResponse("success", 200, lesson);
  } catch (err) {
    console.log(err);

    return errorResponse();
  }
};

export const getAllWorkshopModulesAndLessons = async (workshopId) => {
  try {
    const resp = await prisma.workshop.findFirst({
      where: { id: workshopId },
      include: {
        modules: {
          orderBy: { position: "asc" },
          where: { isActive: true },
          include: {
            lessons: {
              orderBy: { position: "asc" },
              where: { isActive: true },
            },
          },
        },
      },
    });
    return successResponse("success", 200, resp);
  } catch {
    return errorResponse();
  }
};

// Just cycle to running server
export const withTimeStatus = async (modules = []) => {
  return modules?.map((module) => {
    const status = getStatus(module?.startingDate, module?.endingDate);
    const statusClasses = getStatusClass(status);

    const updatedLessons = module?.lessons?.map((lesson) => {
      const lessonStatus = getStatus(lesson?.startingDate, lesson?.endingDate);
      const lessonStatusClasses = getStatusClass(lessonStatus);
      return {
        ...lesson,
        status: lessonStatus,
        statusClasses: lessonStatusClasses,
      };
    });

    return { ...module, status, statusClasses, lessons: updatedLessons };
  });
};

export const getWorkshopProgress = async (workshopId) => {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id: workshopId },
      include: {
        modules: {
          where: { isActive: true },
          include: {
            lessons: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    if (!workshop) {
      throw new Error("Workshop not found");
    }

    const now = new Date();
    let totalLessons = 0;
    let completedLessons = 0;

    workshop.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        totalLessons++;
        const lessonEnd = new Date(lesson.endingDate);

        if (lessonEnd <= now) {
          completedLessons++;
        }
      });
    });

    const progress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;
    return progress;
  } catch (error) {
    console.error("Error fetching progress:", error);
    return 0;
  }
};

// Get All Participants of a Workshop

export const getWorkshopParticipants = async (page, limit) => {
  try {
    const session = await auth();
    let where = { participantId: session?.user?.id };
    let include = {
      workshop: { include: { modules: { include: { lessons: true } } } },
      payment: true,
      participant: { include: { user: true } },
    };
    let orderBy = { joining: "asc" };

    const participants = await commonGet(
      "workshopParticipant",
      where,
      include,
      page,
      limit,
      orderBy
    );
    return successResponse(
      "Workshop participants retrieved successfully",
      200,
      participants
    );
  } catch (error) {
    return errorResponse(
      error.message || "Failed to fetch workshop participants"
    );
  }
};

// Common Update
export const reviewParticipantData = async (id, data, path, model) => {
  try {
    const resp = await prisma[model].update({
      where: { id },
      data: { reviewStatus: "MARKED", ...data },
    });
    revalidatePath(path);
    return successResponse("Participant data updated successfully", 200);
  } catch {
    return errorResponse();
  }
};

export const distributeAllWorkshopsByModerator = async (
  workshopId,
  pathname
) => {
  try {
    const resp = await prisma?.$transaction(async (db) => {
      const moderators = await db?.user?.findMany({
        where: {
          role: "moderator",
          examiner: true,
        },
        select: { id: true },
      });

      if (!moderators.length) throw new Error("No eligible moderators found");

      const participants = await db?.workshopParticipant?.findMany({
        where: {
          workshopId,
          examinerId: null,
        },
      });

      if (!participants.length) {
        throw new Error("No participants found without examiner");
      }

      const shuffledParticipants = [...participants].sort(
        () => Math.random() - 0.5
      );

      const updates = shuffledParticipants.map((participant, index) => {
        const moderatorIndex = index % moderators.length;
        const moderatorId = moderators[moderatorIndex].id;

        return db.workshopParticipant.update({
          where: { id: participant.id },
          data: { examinerId: moderatorId },
        });
      });

      await Promise.all(updates);

      return "Participants distributed randomly and evenly among moderators";
    });
    revalidatePath(pathname);
    return successResponse(resp);
  } catch (error) {
    console.error("Distribution Error:", error);
    return errorResponse();
  }
};

export const removeWorkshopPendingDistributionsByModerator = async (
  workshopId,
  pathname
) => {
  try {
    const resp = await prisma?.$transaction(async (db) => {
      const distributedParticipants = await db.workshopParticipant.findMany({
        where: {
          workshopId,
          examinerId: { not: null },
          reviewStatus: "PENDING",
        },
      });

      if (!distributedParticipants.length) {
        throw new Error("No pending distributed participants found");
      }

      const updates = distributedParticipants.map((participant) => {
        return db.workshopParticipant.update({
          where: { id: participant.id },
          data: { examinerId: null },
        });
      });

      await Promise.all(updates);

      return {
        message: "Pending distributions removed successfully",
        count: distributedParticipants.length,
      };
    });
    revalidatePath(pathname);
    return successResponse(resp?.message, 200, resp);
  } catch (error) {
    console.error("Remove Distribution Error:", error);
    return errorResponse();
  }
};

export const removeWorkshopPublishedDistributionsByModerator = async (
  moderatorId,
  pathname
) => {
  try {
    const resp = await prisma?.$transaction(async (db) => {
      const distributedParticipants = await db.workshopParticipant.findMany({
        where: {
          examinerId: moderatorId,
          reviewStatus: "PUBLISHED",
        },
      });

      if (!distributedParticipants.length) {
        throw new Error(
          "No published distributed participants found for this moderator"
        );
      }

      const updates = distributedParticipants.map((participant) => {
        return db.workshopParticipant.update({
          where: { id: participant.id },
          data: { examinerId: null },
        });
      });

      await Promise.all(updates);

      return {
        message:
          "Published distributions removed successfully for the moderator",
        count: distributedParticipants.length,
      };
    });
    revalidatePath(pathname);
    return successResponse(resp.message, 200, resp);
  } catch (error) {
    console.error("Remove Distribution Error:", error);
    return errorResponse();
  }
};

export const getWorkshopParticipantDistributionStats = async (workshopId) => {
  try {
    const stats = await prisma.$transaction(async (db) => {
      const undistributedCount = await db.workshopParticipant.count({
        where: {
          workshopId,
          examinerId: null,
        },
      });

      const distributedCount = await db.workshopParticipant.count({
        where: {
          workshopId,
          examinerId: { not: null },
          reviewStatus: { in: ["PENDING"] },
        },
      });

      const markedCount = await db.workshopParticipant.count({
        where: {
          workshopId,
          reviewStatus: "MARKED",
        },
      });

      const paymentCount = await db.payment.count({
        where: {
          WorkshopParticipant: { some: { workshopId } },
          paymentStatus: false,
        },
      });

      return {
        workshopId,
        undistributedCount,
        distributedCount,
        markedCount,
        paymentCount,
      };
    });

    return successResponse("Success", 200, stats);
  } catch (error) {
    console.error("Error fetching distribution stats:", error);
    return errorResponse();
  }
};

export const publishAllWorkshopMarkedParticipants = async (
  workshopId,
  pathname
) => {
  try {
    const updated = await prisma.workshopParticipant.updateMany({
      where: {
        workshopId,
        reviewStatus: "MARKED",
      },
      data: {
        reviewStatus: "PUBLISHED",
      },
    });
    revalidatePath(pathname);
    return successResponse(
      `${updated.count} participant(s) marked as published.`,
      200
    );
  } catch (error) {
    console.error("Publish Error:", error);
    return errorResponse();
  }
};

export const markAllWorkshopParticipantsAsPaid = async (
  workshopId,
  pathname
) => {
  try {
    const updated = await prisma.payment.updateMany({
      where: {
        WorkshopParticipant: { some: { workshopId } },
      },
      data: {
        paymentStatus: true,
      },
    });
    revalidatePath(pathname);
    return successResponse(
      `${updated.count} participant(s) marked as paid.`,
      200
    );
  } catch (error) {
    console.error("Payment Status Update Error:", error);
    return errorResponse();
  }
};

// Only Admin
export const getWorkshopParticipantsUsingAdminAndModerator = async (
  workshopId,
  query = "",
  status = "",
  type,
  page = 1,
  limit = 10
) => {
  try {
    const session = await auth();

    let where = {};
    let include = {};
    let orderBy = {};
    const user = session?.user;
    const role = user?.role;
    if (role === "member") {
      where = { participantId: session?.user?.id, workshopId };
      include = {
        workshop: { include: { modules: { include: { lessons: true } } } },
        payment: true,
        participant: { include: { user: true } },
      };
      orderBy = { joining: "asc" };
    } else if (role === "moderator") {
      status = status?.toString()?.toUpperCase();
      const access = ["MARKED", "PENDING", "RECHECK"];
      const isAccess = access?.includes(status);
      // Moderator not need for Workshop id cause moderator are examiner so just reviewing workshop participant data.
      where = {
        participant: {
          user: {
            OR: [
              { email: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
              { rollNo: { contains: query, mode: "insensitive" } },
            ],
          },
        },
        payment: {
          paymentStatus:
            type?.toString()?.toUpperCase() === "PAID" ? true : false,
        },
        examinerId: user?.id,
        workshopId,
        reviewStatus: { in: isAccess ? [status] : ["PENDING"] },
      };
      include = {
        workshop: { include: { modules: { include: { lessons: true } } } },
        payment: true,
        participant: { include: { user: true } },
      };
      orderBy = { joining: "asc" };
      if (status === "ALL") {
        where.reviewStatus = { in: access };
      }
      !workshopId && delete where?.workshopId;
    } else {
      status = status?.toString()?.toUpperCase();
      const access = ["MARKED", "PENDING", "RECHECK", "PUBLISHED"];
      const isAccess = access?.includes(status);
      where = {
        participant: {
          user: {
            OR: [
              { email: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
              { rollNo: { contains: query, mode: "insensitive" } },
            ],
          },
        },
        reviewStatus: { in: isAccess ? [status] : ["PENDING"] },
        workshopId,
        payment: {
          paymentStatus:
            type?.toString()?.toUpperCase() === "PAID" ? true : false,
        },
      };
      include = {
        workshop: { include: { modules: { include: { lessons: true } } } },
        payment: true,
        participant: {
          include: { user: true },
        },
        examiner: { include: { user: true } },
      };
      orderBy = { joining: "asc" };
      if (status === "ALL") {
        delete where?.reviewStatus;
      }
    }

    if (type?.toString()?.toUpperCase() === "ALL") {
      delete where?.payment;
    }

    const participants = await commonGet(
      "workshopParticipant",
      where,
      include,
      page,
      limit,
      orderBy
    );
    return successResponse(
      "Workshop participants retrieved successfully",
      200,
      participants
    );
  } catch (error) {
    return errorResponse(
      error.message || "Failed to fetch workshop participants"
    );
  }
};
