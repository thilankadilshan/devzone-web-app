import { S3Client } from "@aws-sdk/client-s3";

// Create an S3 client pointing to Cloudflare R2
export const s3Client = new S3Client({
  region: "auto", // Cloudflare R2 requires 'auto' as the region
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});
