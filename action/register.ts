"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function Register(values: z.infer<typeof RegisterSchema>) {
  const validatedFeilds = RegisterSchema.safeParse(values);

  if (!validatedFeilds.success) {
    return { error: "Invalid Fields" };
  }

  const { name, email, password } = validatedFeilds.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

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

  //TODO: sent verification token email

  return { success: "User created!" };
}
