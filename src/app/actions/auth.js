"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerAction = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    data.status = "PROCESSING";
    const today = new Date();
    const renewalDate = new Date();

    // 6 Month Subscriptions
    renewalDate.setMonth(today.getMonth() + 6);

    data.renewalDate = renewalDate.toISOString();
    delete data?.confirmPassword;

    const res = await prisma.user.create({ data });
    return successResponse("User registered successfully.", 200, res);
  } catch (err) {
    console.log(err);

    return errorResponse("Failed to register user", 500);
  }
};
export const registerAndPaymentAction = async (data, paymentData) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const res = await prisma.$transaction(async (db) => {
      data.status = "PROCESSING";
      const today = new Date();
      const renewalDate = new Date();

      // 6 Month Subscriptions
      renewalDate.setMonth(today.getMonth() + 6);

      data.renewalDate = renewalDate.toISOString();
      data.renewalFee = paymentData.amount;
      const newUser = await db.user.create({ data });
      const newPayment = await db.payment.create({
        data: {
          userId: newUser.id,
          accountNo: paymentData.bkashNumber,
          amount: paymentData.amount,
          paymentDetails: "Registration fee",
          paymentMethod: "Bkash",
          transactionId: paymentData?.transactionNumber,
          registrationFee: true,
        },
      });
      return { user: newUser, payment: newPayment };
    });
    return successResponse("User registered successfully.", 200, res);
  } catch (err) {
    return errorResponse("Failed to register user", 500);
  }
};

export const loginAction = async (data) => {
  try {
    const res = await prisma.user.findFirst({ where: { email: data?.email } });
    if (res) {
      const matched = await bcrypt?.compare(data?.password, res?.password);
      if (matched) {
        const {
          password,
          department,
          session,
          semester,
          registrationNo,
          ...payload
        } = res;
        const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TOKEN_EXPIRED,
        });
        const refreshToken = await jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED,
        });

        await prisma.session.upsert({
          where: { userId: res.id },
          create: { accessToken, refreshToken, userId: res.id },
          update: { accessToken, refreshToken, userId: res.id },
        });
        delete res.password;
        return successResponse("Login successful.", 200, {
          ...res,
          token: {
            accessToken,
            refreshToken,
          },
        });
      }
      throw new Error("Invalid credentials!");
    }
    throw new Error("Invalid credentials!");
  } catch (err) {
    return errorResponse(err.message, 500);
  }
};

export const refreshTokenAction = async (data) => {
  try {
    const res = await prisma.session.findFirst({
      where: { refreshToken: data.refreshToken },
    });
    if (!res) {
      throw new Error("Invalid refresh token!");
    }
    const { lat, exp, iat, ...payload } = await jwt.verify(
      data.refreshToken,
      process.env.JWT_SECRET
    );

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRED,
    });
    const refreshToken = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED,
    });
    await prisma.session.update({
      where: { id: res.id },
      data: { accessToken, refreshToken },
    });
    return successResponse("Token refreshed successfully.", 200, {
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return null;
  }
};
