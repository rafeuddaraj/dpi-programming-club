"use server";

import prisma from "@/lib/prisma";
import { errorResponse, successResponse } from "@/utils/req-res";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../auth";
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
    const res = await prisma.user.findFirst({
      where: { user: { email: data?.email } },
      include: { user: true },
    });
    if (res) {
      const matched = await bcrypt?.compare(data?.password, res?.password);
      if (matched) {
        const { password, user, ...rest } = res;
        const payload = { ...user, ...rest };
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
          ...payload,
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
    console.log(err.meta);

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

export const generateOTP = async (email, roll) => {
  try {
    const found = await prisma.registeredUser.findUnique({
      where: { email, rollNo: roll },
      include: { user: true },
    });
    if (!found?.user) {
      throw new Error("There is no user registered");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiredMinute = parseInt(process.env.OTP_EXPIRED_MINUTE) || 5;
    const expired = new Date(Date.now() + expiredMinute * 60 * 1000);

    await prisma.user.update({
      where: { registeredUserId: found?.id, user: { isManagement: false } },
      data: { otp, expiredOtp: expired },
    });
    return successResponse("OTP sent successfully.", 200, {
      otp,
      expiredMinute,
      found,
    });
  } catch (error) {
    console.log(error);

    return errorResponse(error.message);
  }
};
export const verifyOtp = async function verifyOtp(otp) {
  try {
    otp = parseInt(otp);

    let found =
      (
        await prisma.user.findMany({
          where: { otp },
        })
      )[0] || null;

    if (!found) {
      throw new Error("Invalid OTP");
    }
    console.log({ found });

    if (found?.expiredOtp && found?.expiredOtp < new Date()) {
      throw new Error("OTP Expired");
    }

    await prisma.user.update({
      where: { id: found?.id },
      data: { otp: null, expiredOtp: null },
    });

    return successResponse("OTP verified successfully.", 200, found);
  } catch (error) {
    console.log(error);

    return errorResponse(error.message);
  }
};

export const changePassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return successResponse("Password changed successfully.", 200);
  } catch (error) {
    return errorResponse(error.message);
  }
};

export const generateOTPByCurrentUserPassword = async (password) => {
  try {
    const session = await auth();
    const user = session?.user || {};
    console.log(user);

    const found = await prisma.user.findUnique({
      where: { id: user?.id },
      include: { user: true },
    });
    if (!found) {
      throw new Error("There is no user registered");
    }
    const hashedPassword = await bcrypt.compare(password, found?.password);
    if (!hashedPassword) {
      throw new Error("Invalid password");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiredMinute = parseInt(process.env.OTP_EXPIRED_MINUTE) || 5;
    const expired = new Date(Date.now() + expiredMinute * 60 * 1000);
    await prisma.user.update({
      where: { id: found?.id, user: { isManagement: false } },
      data: { otp },
    });
    return successResponse("OTP sent successfully.", 200, {
      otp,
      expiredMinute: expired,
      found,
    });
  } catch (error) {
    console.log(error);
    return errorResponse(error.message);
  }
};

export const changePasswordByUser = async (password) => {
  try {
    const session = await auth();
    const user = session?.user || {};
    const resp = await prisma.user.update({
      where: { id: user?.id },
      data: { password: password },
    });
    return successResponse("Password changed successfully.", 200);
  } catch (err) {
    return errorResponse(err.message);
  }
};
