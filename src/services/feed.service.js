import { currentUser } from "../stores/auth.store";
import { currentGeolocation } from '../stores/geolocation.store';
import { GeoPoint } from "firebase/firestore";
import { addDoc, collection, doc, getCountFromServer, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from "../config/firebase";
import { getDistance } from 'geolib';
import { navigate } from "svelte-navigator";

let user, geolocation;

export async function postFeed(statusText) {

    currentUser.subscribe(value => user = value);
    currentGeolocation.subscribe(value => geolocation = value)

    if (user?.uid && geolocation) {
        addDoc(collection(db, 'feeds'), {
            text: statusText,
            userId: doc(db, 'users', user.uid),
            location: new GeoPoint(geolocation.latitude, geolocation.longitude),
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
        })
    }
}

export async function getFeeds() {
    const loadedFeeds = [];

    currentGeolocation.subscribe(async geoValue => {

        if (geoValue) {

            let lat = 0.0144927536231884;
            let lon = 0.0181818181818182;
            let distance = 10;

            let lowerLat = geoValue?.latitude - (lat * distance);
            let lowerLon = geoValue?.longitude - (lon * distance);

            let greaterLat = geoValue?.latitude + (lat * distance);
            let greaterLon = geoValue?.longitude + (lon * distance);

            let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
            let greaterGeopoint = new GeoPoint(greaterLat, greaterLon);

            const feedSnap = await getDocs(query(collection(db, 'feeds'), where('location', '>=', lesserGeopoint), where('location', '<=', greaterGeopoint)));
            feedSnap.docs.forEach(snap => console.log(snap.data()))
        }
    })

    return loadedFeeds;
}

export function addReactionFeed(feedId, symbol) {

    currentUser.subscribe(value => {
        if (!value) {
            navigate('/register')
        } else {

            addDoc(collection(db, 'feeds', feedId, 'reactions'), {
                userId: value.uid,
                feedId: feedId,
                symbol: symbol,
                createdAt: Date.now().toString()
            })
        }
    })

}

export async function getFeedReactionByFeedId(feedId) {

    const reactionTotal = await getCountFromServer(collection(db, 'feeds', feedId, 'reactions')).then(snap => snap.data());
    const reactionFeedUserList = await getDocs(collection(db, 'feeds', feedId, 'reactions')).then(snap => {
        return snap.docs.map(data => data.data());
    })

    return {
        ...reactionTotal,
        userList: reactionFeedUserList,
    }
}