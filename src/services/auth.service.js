import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { currentUser } from "../stores/auth.store";
import { addUser } from "./user.service";

export async function handleSignWithGoogleAccount() {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider)
    .then(async (result) => {
      await addUser(result);
    })
    .catch((error) => error);
}

export async function handleLogout() {
  await signOut(auth).then((res) => currentUser.set());
}
