import { db } from "@/lib/db";

export async function getAccountByUserId(userId: string) {
  try {
    const account = db.account.findFirst({
      where: {
        id: userId,
      },
    });

    return account;
  } catch (error) {
    return null;
  }
}
