import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  updateDoc,
  getCountFromServer,
} from "firebase/firestore";

export async function addComment(text, feedId, currentUserId) {
  await addDoc(collection(db, "feeds", feedId, "comments"), {
    reply: null,
    text,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    user: await doc(db, "users", currentUserId),
  });
}

export async function getCountCommentsByFeedId(feedId) {
  const count = await getCountFromServer(
    collection(db, "feeds", feedId, "comments")
  );
  return count?.data()?.count;
}

export async function getCommentsByFeedId(feedId) {
  const commentsSnap = await getDocs(
    query(
      collection(db, "feeds", feedId, "comments"),
      where("reply", "==", null)
    )
  );

  return await Promise.all(
    commentsSnap.docs.map(async (docSnap) => {
      const userSnap = await getDoc(docSnap?.data()?.user);

      return {
        id: docSnap?.id,
        text: docSnap?.data()?.text,
        children: docSnap.data()?.children,
        createdAt: docSnap?.data()?.createdAt,
        updatedAt: docSnap?.data()?.updatedAt,
        user: await userSnap?.data(),
      };
    })
  );
}

export async function getCommentByCommentId(feedId, commentId) {
  const commentSnap = await getDoc(
    doc(db, "feeds", feedId, "comments", commentId)
  );

  const userSnap = await getDoc(commentSnap?.data()?.user);

  return await Promise.resolve({
    id: commentSnap?.id,
    user: userSnap?.data(),
  });
}

export async function replyComment(
  text,
  feedId,
  currentUserId,
  commentId,
  rootCommentId
) {
  await addDoc(collection(db, "feeds", feedId, "comments"), {
    reply: commentId,
    text,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    user: doc(db, "users", currentUserId),
  }).then(async (res) => {
    await updateDoc(doc(db, "feeds", feedId, "comments", rootCommentId), {
      children: arrayUnion(res?.id),
    });
  });
  console.log("send finish");
}

export async function getChildrenComments(feedId, commentIdArray) {
  return await Promise.all(
    commentIdArray?.map(async (data) => {
      const commentSnap = await getDoc(
        doc(db, "feeds", feedId, "comments", data)
      );

      const userSnap = await getDoc(commentSnap?.data()?.user);

      return {
        id: commentSnap?.id,
        // reply: commentSnap.data().reply,
        reply: await getCommentByCommentId(feedId, commentSnap?.data()?.reply),
        text: commentSnap?.data()?.text,
        children: commentSnap.data()?.children,
        createdAt: commentSnap?.data()?.createdAt,
        updatedAt: commentSnap?.data()?.updatedAt,
        user: userSnap?.data(),
      };
    })
  );
}
