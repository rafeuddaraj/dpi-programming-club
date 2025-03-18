"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { revalidatePath } from "next/cache";

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
      include: { user: true, examiner: true },
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

export const getAssignmentSubmissionUnMarking = async () => {
  try {
    const unmarkedSubmissions = await prisma.assignmentSubmission.findMany({
      where: {
        marks: null, // Unmarked submissions
      },
      include: {
        assignment: true, // Include assignment details
        user: true, // Include user details
      },
    });

    return successResponse(
      "Unmarked Submissions Retrieved Successfully",
      200,
      unmarkedSubmissions
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
        user: true,
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
