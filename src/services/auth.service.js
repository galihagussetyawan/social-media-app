import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { currentUser } from "../stores/auth.store";
import { addUser } from "./user.service";

export async function handleSignWithGoogleAccount() {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider)
    .then(async (result) => {
      const userSnap = await getDoc(doc(db, "users", result?.user?.uid));
      if (!userSnap.exists()) {
        await addUser(result);
      }
      window.location.reload();
    })
    .catch((error) => error);
}

export async function handleLogout() {
  await signOut(auth).then((res) => {
    currentUser.set();
    window.location.reload();
  });
}
