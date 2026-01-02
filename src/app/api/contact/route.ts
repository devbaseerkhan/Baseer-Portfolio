import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  framework?: string;
};

const receiverEmail = process.env.CONTACT_RECEIVER ?? "dev.baseerkhan@gmail.com";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

export async function POST(request: Request) {
  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const framework = payload.framework?.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message || !framework) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `New portfolio inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Framework: ${framework}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Framework:</strong> ${framework}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
