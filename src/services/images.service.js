import ImageKit from "imagekit";
// @ts-ignore
import imageCompression from "browser-image-compression";

export const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_URL_ENDPOINT,
});

export async function browseImages() {}

export async function imageCompress(file) {
  const options = {
    maxSizeMB: 0.5,
    // maxWidthOrHeight: 1024,
    useWebWorker: true,
    onProgress: (p) => console.log(p),
    alwaysKeepResolution: true,
  };

  try {
    // @ts-ignore
    const imageCompressed = await imageCompression(file, options);
    return imageCompressed;
  } catch (error) {}
}

export async function uploadImage(file) {
  await imagekit
    .upload({
      file: file,
      fileName: file?.name,
      tags: ["tag"],
      folder: "/feeds",
    })
    .then((result) => console.log(result))
    .then((error) => console.log(error));
}
