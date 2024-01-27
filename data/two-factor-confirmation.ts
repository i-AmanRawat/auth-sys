import { db } from "@/lib/db";

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findFirst({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
}
