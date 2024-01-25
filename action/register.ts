"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/data/token";
import { sendVerificationEmail } from "@/lib/mail";

export async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFeilds = RegisterSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = validatedFeilds.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  //TODO: sent verification token email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
}
