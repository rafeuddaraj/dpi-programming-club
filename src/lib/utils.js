import { errorResponse, successResponse } from "@/utils/req-res";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./prisma";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date, options = { time: false }) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(options.time && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  }).format(new Date(date));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function isMembershipExpired(renewalDate) {
  return new Date(renewalDate) < new Date();
}

export const commonGet = async (
  model,
  where = {},
  include = {},
  page = 1,
  pageSize = 10,
  orderBy
) => {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch paginated results
    const results = await prisma[model].findMany({
      where,
      include,
      skip,
      take,
      orderBy,
    });

    // Get total count for pagination
    const totalCount = await prisma[model].count({ where });

    const totalPages = Math.ceil(totalCount / pageSize);

    return successResponse(`Successfully fetched ${model}`, 200, {
      data: results,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalCount,
      },
    });
  } catch (error) {
    console.error(`Error fetching ${model}:`, error);
    return errorResponse(500, `Failed to fetch ${model}`);
  }
};

export const getStatus = (startTime, endTime) => {
  const now = new Date();

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) {
    return "Upcoming";
  } else if (now >= start && now <= end) {
    return "Ongoing";
  } else {
    return "Completed";
  }
};
