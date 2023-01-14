import { db } from "../config/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function addComment(text, feedId, currentUserId) {
  await addDoc(collection(db, "feeds", feedId, "comments"), {
    text,
    user: await doc(db, "users", currentUserId),
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
  });
}

export async function getCommentsByFeedId(feedId) {
  const commentsSnap = await getDocs(
    collection(db, "feeds", feedId, "comments")
  );

  return await Promise.all(
    commentsSnap.docs.map(async (docSnap) => {
      const userSnap = await getDoc(docSnap?.data()?.user);

      return {
        id: docSnap?.id,
        text: docSnap?.data()?.text,
        createAt: docSnap?.data()?.craetedAt,
        updatedAt: docSnap?.data()?.updatedAt,
        user: await userSnap?.data(),
      };
    })
  );
}
