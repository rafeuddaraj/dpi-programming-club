"use server";

import { commonGet } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const { default: prisma } = require("@/lib/prisma");
const { errorResponse, successResponse } = require("@/utils/req-res");

export const createManagement = async (data) => {
  try {
    const resp = await prisma.elections.create({ data });
    return successResponse("Created success", 201);
  } catch (err) {
    console.log(err);

    throw Error(err.message);
  }
};
export const updateManagement = async (id, data) => {
  try {
    const resp = await prisma.elections.update({ where: { id }, data });
    return successResponse("Created success", 201);
  } catch {
    return errorResponse();
  }
};
export const getSingleManagement = async (id) => {
  try {
    const resp = await prisma.elections.findUnique({
      where: { id },
      include: { members: true },
    });

    return successResponse("fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};
export const updatePin = async (id, pinStatus) => {
  try {
    await prisma.elections.updateMany({
      where: { NOT: [{ id }] },
      data: { pin: false },
    });
    const resp = await prisma.elections.update({
      where: { id },
      data: { pin: pinStatus },
    });
    revalidatePath("/dashboard/managements");
  } catch {
    throw Error();
  }
};
export const getAllManagements = async (query, page, limit) => {
  try {
    const where = { name: { contains: query || "", mode: "insensitive" } };
    const orderBy = { createdAt: "desc" };
    const resp = await commonGet(
      "elections",
      where,
      {
        members: { include: { user: { include: { user: true } } } },
      },
      page,
      limit,
      orderBy
    );
    return successResponse("fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};
// Members

export const createManagementMember = async (data) => {
  try {
    console.log(data);

    const resp = await prisma.electionMember.create({ data });
    return successResponse("Created success", 201);
  } catch (err) {
    console.log(err);

    throw Error();
  }
};
export const updateManagementMember = async (id, data) => {
  try {
    const resp = await prisma.electionMember.update({ where: { id }, data });
    return successResponse("Created success", 201);
  } catch (err) {
    console.log(err);

    throw Error();
  }
};

export const getAllManagementMemberByManagementId = async (
  id,
  query,
  page,
  limit
) => {
  try {
    const where = {
      user: {
        user: { rollNo: { contains: query || "", mode: "insensitive" } },
      },
      electionId: id,
    };
    const orderBy = { role: { value: "asc" } };
    const resp = await commonGet(
      "electionMember",
      where,
      {
        user: {
          include: { user: { include: { user: true } } },
        },
        election: true,
      },
      page,
      limit,
      orderBy
    );
    return successResponse("fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};

export const deleteManagementMember = async (id, pathname) => {
  let res = await prisma.electionMember.delete({ where: { id } });
  revalidatePath(pathname);
  return res;
};
export const getSingleManagementUser = async (id) => {
  try {
    const resp = await prisma.electionMember.findUnique({
      where: { id },
      include: { user: { include: { user: true } }, election: true },
    });

    return successResponse("fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};
export const getUserByRoll = async (rollNo, electionId) => {
  try {
    const resp = await prisma.registeredUser.findUnique({
      where: { rollNo },
      select: {
        email: true,
        name: true,
        rollNo: true,
        user: { select: { id: true, avatar: true } },
      },
    });
    const resp2 = await prisma.electionMember.findFirst({
      where: { electionId, userId: resp?.user?.id },
      select: { user: { select: { user: { select: { rollNo: true } } } } },
    });
    if (resp2?.user?.user?.rollNo === rollNo) {
      throw Error("User already in management.");
    }
    if (!resp) throw Error("Member not found. Please check the roll number.");

    return successResponse("fetch success", 200, resp);
  } catch (err) {
    console.log(err);

    return errorResponse(err?.message);
  }
};

// Getting public

export const getPinnedManagementTeam = async () => {
  try {
    const today = new Date();
    const resp = await prisma.elections.findFirst({
      where: { pin: true, endingDate: { gt: today } },
      include: {
        members: {
          include: {
            user: {
              include: {
                user: true,
                skills: {
                  select: { skill: { select: { name: true } }, status: true },
                },
              },
            },
          },
        },
      },
    });
    return successResponse("Fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};
export const getAllManagementTeam = async (query, page, limit) => {
  try {
    const today = new Date();
    const where = {
      endingDate: {
        lt: today,
      },
      name: { contains: query || "", mode: "insensitive" },
    };
    const include = {
      members: {
        include: {
          user: {
            include: {
              user: true,
              skills: {
                select: { skill: { select: { name: true } }, status: true },
              },
            },
          },
        },
      },
    };
    const orderby = { endingDate: "desc" };
    const resp = await commonGet(
      "elections",
      where,
      include,
      page,
      limit,
      orderby
    );
    return successResponse("Fetch success", 200, resp);
  } catch {
    return errorResponse();
  }
};
