import * as z from "zod";
import { string } from "zod";

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
