"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export async function Reset(values: z.infer<typeof ResetSchema>) {
  const validatedFeilds = ResetSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFeilds.data;
  const existingEmail = await getUserByEmail(email);

  if (!existingEmail) return { error: "Email not found!" };

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "reset email sent!" };
}
