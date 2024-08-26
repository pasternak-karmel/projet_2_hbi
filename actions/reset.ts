"use server";

import * as z from "zod";
import "dotenv/config";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { error } from "console";

// export const reset = async (values: z.infer<typeof ResetSchema>) => {
//   const validatedFields = ResetSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid emaiL!" };
//   }

//   const { email } = validatedFields.data;

//   const existingUser = await getUserByEmail(email);

//   if (!existingUser) {
//     return { error: "Email not found!" };
//   }

//   const passwordResetToken = await generatePasswordResetToken(email);
//   await sendPasswordResetEmail(
//     passwordResetToken.email,
//     passwordResetToken.token,
//   );

//   return { success: "Reset email sent!" };
// }

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_API_KEY as string,
});

const sentFrom = new Sender("karmelavenon@gmail.com", "Karmel");

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  if (!existingUser.name) {
    return { error: "User mail not found" };
  }

  const recipients = [new Recipient(email, existingUser.name)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Reset password from project HBI")
    .setHtml("<strong>Karmel sent this email</strong>")
    .setText("C'est le content du mail ici");

  await mailerSend.email.send(emailParams);
  return { success: "Reset email sent!" };
};
