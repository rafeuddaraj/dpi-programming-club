"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";

export const updatePaymentStatus = async (
  id,
  paymentStatus,
  revalidatePathCached
) => {
  try {
    if (typeof id === "string") {
      const data = await prisma.payment.update({
        where: { id },
        data: { paymentStatus },
      });
      revalidatePath(revalidatePathCached);
      return successResponse("Update payment status");
    } else {
      const data = await prisma.payment.updateMany({
        where: { id: { in: id } },
        data: { paymentStatus },
      });
    }
  } catch (err) {
    console.log(err);

    return errorResponse(err?.message);
  }
};
