import { writable } from "svelte/store";

export const isShowModal = writable(false);
export const pathname = writable("Discover");
export const isUpdate = writable(false);
export const tabProfile = writable("posts");
export const cameraState = writable({
  isShowCamera: false,
  isPermission: false,
});
export const images = writable();
export const notificationCount = writable();
export const notificationList = writable();
