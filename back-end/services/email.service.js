import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server connecté avec gmail");
  }
});

export default async function sendEmail(receiverEmail, subject, html) {
  await transporter.sendMail({
    from: `"LocaMat" <${process.env.MAIL_USER}>`,
    to: receiverEmail,
    subject,
    html,
  });
}
