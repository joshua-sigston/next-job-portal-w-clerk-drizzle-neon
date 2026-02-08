// app/actions/upload.ts
"use server";

import { getPresignedUploadUrl } from "@/lib/r2"; // or "@/api/r2"

export async function getUploadUrl(fileName: string, contentType: string) {
  // You can add authentication checks here
  // const session = await auth();
  // if (!session) throw new Error("Unauthorized");

  return await getPresignedUploadUrl(fileName, contentType);
}
