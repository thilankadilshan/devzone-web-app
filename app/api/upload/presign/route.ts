import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3-client";

export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();
    
    // Generate a unique filename using Date.now()
    // Sanitize filename to avoid weird characters in S3 keys
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    const key = `blogs/${uniqueFilename}`;
    
    const command = new PutObjectCommand({
      Bucket: "devzone-portfolio", // Ensure this matches their bucket name
      Key: key,
      ContentType: contentType,
    });

    // Generate a temporary upload URL valid for 60 seconds
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    
    // The public URL where the image will be accessible after upload
    const rawDevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL || "";
    const cleanDevUrl = rawDevUrl.replace(/^https?:\/\//, '');
    const publicUrl = `https://${cleanDevUrl}/${key}`;

    return NextResponse.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("Presign error:", error);
    return NextResponse.json({ error: "Failed to presign URL" }, { status: 500 });
  }
}
