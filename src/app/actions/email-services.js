"use server";
import nodemailer from "nodemailer";
// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Store Gmail credentials in .env
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
});

// Server action to send an email
export async function sendEmail(
  { to = "rafeuddaraj2@gmail.com", subject = "Welcome to CST Club - DPI!" },
  template
) {
  try {
    const mailOptions = {
      from: `"CST Club - DPI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: template,
    };
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
}
