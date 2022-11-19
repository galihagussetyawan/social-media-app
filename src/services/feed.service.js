import { currentUser } from "../stores/auth.store";
import { currentGeolocation } from '../stores/geolocation.store';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from "../config/firebase";
import { getDistance } from 'geolib';

let user, geolocation;

export async function postFeed(statusText) {

    currentUser.subscribe(value => user = value);
    currentGeolocation.subscribe(value => geolocation = value)

    if (user?.uid && geolocation) {
        addDoc(collection(db, 'feeds'), {
            text: statusText,
            userId: doc(db, 'users/' + user.uid),
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
        })
    }
}

export async function getFeeds() {
    const loadedFeeds = [];
    currentGeolocation?.subscribe(value => geolocation = value);

    const feedSnap = await getDocs(query(collection(db, 'feeds'), orderBy('createdAt', 'desc')));

    feedSnap?.docs?.map(snap => {

        if (snap.exists && geolocation) {
            if (
                getDistance(
                    {
                        latitude: geolocation.latitude,
                        longitude: geolocation.longitude
                    },
                    {
                        latitude: snap.data()['latitude'],
                        longitude: snap.data()['longitude']
                    }
                ) <= 10000
            ) {
                loadedFeeds.push(snap.data());
            }
        }
    })

    return loadedFeeds;
}