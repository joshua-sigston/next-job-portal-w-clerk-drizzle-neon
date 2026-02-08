# Cloudflare R2 Integration Guide

This guide explains how to integrate Cloudflare R2 storage into your Next.js application using the AWS SDK for JavaScript. R2 is S3-compatible, so we use the `@aws-sdk/client-s3` package.

## 1. Prerequisites (Packages)

Ensure you have the following packages installed:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

## 2. Initialize the S3 Client

You need to create an instance of `S3Client` to communicate with R2. This usually lives in a utility file (e.g., `lib/r2.ts` or `utils/storage.ts`) so it can be reused.

### Key Concepts

- **Endpoint**: The URL for your specific R2 account. It must be in the format `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.
  - You can find your Account ID in the Cloudflare dashboard on the right side of the R2 Overview page.
- **Region**: For R2, this is always `"auto"`.
- **Credentials**: Your Access Key ID and Secret Access Key.

### Code Example

```typescript
import { S3Client } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID!,
    secretAccessKey: R2_SECRET_ACCESS_KEY!,
  },
});
```

## 3. Generate a Presigned URL for Upload

A presigned URL is a temporary URL that allows a client (your frontend) to upload a file directly to the storage bucket without passing the file through your server. This is efficient and secure.

### Key Concepts

- **PutObjectCommand**: Represents the action of putting (uploading) an object.
- **getSignedUrl**: A helper function from `@aws-sdk/s3-request-presigner` that creates the signed URL.
- **Bucket**: The name of your R2 bucket.
- **Key**: The unique filename (path) for the object in the bucket.
- **ContentType**: The MIME type of the file (e.g., `image/jpeg`). This ensures the file is served correctly.

### Code Example

```typescript
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import s3Client from step 2

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

export async function getPresignedUploadUrl(
  fileName: string,
  contentType: string,
) {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
  });

  // Generate URL valid for 1 hour (3600 seconds)
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}
```

## 4. Official Documentation

For further reading and more advanced configurations, refer to the official documentation:

- **Cloudflare R2 - S3 Compatibility**:
  [https://developers.cloudflare.com/r2/api/s3/tokens/](https://developers.cloudflare.com/r2/api/s3/tokens/)
  This page explains how to generate tokens and format the endpoint URL.

- **AWS SDK v3 - S3 Client**:
  [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)
  Detailed API reference for the S3 client.

- **AWS SDK v3 - Presigned URLs**:
  [https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/\_aws_sdk_s3_request_presigner.html](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_s3_request_presigner.html)
  Instructions on using `getSignedUrl`.

## 5. Recommended File Structure

To keep your project organized, we recommend separating the S3 client initialization from your server actions or API routes.

### Option A: Server Actions (Recommended for App Router)

1.  **`lib/r2.ts`** (or `api/r2.ts` as you have it):
    - Contains the `s3Client` initialization and the `getPresignedUploadUrl` helper function.
    - This keeps the configuration logic in one place.

2.  **`app/actions/upload.ts`**:
    - Contains a server action that calls `getPresignedUploadUrl`.
    - This is the function your frontend component will call.

```typescript
// app/actions/upload.ts
"use server";

import { getPresignedUploadUrl } from "@/lib/r2"; // or "@/api/r2"

export async function getUploadUrl(fileName: string, contentType: string) {
  // You can add authentication checks here
  // const session = await auth();
  // if (!session) throw new Error("Unauthorized");

  return await getPresignedUploadUrl(fileName, contentType);
}
```

### Option B: API Routes

1.  **`lib/r2.ts`**: Same as above.

2.  **`app/api/upload/route.ts`**:
    - An API route handler that responds to GET or POST requests.

```typescript
// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/r2";

export async function POST(request: Request) {
  const { fileName, contentType } = await request.json();
  const url = await getPresignedUploadUrl(fileName, contentType);
  return NextResponse.json({ url });
}
```
