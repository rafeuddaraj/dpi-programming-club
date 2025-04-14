"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import { auth } from "../auth";

// Quizzes

export const createQuiz = async (parentId, childId, data) => {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || role !== "admin") throw Error();
  const resp = await prisma.quizzes.create({
    data: { parentId, childId, ...data },
  });
  return successResponse("Quiz Create Success.", 200, resp);
};
// export const getQuizAll = async(parentId);
export const getSingleQuiz = async (id) => {
  try {
    const session = await auth();
    if (!session) throw Error();
    const resp = await prisma.quizzes.findUnique({
      where: { id },
      include: { questions: { include: { quizAnswers: true } }, results: true },
    });
    return successResponse("Fetch Quiz success", 200, resp);
  } catch {
    return errorResponse();
  }
};

export const updateQuiz = async (id, data) => {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || role !== "admin") throw Error();
  const resp = await prisma.quizzes.update({ where: { id }, data });
  return successResponse("Quiz Update Success.", 200, resp);
};

// Questions
export const createQuizQuestion = async (quizId, data) => {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || role !== "admin") throw Error();
  const resp = await prisma.quizQuestions.create({ data: { quizId, ...data } });
  return successResponse("Quiz Question Create Success.", 200, resp);
};
export const getSingleQuizQuestion = async (id) => {
  try {
    const session = await auth();
    if (!session) throw Error();
    const resp = await prisma.quizQuestions.findUnique({
      where: { id },
      include: { quiz: true },
    });
    return successResponse("Fetch Quiz Question success", 200, resp);
  } catch {
    return errorResponse();
  }
};

export const updateQuizQuestion = async (id, data) => {
  const session = await auth();
  const role = session?.user?.role;
  if (!role || role !== "admin") throw Error();
  const resp = await prisma.quizQuestions.update({ where: { id }, data });
  return successResponse("Quiz Question Update Success.", 200, resp);
};

// Quiz Answers Submission
export const createQuizAnswerSubmission = async (
  questionId,
  data,
  done = false
) => {
  try {
    const session = await auth();
    const user = session?.user;
    const userId = user?.id;
    const quizQuestion = await prisma.quizQuestions.findUnique({
      where: { id: questionId },
    });
    const isCorrect =
      data?.selectedAnswer?.length === quizQuestion?.correctAnswer?.length &&
      data?.selectedAnswer?.every((ans) =>
        quizQuestion?.correctAnswer?.includes(ans)
      );
    // Generating or updating result Result
    await prisma.quizResults.upsert({
      where: { userId: userId, quizId: quizQuestion.quizId },
      create: {
        score: isCorrect ? quizQuestion.marks : 0,
        userId: userId,
        quizId: quizQuestion.quizId,
        status: done ? "SUBMITTED" : "IN_PROGRESS",
        completedAt: done ? new Date() : null,
      },
      update: {
        score: isCorrect ? quizQuestion.marks : 0,
        status: done ? "SUBMITTED" : "IN_PROGRESS",
        completedAt: done ? new Date() : null,
      },
    });
    const resp = await prisma.quizAnswersSubmission.create({
      data: { userId, questionId, isCorrect, ...data },
    });
    return successResponse(
      "Quiz Question Submission Create Success.",
      200,
      resp
    );
  } catch {
    return errorResponse();
  }
};
