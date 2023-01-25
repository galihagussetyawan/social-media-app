import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

//GET NOTIFICATIONS
export async function getNotificationsByUserId(userId) {
  const notificationsSnap = await getDocs(
    query(
      collection(db, "users", userId, "notifications"),
      where("isRead", "==", false)
    )
  );

  return await Promise.all(
    notificationsSnap?.docs?.map(async (docSnap) => {
      const userSnap = await getDoc(doc(db, "users", docSnap?.data()?.from));

      return {
        id: docSnap?.id,
        type: docSnap?.data()?.type,
        from: {
          id: userSnap?.id,
          ...userSnap?.data(),
        },
        isRead: docSnap?.data()?.isRead,
        createdAt: userSnap?.data()?.createdAt,
      };
    })
  );
}

//POST NOTIFICATIONS
export async function followingNotification(toUserId, fromUserId) {
  await addDoc(collection(db, "users", toUserId, "notifications"), {
    type: "following",
    from: fromUserId,
    isRead: false,
    createdAt: Date.now().toString(),
  });
}

export async function requestFollowNotification(toUserId, fromUserId) {
  await addDoc(collection(db, "users", toUserId, "notifications"), {
    type: "request follow",
    from: fromUserId,
    isRead: false,
    createdAt: Date.now().toString(),
  });
}

export async function giveExpressionFeedNotification(
  toUserId,
  fromUserId,
  feedId
) {
  await addDoc(collection(db, "users", toUserId, "notifications"), {
    type: "expression",
    from: fromUserId,
    feedId: feedId,
    isRead: false,
    createdAt: Date.now().toString(),
  });
}

export async function readNotification(notificationId, currentUserId) {
  await updateDoc(
    doc(db, "users", currentUserId, "notifications", notificationId),
    {
      isRead: true,
    }
  );
}
