"use server";

import prisma from "@/lib/prisma";
import { commonGet } from "@/lib/utils";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";
import { auth } from "../auth";

// Create Assignment
export const createAssignment = async (data) => {
  try {
    const resp = await prisma.assignments.create({ data });
    return successResponse("Assignment Created Successfully", 201, resp);
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Get All Assignments
export const getAllRunningAssignments = async () => {
  try {
    const currentDate = new Date();
    const assignments = await prisma.assignments.findMany({
      where: { deuDate: { gte: currentDate } },
      include: {
        lessons: { include: { module: { include: { workshop: true } } } },
        submissions: true,
      },
    });
    return successResponse(
      "Running Assignments Retrieved Successfully",
      200,
      assignments
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Get Single Assignment
export const getAssignmentById = async (id) => {
  try {
    const assignment = await prisma.assignments.findUnique({
      where: { id },
      include: { lessons: true, submissions: true },
    });
    if (!assignment) return errorResponse("Assignment Not Found", 404);
    return successResponse(
      "Assignment Retrieved Successfully",
      200,
      assignment
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Update Assignment
export const updateAssignment = async (id, data) => {
  try {
    const updatedAssignment = await prisma.assignments.update({
      where: { id },
      data,
    });
    return successResponse(
      "Assignment Updated Successfully",
      200,
      updatedAssignment
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Delete Assignment
export const deleteAssignment = async (id) => {
  try {
    await prisma.assignments.delete({ where: { id } });
    revalidatePath("/dashboard/assignments");
    return successResponse("Assignment Deleted Successfully", 200);
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Create Assignment Submission
export const submitAssignment = async (data) => {
  try {
    const submission = await prisma.assignmentSubmission.create({ data });
    return successResponse(
      "Assignment Submitted Successfully",
      201,
      submission
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Get Submissions for an Assignment
export const getSubmissionsByAssignment = async (assignmentId) => {
  try {
    const submissions = await prisma.assignmentSubmission.findMany({
      where: { assignmentId },
      include: { user: { include: { user: true } }, examiner: true },
    });
    return successResponse(
      "Submissions Retrieved Successfully",
      200,
      submissions
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Grade Assignment Submission
export const gradeSubmission = async (
  submissionId,
  marks,
  feedback,
  examinerId
) => {
  try {
    const updatedSubmission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: { marks, feedback, examiner: { connect: { id: examinerId } } },
    });
    return successResponse(
      "Submission Graded Successfully",
      200,
      updatedSubmission
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getAssignmentSubmissionUnMarking = async (
  query,
  status,
  page,
  limit
) => {
  const where = query
    ? {
        assignment: { name: { contains: query, mode: "insensitive" } },
        status: status?.toUpperCase(),
      }
    : { status: status?.toUpperCase() };
  if (status === "all") delete where.status;
  const include = {
    assignment: {
      include: {
        lessons: { include: { module: { include: { workshop: true } } } },
      },
    }, // Include assignment details
    user: true, // Include user details
    examiner: true,
  };

  try {
    const resp = await commonGet(
      "assignmentSubmission",
      where,
      include,
      page,
      undefined,
      { createdAt: "desc" }
    );
    return successResponse(
      "Unmarked Submissions Retrieved Successfully",
      200,
      resp?.data
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getAssignmentSubmissionByUserIdAndAssignmentId = async (
  userId,
  assignmentId
) => {
  try {
    const submission = await prisma.assignmentSubmission.findFirst({
      where: {
        userId,
        assignmentId,
      },
      include: {
        assignment: true,
        user: { include: { user: true } },
      },
    });

    if (!submission) {
      return successResponse("No submission found", 404, null);
    }

    return successResponse(
      "Submission retrieved successfully",
      200,
      submission
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};
export const getAssignmentSubmissionById = async (id) => {
  try {
    const submission = await prisma.assignmentSubmission.findFirst({
      where: {
        id,
      },
      include: {
        assignment: true,
        user: { include: { user: true } },
        examiner: true,
      },
    });

    if (!submission) {
      return successResponse("No submission found", 404, null);
    }

    return successResponse(
      "Submission retrieved successfully",
      200,
      submission
    );
  } catch (error) {
    return errorResponse(error.message);
  }
};

// Admin Assignment Marking

export const adminAssignmentMarkSubmission = async (submissionId, data) => {
  try {
    const session = await auth();
    const user = session?.user || {};

    if (!user || user.role !== "admin") {
      return errorResponse("Unauthorized access", 403);
    }

    // Extract data from request
    const { marks, status, feedback } = data;

    // Find the existing submission
    const existingSubmission = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
    });

    if (!existingSubmission) {
      return errorResponse("Submission not found", 404);
    }

    // Update the submission with new values
    const updatedSubmission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marks,
        status,
        feedback,
        examinerId: user.id, // Assigning examiner as current user
        updatedAt: new Date(),
      },
    });

    return successResponse(
      "Submission updated successfully",
      updatedSubmission
    );
  } catch (error) {
    console.error("Error updating submission:", error);
    return errorResponse("Internal Server Error", 500);
  }
};

export const publishedAllMarkedAssignments = async () => {
  try {
    const session = await auth();
    const user = session?.user || {};

    if (!user || user.role !== "admin") {
      return errorResponse("Unauthorized access", 403);
    }

    const currentDate = new Date();
    const assignments = await prisma.assignmentSubmission.updateMany({
      where: { status: "MARKED" },
      data: { status: "PUBLISHED" },
    });
    revalidatePath("/dashboard/assignments/submissions");
    return successResponse("Mark Published Successfully", 200, assignments);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const distributeAllAssignments = async () => {
  try {
    const examiners = await prisma.user.findMany({
      where: { examiner: true },
      select: { id: true },
    });

    if (examiners.length === 0) {
      throw new Error("No examiners found!");
    }

    const submissions = await prisma.assignmentSubmission.findMany({
      where: { examinerId: null },
      select: { id: true },
    });

    if (submissions.length === 0) {
      throw new Error("No submissions found without examiner!");
    }

    const shuffledExaminers = [...examiners].sort(() => Math.random() - 0.5);
    let examinerIndex = 0;

    for (const submission of submissions) {
      const assignedExaminer = shuffledExaminers[examinerIndex];

      await prisma.assignmentSubmission.update({
        where: { id: submission.id },
        data: { examinerId: assignedExaminer.id },
      });

      examinerIndex = (examinerIndex + 1) % shuffledExaminers.length;
    }

    revalidatePath("/dashboard/assignments/submissions");
    return successResponse("Assignments distributed successfully", 200);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const removeDistributedAssignments = async () => {
  try {
    const updatedSubmissions = await prisma.assignmentSubmission.updateMany({
      where: { status: "PENDING" },
      data: { examinerId: null },
    });

    if (updatedSubmissions.count === 0) {
      throw new Error("No pending submissions found!");
    }
    revalidatePath("/dashboard/assignments/submissions");
    return successResponse("All pending assignments are reset", 200);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const getAllMarksCount = async () => {
  try {
    const markedCount = await await prisma.assignmentSubmission.findMany({
      where: { status: "MARKED" },
      include: {
        assignment: {
          include: {
            lessons: { include: { module: { include: true } } },
          },
        },
        user: { include: { user: true } },
      },
    });
    const unDistributedCount = await prisma.assignmentSubmission.findMany({
      where: { examinerId: null },
    });
    return successResponse("Marks Count Retrieved Successfully", 200, {
      markedCount: markedCount.length,
      unDistributedCount: unDistributedCount.length,
      markData: markedCount,
    });
  } catch {
    return errorResponse();
  }
};
