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
import { getAllImages } from "./images.service";
import { getCountCommentsByFeedId } from "./comment.service";

let user, geolocation;

export async function postFeed(statusText) {
  currentUser.subscribe((value) => (user = value));
  currentGeolocation.subscribe((value) => (geolocation = value));

  if (user?.uid && geolocation) {
    return await addDoc(collection(db, "feeds"), {
      text: statusText,
      userId: doc(db, "users", user.uid),
      location: new GeoPoint(geolocation.latitude, geolocation.longitude),
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    }).then((docRef) => docRef.id);
  }
}

export async function getFeedById(feedId) {
  const feedSnap = await getDoc(doc(db, "feeds", feedId));
  const userSnap = await getDoc(await feedSnap.data().userId);

  return await Promise.resolve({
    id: feedSnap.id,
    ...feedSnap?.data(),
    user: userSnap?.data(),
    // @ts-ignore
    reaction: await checkIsReaction(feedSnap?.id),
    images: await getAllImages(feedSnap?.id),
    count: {
      reaction: await getCountReactionByFeedId(feedSnap?.id),
      comment: await getCountCommentsByFeedId(feedSnap?.id),
    },
  });
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
        user: {
          id: userSnap?.id,
          ...userSnap?.data(),
        },
        // @ts-ignore
        reaction: await checkIsReaction(snapshot?.id),
        images: await getAllImages(snapshot?.id),
        count: {
          reaction: await getCountReactionByFeedId(snapshot?.id),
          comment: await getCountCommentsByFeedId(snapshot?.id),
        },
      };
    })
  );
}

//CRUD REACTIONS
export async function addReactionFeed(feedId, userId, symbol) {
  return await addDoc(collection(db, "feeds", feedId, "reactions"), {
    userId,
    feedId,
    symbol,
    createdAt: Date.now().toString(),
  }).then((docRef) => docRef.id);
}

export async function updateReactionFeed(feedId, reactionId, symbol) {
  await updateDoc(doc(db, "feeds", feedId, "reactions", reactionId), {
    symbol: symbol,
  });
}

export async function deleteReactionfeed(feedId, reactionId) {
  await deleteDoc(doc(db, "feeds", feedId, "reactions", reactionId));
}

export async function getCountReactionByFeedId(feedId) {
  const snapCountReaction = await getCountFromServer(
    collection(db, "feeds", feedId, "reactions")
  );

  return snapCountReaction?.data()?.count;
}

export async function checkIsReaction(feedId) {
  let user;

  currentUser.subscribe((value) => (user = value));
  // @ts-ignore
  if (user?.uid) {
    const snapReaction = await getDocs(
      query(
        collection(db, "feeds", feedId, "reactions"),
        // @ts-ignore
        where("userId", "==", user?.uid)
      )
    );

    return {
      id: snapReaction.docs.map((docSnap) => docSnap?.id)[0],
      ...snapReaction.docs.map((docSnap) => docSnap.data())[0],
    };
  }

  return null;
}
