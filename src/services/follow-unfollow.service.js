import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  followingNotification,
  requestFollowNotification,
} from "./notification.service";

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

  if (followUserIsPrivate) {
    requestFollowNotification(followUserId, currentUserId);
  } else {
    followingNotification(followUserId, currentUserId);
  }
}

export async function unfollow(followUserId, currentUserId) {
  //delete following user on current user
  await deleteDoc(doc(db, "users", currentUserId, "following", followUserId));
  //delete followers current user on user
  await deleteDoc(doc(db, "users", followUserId, "followers", currentUserId));
}

export async function acceptRequestFollowing(followUserId, currentUserId) {
  await updateDoc(doc(db, "users", currentUserId, "followers", followUserId), {
    isConfirm: true,
  });
  await updateDoc(doc(db, "users", followUserId, "following", currentUserId), {
    isConfirm: true,
  });
}

export async function checkIsFollowed(followUserId, currentUserId) {
  const followingSnap = await getDocs(
    query(
      collection(db, "users", currentUserId, "following"),
      where("user", "==", doc(db, "users", followUserId))
    )
  );

  return followingSnap?.docs?.map((snapshot) => snapshot.data())?.length > 0;
}

export async function checkIsConfirm(followUserId, currentUserId) {
  const followingSnap = await getDocs(
    query(
      collection(db, "users", currentUserId, "following"),
      where("user", "==", doc(db, "users", followUserId))
    )
  );

  const followingList = followingSnap?.docs?.map((snapshot) =>
    snapshot?.data()
  );

  if (followingList?.length > 0) {
    return followingList[0]?.isConfirm;
  } else {
    return false;
  }
}

export async function getFollowingCount(userId) {
  return await (
    await getCountFromServer(
      query(
        collection(db, "users", userId, "following"),
        where("isConfirm", "==", true)
      )
    )
  ).data()?.count;
}

export async function getFollowersCount(userId) {
  return await (
    await getCountFromServer(
      query(
        collection(db, "users", userId, "followers"),
        where("isConfirm", "==", true)
      )
    )
  ).data()?.count;
}

export async function getFollowingByUserId(userId) {
  const followingSnap = await getDocs(
    query(
      collection(db, "users", userId, "following"),
      where("isConfirm", "==", true)
    )
  );

  return await Promise.all(
    followingSnap.docs.map(async (docSnap) => {
      const userSnap = await getDoc(docSnap?.data()?.user);

      return {
        id: docSnap?.id,
        isConfirm: docSnap.data()?.isConfirm,
        isFollowed: true,
        createdAt: docSnap.data()?.createdAt,
        updatedAt: docSnap.data()?.updatedAt,
        user: {
          id: await userSnap?.id,
          ...(await userSnap?.data()),
        },
      };
    })
  );
}

export async function getFollowersByUserId(userId) {
  const followersSnap = await getDocs(
    query(
      collection(db, "users", userId, "followers"),
      where("isConfirm", "==", true)
    )
  );

  return await Promise.all(
    followersSnap.docs.map(async (docSnap) => {
      const userSnap = await getDoc(docSnap?.data()?.user);

      return {
        id: docSnap?.id,
        isConfirm: docSnap.data()?.isConfirm,
        isFollowed: await checkIsFollowed(userSnap?.id, userId),
        createdAt: docSnap?.data()?.createdAt,
        updatedAt: docSnap?.data()?.updatedAt,
        user: {
          id: await userSnap?.id,
          ...(await userSnap?.data()),
        },
      };
    })
  );
}
