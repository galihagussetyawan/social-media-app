import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function updatePrivateAccount(userId, isPrivate) {
  await setDoc(doc(db, "users", userId), {
    isPrivate: isPrivate,
  });
}
