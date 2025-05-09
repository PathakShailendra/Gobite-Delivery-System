import { Resend } from "resend";

if (!process.env.RESEND_API) {
  console.log("Please specify API key to send requests");
}
const resend = new Resend(process.env.RESEND_API);
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "GoBite <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
  } catch (error) {
    if (error) {
      return console.log({ error });
    }
  }
  
};


export default sendEmail;