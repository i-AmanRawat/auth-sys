"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export async function newVerification(token: string) {
  const existingToken = getVerificationTokenByToken(token);

  if (!existingToken) return { error: "Token doesn't exist!" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email doesn't exist" };

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "Email verified! " };
}
