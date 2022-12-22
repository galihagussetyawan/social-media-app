import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { writable } from "svelte/store";
import { auth, db } from "../config/firebase";

export const currentUser = writable();

currentUser.subscribe((valueUser) => {
  if (!valueUser) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        currentUser.set({ ...user, username: userSnap?.data().username });
      } else {
        currentUser.set();
      }
    });
  }
});
