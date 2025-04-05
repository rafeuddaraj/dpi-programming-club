"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

export const addSkill = async (data) => {
  try {
    const resp = await prisma.skills.create({ data });
    revalidatePath("/dashboard/skills");
    return resp;
  } catch (error) {
    if (error?.code === "P2002") {
      return errorResponse({
        message: "Skill already exists",
        status: 409,
      });
    } else {
      return errorResponse({
        message: "Error creating skill",
        status: 500,
      });
    }
  }
};

export const updateSkill = async (id, data) => {
  try {
    const skill = await prisma.skills.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/skills");
    return skill;
  } catch {
    return errorResponse({
      message: "Error updating skill",
      status: 500,
    });
  }
};

export const createSkillRequest = async (data) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    data = data?.map((skill) => ({ ...skill, userId: user?.id }));

    const skillRequest = await prisma.userSkills.createMany({
      data,
    });
    revalidatePath("/profile/dashboard/skills");
    return successResponse(
      "Skill request created successfully",
      200,
      skillRequest
    );
  } catch (error) {
    console.log(error);

    if (error?.code === "P2002") {
      return errorResponse({
        message: "Skill request already exists",
        status: 409,
      });
    } else {
      return errorResponse({
        message: "Error creating skill request",
        status: 500,
      });
    }
  }
};

export const reSubmitSkillRequest = async (id, reason) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    const skillRequest = await prisma.userSkills.update({
      where: { id, userId: user?.id },
      data: { status: "PENDING", reason },
    });
    revalidatePath("/profile/dashboard/skills");
    return skillRequest;
  } catch (error) {
    return errorResponse({
      message: "Error creating skill request",
      status: 500,
    });
  }
};

export const approveSkillRequest = async (id, feedback) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    const skillRequest = await prisma.userSkills.update({
      where: { id },
      data: {
        status: "APPROVED",
        feedback,
        rejectionNote: null,
        reviewerId: user?.id,
      },
    });
    revalidatePath("dashboard/skills");
    return skillRequest;
  } catch (error) {
    return errorResponse({
      message: "Error approving skill request",
      status: 500,
    });
  }
};

export const rejectSkillRequest = async (id, reason) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    const skillRequest = await prisma.userSkills.update({
      where: { id },
      data: { status: "REJECTED", rejectionNote: reason, reviewerId: user?.id },
    });
    revalidatePath("dashboard/skills");
    return skillRequest;
  } catch (error) {
    return errorResponse({
      message: "Error rejecting skill request",
      status: 500,
    });
  }
};

export const deleteSkillRequest = async (id) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      throw new Error();
    }
    const skillRequest = await prisma.userSkills.delete({
      where: { id },
    });
    revalidatePath("/dashboard/skills");
    return skillRequest;
  } catch (error) {
    throw new Error();
  }
};

export const getAllSkillRequests = async (
  query,
  status = "PENDING",
  page,
  limit
) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    let where = null;
    let include = null;
    if (user?.role === "admin") {
      where = {
        status,
        OR: [
          {
            user: {
              user: { rollNo: { contains: query, mode: "insensitive" } },
            },
          },
          { skill: { name: { contains: query, mode: "insensitive" } } },
        ],
      };
      include = {
        user: { include: { user: true } },
        skill: true,
        reviewer: { include: { user: true } },
      };
    } else if (user?.role === "moderator") {
      where = {
        reviewerId: userId,
        status: "PENDING",
        OR: [
          {
            user: {
              user: { rollNo: { contains: query, mode: "insensitive" } },
            },
          },
          { skill: { name: { contains: query, mode: "insensitive" } } },
        ],
      }; // for moderators
      include = {
        user: true,
        skill: true,
        reviewer: { include: { user: true } },
      }; // for moderators
    } else {
      where = {
        userId,
        OR: [
          {
            user: {
              user: { rollNo: { contains: query, mode: "insensitive" } },
            },
          },
          { skill: { name: { contains: query, mode: "insensitive" } } },
        ],
      }; // for users
      include = {
        user: true,
        skill: true,
      }; // for users
    }
    if (status === "ALL") delete where?.status;
    return await commonGet("userSkills", where, include, page, limit, {
      createdAt: "desc",
    });
  } catch (error) {
    return errorResponse({
      message: "Error fetching skill requests",
      status: 500,
    });
  }
};

export const getAllSkills = async (page, limit) => {
  try {
    const skills = await commonGet("skills", {}, { users: true }, page, limit, {
      createdAt: "desc",
    });
    return skills;
  } catch (error) {
    return errorResponse({
      message: "Error fetching skills",
      status: 500,
    });
  }
};

export const getAllApprovedSkills = async (page, limit) => {
  try {
    const skills = await commonGet(
      "userSkills",
      { status: "APPROVED" },
      null,
      page,
      limit,
      { createdAt: "desc" }
    );
    return skills;
  } catch (error) {
    return errorResponse({
      message: "Error fetching approved skills",
      status: 500,
    });
  }
};

export const getSkillById = async (id) => {
  try {
    const skill = await prisma.skills.findUnique({
      where: { id },
    });

    return successResponse("Skill fetched", 200, skill);
  } catch (error) {
    return errorResponse({
      message: "Error fetching skill",
      status: 500,
    });
  }
};

export const getAllSkillWithoutPrevSkills = async () => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    const resp = await prisma.skills.findMany({
      where: { users: { none: { userId: user?.id } } },
    });
    return successResponse("Skill fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};

export const getAllSkillRequestsByUserId = async (userId) => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    const skillRequests = await prisma.userSkills.findMany({
      where: { userId: user?.id },
      include: { skill: true },
    });
    const mappedSkillData = skillRequests?.map((skill) => {
      const skillData = skill?.skill;
      return {
        id: skill?.id,
        name: skillData?.name,
        status: skill?.status,
        createdAt: skill?.createdAt,
        updatedAt: skill?.updatedAt,
        rejectionNote: skill?.rejectionNote,
        feedback: skill?.feedback,
        reason: skill?.reason,
        experience: skill?.experience,
      };
    });

    return successResponse(
      "Skill requests fetched successfully",
      200,
      mappedSkillData
    );
  } catch (error) {
    return errorResponse({
      message: "Error fetching skill requests",
      status: 500,
    });
  }
};

export const getAllApprovedSkillsByUser = async () => {
  try {
    const session = await auth();
    const user = session?.user || null;
    if (!user) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }
    const skills = await prisma.userSkills.findMany({
      where: { userId: user?.id, status: "APPROVED" },
      include: { skill: true },
    });
    return successResponse("Approved skills fetched", 200, skills);
  } catch (error) {
    return errorResponse({
      message: "Error fetching approved skills",
      status: 500,
    });
  }
};

export const distributeSkillRequest = async () => {
  try {
    const moderators = await prisma.user.findMany({
      where: {
        OR: [{ role: "moderator" }, { examiner: true }], // TODO:: Change for Final
      },
      select: { id: true },
    });

    if (moderators.length === 0) {
      return errorResponse("No moderators or examiners found");
    }

    // Step 2: Get all pending skill requests that are not yet assigned
    const pendingSkills = await prisma.userSkills.findMany({
      where: { status: "PENDING", reviewerId: null },
      select: { id: true },
    });

    if (pendingSkills.length === 0) {
      return errorResponse("No pending skill requests to distribute");
    }

    // Step 3: Shuffle moderators for randomness
    const shuffledModerators = moderators.sort(() => Math.random() - 0.5);

    let index = 0;
    const updates = pendingSkills.map((skill) => {
      const reviewer = shuffledModerators[index];
      index = (index + 1) % shuffledModerators.length; // Round-robin distribution

      return prisma.userSkills.update({
        where: { id: skill.id },
        data: { reviewerId: reviewer.id },
      });
    });

    // Step 4: Execute all updates
    await Promise.all(updates);
    revalidatePath("dashboard/skills");
    return successResponse(
      "Unassigned skill requests distributed successfully",
      200,
      null
    );
  } catch (error) {
    return errorResponse("Unassigned skill requests distributed failed");
  }
};

export const removeSkillDistribution = async () => {
  try {
    const resp = await prisma.userSkills.updateMany({
      where: { reviewerId: { not: null }, status: "PENDING" },
      data: { reviewerId: null },
    });

    if (!resp?.length) throw "No unpending ";
    revalidatePath("dashboard/skills");
    return { message: "All skill request assignments have been reset." };
  } catch (error) {
    return { error: "Failed to reset skill assignments" };
  }
};

export const unDistributeCountAndDistributeCount = async () => {
  try {
    const unassignedCount = await prisma.userSkills.count({
      where: { reviewerId: null, status: "PENDING" },
    });
    const distributedCount = await prisma.userSkills.count({
      where: { reviewerId: { not: null }, status: "PENDING" },
    });
    return successResponse("success", 200, {
      unassignedCount,
      distributedCount,
    });
  } catch (error) {
    return errorResponse();
  }
};
