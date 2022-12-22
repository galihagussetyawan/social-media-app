import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { generateFromEmail } from "unique-username-generator";

export async function getUserByUsername(username) {
  const userSnap = await getDocs(
    query(collection(db, "users"), where("username", "==", username))
  );
  const userResult = userSnap.docs.find(
    (docSnap) => docSnap?.data()?.username === username
  );

  return {
    id: userResult.id,
    ...userResult.data(),
  };
}

export async function addUser(value) {
  await setDoc(doc(db, "users", value?.user?.id), {
    username: generateFromEmail(value?.user?.email),
    displayName: value?.user?.displayName,
    email: value?.user?.email,
    photoURL: value?.user?.photoURL,
    isPrivate: false,
  });
}
