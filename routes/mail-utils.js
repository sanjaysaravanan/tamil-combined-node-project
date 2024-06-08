import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sanjaysaravanan00007@gmail.com",
    pass: process.env.MAIL_PASS || "",
  },
});

const mailOptions = {
  from: "sanjaysaravanan00007@gmail.com",
  to: ["sanjaysaravanan38gmail.com"],
  subject: "Email Testing",
  text: "Sending mails are so easy",
};

export { mailOptions, transporter };
