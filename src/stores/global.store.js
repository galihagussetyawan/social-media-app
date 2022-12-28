import { writable } from "svelte/store";

export const isShowModal = writable(false);
export const pathname = writable("Discover");
export const isUpdate = writable(false);
export const tabProfile = writable("posts");
