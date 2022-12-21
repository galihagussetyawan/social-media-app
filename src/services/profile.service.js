import { db } from "../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { currentUser } from "../stores/auth.store";

export async function getProfileByUserId(userId) {

    try {
        const profileSnap = await getDocs(query(collection(db, 'users', userId, 'profile'), where('userId', '==', userId)));

        return profileSnap.docs.map(docSnap => docSnap.data());
    } catch (error) {

    }
}

export async function addProfile(bio, job, city) {
    currentUser.subscribe(async userValue => {
        if(userValue?.uid) {
            await addDoc(collection(db, 'users', userValue?.uid, 'profiles'), {
                bio, job, city
            })
        }
    })
}
