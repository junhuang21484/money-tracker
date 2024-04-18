'use server';

import { storage } from "@/app/lib/data/firebase";
import { updateProfilePicture } from "@/app/lib/data/user";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { revalidatePath } from "next/cache";
import { v4 } from "uuid";

export default async function uploadProfileImage(userId, imageData) {
    console.log(imageData)
  try {
    if (!imageData) {
      return { success: false, msg: "Please select an image." };
    }

    const imageRef = ref(storage, `images/${imageData.name + v4()}`);

    const uploadTask = await uploadBytes(imageRef, await fetch(imageData.content).then(res => res.blob()));
    const downloadURL = await getDownloadURL(imageRef);
    console.log("DOWNLOAD", downloadURL)

    await updateProfilePicture(userId, downloadURL);
    revalidatePath('/dashboard/profile')
    return { success: true, msg: "Image updated successfully" };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, msg: "Failed to upload image. Please try again." };
  }
}