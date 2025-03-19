"use server";
import { del, list, put } from "@vercel/blob";

// ✅ CREATE (Upload File)
export async function uploadFile(formData) {
  const file = formData.get("file");
  if (!file) return { error: "No file uploaded" };

  try {
    const blob = await put(file.name, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return { url: blob.url };
  } catch (error) {
    return { error: error.message };
  }
}

// ✅ READ (Get List of Files)
export async function getFiles() {
  try {
    const blobs = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return blobs;
  } catch (error) {
    return { error: error.message };
  }
}

// ✅ DELETE (Delete File)
export async function deleteFile(fileUrl) {
  try {
    await del(fileUrl, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
