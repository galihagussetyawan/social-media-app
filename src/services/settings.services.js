import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function updatePrivateAccount(currentUserId, isPrivate) {
  await updateDoc(doc(db, "users", currentUserId), {
    isPrivate: isPrivate,
  });
}
