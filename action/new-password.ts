"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken,
} from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token: string
) {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFeilds = NewPasswordSchema.safeParse(values);

  if (!validatedFeilds.success) return { error: "Invalid fields!" };

  const { password } = validatedFeilds.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email doesn't exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated!" };
}
