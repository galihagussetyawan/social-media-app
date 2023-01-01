import { db } from "../config/firebase";
import ImageKit from "imagekit";
// @ts-ignore
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_URL_ENDPOINT,
});

export async function browseImages() {}

export async function uploadImage(file, folderName) {
  return await imagekit
    .upload({
      file: file,
      fileName: file?.name,
      tags: ["tag"],
      folder: "/feeds/" + folderName,
    })
    .then((res) => res);
}

export async function postImage(feedId, imageId, imageResult) {
  return await setDoc(doc(db, "feeds", feedId, "images", imageId), {
    ...imageResult,
  });
}

export async function getAllImages(feedId) {
  return await (
    await getDocs(collection(db, "feeds", feedId, "images"))
  ).docs.map((docSnap) => {
    return {
      id: docSnap?.id,
      ...docSnap.data(),
    };
  });
}
