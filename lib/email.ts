import nodemailer from "nodemailer";

const domain = process.env.NEXTAUTH_URL;

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: Number(process.env.NODEMAILER_PORT),
  secure: true,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.NODEMAILER_AUTH_USER,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await sendEmail(
    email,
    "邮箱确认",
    `<p>点击 <a href="${confirmLink}">此处</a> 确认邮件.</p>`
  );
};

export default sendEmail;
