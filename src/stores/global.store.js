import { writable } from "svelte/store";

export const isShowModal = writable(false);
export const pathname = writable('Discover');