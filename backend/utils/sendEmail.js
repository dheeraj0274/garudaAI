import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config({
  path:process.env.NODE_ENV==='production' ? './config/.env.production' : './config/.env.development'
});

const resend = new Resend(process.env.RESEND_API_KEY);
console.log('key',process.env.RESEND_API_KEY)

const sendEmail = async ({ to, subject, html }) => {
  try {
    const msg = await resend.emails.send({
      from: "noreply@mg.garuda.help",
      to,
      subject,
      html,
    });

    console.log("message", msg);
  } catch (error) {
    console.log("error", error);
  }
};

export default sendEmail;