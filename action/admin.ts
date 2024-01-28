"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function Admin() {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }
  return { error: "Forbidden Server Action!" };
}
