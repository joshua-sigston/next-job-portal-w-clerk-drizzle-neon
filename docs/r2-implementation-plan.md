# Cloudflare R2 Integration Plan

## Goal Description

Integrate Cloudflare R2 to enable image uploads for job postings. This involves setting up R2 in the Cloudflare dashboard and configuring the Next.js project to handle uploads.

## Prerequisites (Cloudflare Dashboard Setup)

Before implementing the code, follow these steps to set up R2:

1.  **Create a Bucket**:
    - Log in to the Cloudflare dashboard.
    - Navigate to **R2** > **Overview**.
    - Click **Create bucket**.
    - Name your bucket (e.g., `job-portal-images`).
    - Click **Create bucket**.

2.  **Allow Public Access**:
    - Go to **Settings** within your bucket.
    - Under **Public Access**, check **Allow Public Read Access** (if you want the images to be publicly viewable via a custom domain or R2.dev subdomain).
    - Or configure a custom domain (recommended for production).

3.  **Create API Tokens**:
    - Go to **R2** > **Overview**.
    - Click **Manage R2 API Tokens** in the right sidebar.
    - Click **Create API Token**.
    - Name the token (e.g., `next-job-portal`).
    - Under **Permissions**, select **Object Read & Write**.
    - Select **Specific bucket** and choose your bucket (`job-portal-images`).
    - Click **Create API Token**.
    - **IMPORTANT**: Copy the **Access Key ID**, **Secret Access Key**, and **Endpoint** (specifically, the S3 API endpoint URL)..

## User Review Required

> [!IMPORTANT]
> You will need to add the following environment variables to your `.env` file after generating the API tokens:
>
> - `R2_ACCOUNT_ID`
> - `R2_ACCESS_KEY_ID`
> - `R2_SECRET_ACCESS_KEY`
> - `R2_BUCKET_NAME`
> - `R2_PUBLIC_URL` (the custom domain or R2.dev subdomain for viewing images)

## Proposed Changes

### Dependencies

- Install `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner`

### Database

#### [MODIFY] [schema.ts](file:///Users/joshsigston/Desktop/next-job-portal-w.-neon-drizzle-clerk-cloudflare/lib/schema.ts)

- Add `imageUrl` column to `jobsTable`.

### Backend (Server Actions/API)

#### [NEW] [r2.ts](file:///Users/joshsigston/Desktop/next-job-portal-w.-neon-drizzle-clerk-cloudflare/lib/r2.ts)

- Initialize S3 client for R2.
- Function to generate a presigned URL for upload.

#### [NEW] [actions/upload.ts](file:///Users/joshsigston/Desktop/next-job-portal-w.-neon-drizzle-clerk-cloudflare/app/actions/upload.ts)

- Server action (`getPresignedUrl`) that calls the R2 helper.

### Frontend

#### [MODIFY] [page.tsx](file:///Users/joshsigston/Desktop/next-job-portal-w.-neon-drizzle-clerk-cloudflare/app/page.tsx) or create a new component `JobForm`

- Add file input for image upload.
- Client-side logic to:
  1.  Call server action to get presigned URL.
  2.  Upload file directly to R2 using the presigned URL via `fetch`.
  3.  Save the resulting image URL to the job entry in the database.

## Verification Plan

### Manual Verification

1.  Set up environment variables.
2.  Use the form to upload an image.
3.  Check the database to see if `imageUrl` is populated.
4.  Check the Cloudflare dashboard to verify the image exists in the bucket.
5.  Attempt to view the image via the public URL.
