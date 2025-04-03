import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const user = await request?.json();

    if (!user) return NextResponse.json(errorResponse("Invalid", 401));
    const dbSession = await prisma.session.findFirst({
      where: { userId: user?.id },
    });
    if (!dbSession)
      return NextResponse.json(errorResponse("No such user", 401));
    if (dbSession?.refreshToken === user?.token?.refreshToken) {
      return NextResponse.json(successResponse("Done", 200));
    } else {
      return NextResponse.json(errorResponse("Not authorized", 401));
    }
  } catch (err) {
    return NextResponse.json(errorResponse("Error", 401));
  }
};
