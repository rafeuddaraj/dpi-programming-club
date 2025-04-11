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
export function isExpiredDate(date) {
  return new Date(date) < new Date();
}

export const commonGet = async (
  model,
  where = {},
  include = {},
  page = 1,
  pageSize = 10,
  orderBy = {},
  select
) => {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const data = {
      where,
      include,
      skip,
      take,
      orderBy,
    };
    if (select) {
      delete data.include;
      data.select = select;
    }
    // Fetch paginated results
    const results = await prisma[model].findMany(data);

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
export const getStatusClass = (status) => {
  switch (status) {
    case "Upcoming":
      return "bg-blue-100 text-blue-800";
    case "Ongoing":
      return "bg-green-100 text-green-800";
    case "Completed":
      return "bg-gray-100 text-gray-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const COMING_SOON = process?.env?.NODE_ENV === "production";
