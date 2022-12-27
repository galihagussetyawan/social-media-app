import { currentUser } from "../stores/auth.store";
import { currentGeolocation } from "../stores/geolocation.store";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  deleteDoc,
  GeoPoint,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

let user, geolocation;

export async function postFeed(statusText) {
  currentUser.subscribe((value) => (user = value));
  currentGeolocation.subscribe((value) => (geolocation = value));

  if (user?.uid && geolocation) {
    addDoc(collection(db, "feeds"), {
      text: statusText,
      userId: doc(db, "users", user.uid),
      location: new GeoPoint(geolocation.latitude, geolocation.longitude),
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    });
  }
}

export async function getFeedById(feedId) {
  const feedSnap = await getDoc(doc(db, "feeds", feedId));
  const userSnap = await getDoc(await feedSnap.data().userId);

  return {
    feed: await feedSnap.data(),
    user: await userSnap.data(),
    reactions: await getFeedReactionByFeedId(feedId, await userSnap.id),
  };
}

export async function getFeedsByUserId(userId) {
  const feedsSnap = await getDocs(
    query(
      collection(db, "feeds"),
      where("userId", "==", doc(db, "users", userId))
    )
  );
  const userSnap = await getDoc(doc(db, "users", userId));
  return await Promise.all(
    feedsSnap.docs.map(async (snapshot) => {
      return {
        id: snapshot?.id,
        ...snapshot?.data(),
        user: userSnap?.data(),
        reactions: await getFeedReactionByFeedId(snapshot?.id, userSnap?.id),
      };
    })
  );
}

export async function addReactionFeed(feedId, userId, symbol) {
  return await addDoc(collection(db, "feeds", feedId, "reactions"), {
    userId,
    feedId,
    symbol,
    createdAt: Date.now().toString(),
  }).then((docRef) => docRef.id);
}

export function updateReactionFeed(feedId, reactionId, symbol) {
  updateDoc(doc(db, "feeds", feedId, "reactions", reactionId), {
    symbol: symbol,
  });
}

export function deleteReactionfeed(feedId, reactionId) {
  deleteDoc(doc(db, "feeds", feedId, "reactions", reactionId));
}

export async function getFeedReactionByFeedId(feedId, userId) {
  const reactionTotal = await getCountFromServer(
    collection(db, "feeds", feedId, "reactions")
  ).then((snap) => snap.data());
  const reactionFeedUserList = await getDocs(
    collection(db, "feeds", feedId, "reactions")
  ).then((snap) => {
    return snap?.docs?.map((res) => ({ id: res.id, ...res.data() }));
  });
  // @ts-ignore
  const filterUserReactionOnFeed = reactionFeedUserList.find(
    // @ts-ignore
    (data) => data?.userId === userId
  );

  return {
    ...reactionTotal,
    userList: reactionFeedUserList,
    filterUserReaction: filterUserReactionOnFeed,
  };
}
