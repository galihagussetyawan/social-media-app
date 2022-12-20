import { db } from "../config/firebase";
import {  collection, getDocs, query, where } from "firebase/firestore";

export async function getUserByUsername(username) {
    const userSnap = await getDocs(query(collection(db, 'users'), where('username', '==', username)));
    const userResult = userSnap.docs.find(docSnap => docSnap?.data()?.username === username).data();

    return userResult;
}