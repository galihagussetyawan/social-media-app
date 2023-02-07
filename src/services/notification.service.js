import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
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
        fromUserData: {
          ...userSnap?.data(),
        },
        ...docSnap?.data(),
      };
    })
  );
}

export async function getCountNotification(currentUserId) {
  const snapCount = await getCountFromServer(
    query(
      collection(db, "users", currentUserId, "notifications"),
      where("isRead", "==", false)
    )
  );

  return snapCount?.data()?.count;
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
  feedId,
  symbol
) {
  await addDoc(collection(db, "users", toUserId, "notifications"), {
    type: "expression",
    from: fromUserId,
    feedId: feedId,
    symbol: symbol,
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
