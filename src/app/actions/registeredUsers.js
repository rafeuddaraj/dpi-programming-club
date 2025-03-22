"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";

// Create a new registered user
export const createRegisteredUser = async (data) => {
  try {
    const generateSecretCode = Math.floor(100000 + Math.random() * 900000);
    data.secretCode = generateSecretCode;
    const foundedUser = await prisma.registeredUser.findFirst({
      where: {
        OR: [
          { rollNo: { contains: data?.rollNo, mode: "insensitive" } },
          { email: { contains: data?.email, mode: "insensitive" } },
          { phoneNumber: { contains: data?.phoneNumber, mode: "insensitive" } },
          {
            registrationNo: {
              contains: data?.registrationNo,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    if (foundedUser) {
      return errorResponse("User already exists", 409);
    }
    const resp = await prisma.registeredUser.create({ data });
    revalidatePath("/dashboard/member-collect");
    return successResponse("User created successfully", 201, resp);
  } catch (error) {
    return errorResponse("Something went wrong", 500, error.message);
  }
};

// Get all registered users
export const getAllRegisteredUsers = async (query, page, limit) => {
  try {
    const now = new Date();
    const where = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { rollNo: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { phoneNumber: { contains: query, mode: "insensitive" } },
            { registrationNo: { contains: query, mode: "insensitive" } },
          ],
        }
      : {};
    return commonGet("registeredUser", where, { user: true }, page, limit, {
      createdAt: "desc",
    });
  } catch (error) {
    return errorResponse("Something went wrong", 500, error.message);
  }
};

// Get a single user by ID
export const getRegisteredUserById = async (rollNo, secretCode) => {
  try {
    const user = await prisma.registeredUser.findUnique({
      where: { rollNo, secretCode: parseInt(secretCode) },
      include: { user: true },
    });
    if (user?.user) {
      throw new Error("User already registered");
    }
    if (!user)
      return errorResponse(
        "Your information is not registered in our club. Please contact the registrar branch of CST Club - DPI with the necessary documents.",
        404
      );
    return successResponse("User fetched successfully", 200, user);
  } catch (error) {
    console.log(error.meta);

    return errorResponse(error?.message, 500);
  }
};

// Update a registered user
export const updateRegisteredUser = async (id, data) => {
  try {
    const updatedUser = await prisma.registeredUser.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/member-collect");
    return successResponse("User updated successfully", 200, updatedUser);
  } catch (error) {
    return errorResponse("Something went wrong", 500, error.message);
  }
};

// Delete a registered user
export const deleteRegisteredUser = async (id) => {
  try {
    await prisma.registeredUser.delete({ where: { id } });
    return successResponse("User deleted successfully", 200);
  } catch (error) {
    return errorResponse("Something went wrong", 500, error.message);
  }
};
