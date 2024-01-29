import { UserRole } from "@prisma/client";
import * as z from "zod";
import { string } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }), //not limiting the size of password while users logging in bcz there might be some old user who might be having some diff pass limit
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email({
    message: "Email is invalid",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    email: z.optional(z.string().email()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
