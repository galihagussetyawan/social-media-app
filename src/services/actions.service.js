import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export async function follow(followUserId, followUserIsPrivate, currentUserId) {
  await setDoc(doc(db, "users", followUserId, "followers", currentUserId), {
    user: doc(db, "users", currentUserId),
    isConfirm: !followUserIsPrivate,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  });

  await setDoc(doc(db, "users", currentUserId, "following", followUserId), {
    user: doc(db, "users", followUserId),
    isConfirm: !followUserIsPrivate,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  });
}

export async function unfollow(followUserId, currentUserId) {
  //delete following user on current user
  await deleteDoc(doc(db, "users", currentUserId, "following", followUserId));
  //delete followers current user on user
  await deleteDoc(doc(db, "users", followUserId, "followers", currentUserId));
}

export async function checkIsFollowed(followUserId, currentUserId) {
  const followingSnap = await getDocs(
    query(
      collection(db, "users", currentUserId, "following"),
      where("user", "==", doc(db, "users", followUserId))
    )
  );

  return followingSnap.docs.map((snapshot) => snapshot.data()).length > 0
    ? true
    : false;
}
