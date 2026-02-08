# Frontend File Upload Guide

This guide explains how to build a React component that allows users to upload an image to Cloudflare R2 using a presigned URL.

## 1. Prerequisites

Ensure you have your backend setup complete:

- `lib/r2.ts` for S3 client.
- `app/actions/upload.ts` for the server action.
- Environment variables set.

## 2. Key Concepts

The upload process happens in two steps:

1.  **Get a Presigned URL**: The frontend asks the server for a temporary URL to upload the file. This is done via `app/actions/upload.ts`.
2.  **Upload Directly**: The frontend uses `fetch` to PUT the file content directly to that URL. This bypasses your server for the heavy lifting.

## 3. Implementation Steps

### A. State Management

You need state to track:

- The selected `file`.
- The `uploading` status (for loading spinners).
- The `imageUrl` once the upload is successful (to save to your database).

### B. The Code

Here is a complete example of a form component that handles file uploads. You can adapt this into your `app/page.tsx` or a new `components/JobForm.tsx`.

```tsx
"use client";

import { useState } from "react";
import { getUploadUrl } from "@/app/actions/upload";

export default function JobForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first");
      return;
    }

    setUploading(true);

    try {
      // 1. Get the presigned URL
      const signedUrl = await getUploadUrl(file.name, file.type);

      // 2. Upload the file directly to R2
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      // 3. Construct the public URL
      // The signedUrl is temporary and long. We want the clean public URL.
      // Format: https://<YOUR_PUBLIC_R2_DOMAIN>/<FILE_NAME>
      // Make sure R2_PUBLIC_URL is set in your .env (e.g., https://pub-xxx.r2.dev)
      const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${file.name}`;

      setImageUrl(publicUrl);
      console.log("File uploaded successfully:", publicUrl);

      // 4. Save the rest of your form data (title, company, etc.) to the database
      // along with the imageUrl.
      // await createJob({
      //   title: ...,
      //   imageUrl: publicUrl
      // });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border p-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Company Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Submit Job"}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600">Upload Complete!</p>
          <img
            src={imageUrl}
            alt="Uploaded logo"
            className="mt-2 h-20 w-auto object-contain"
          />
        </div>
      )}
    </form>
  );
}
```

## 4. Environment Variables Note

For the frontend to access the public domain, you should prefix the environment variable with `NEXT_PUBLIC_`.

Update your `.env`:

```
NEXT_PUBLIC_R2_PUBLIC_URL=https://<your-custom-domain-or-r2-dev-subdomain>
```

Everything else (`R2_ACCESS_KEY_ID`, etc.) should remain secret (no `NEXT_PUBLIC_` prefix).
