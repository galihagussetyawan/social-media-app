import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export async function getProfileByUserId(userId) {
  try {
    const profileSnap = await getDocs(
      query(
        collection(db, "users", userId, "profiles"),
        where("userId", "==", userId)
      )
    );

    return profileSnap.docs.map((docSnap) => {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    })[0];
  } catch (error) {}
}

export async function addProfile(userId, profession, city, bio) {
  await addDoc(collection(db, "users", userId, "profiles"), {
    userId,
    profession,
    city,
    bio,
  });
}

export async function updateProfile(id, userid, profession, city, bio) {
  await updateDoc(doc(db, "users", userid, "profiles", id), {
    profession,
    city,
    bio,
  });
}
