import { currentUser } from "../stores/auth.store";
import { currentGeolocation } from '../stores/geolocation.store';
import { addDoc, collection, } from 'firebase/firestore'
import { db } from "../config/firebase";

let user, geolocation;

export async function postFeed(statusText) {

    currentUser.subscribe(value => user = value);
    currentGeolocation.subscribe(value => geolocation = value)

    if (user?.uid && geolocation) {
        addDoc(collection(db, 'feeds'), {
            text: statusText,
            userId: 'users/' + user.uid,
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
        })
    }
}