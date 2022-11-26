<script defer>
  import { onMount } from "svelte";
  import FeedCard from "./feed/feed-card.component.svelte";
  import { currentGeolocation } from "../stores/geolocation.store";
  import { feedsDatas } from "../stores/feed.store";
  import {
    collection,
    GeoPoint,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "../config/firebase";

  onMount(async () => {
    currentGeolocation.subscribe(async (geoValue) => {
      if (geoValue) {
        let lat = 0.0144927536231884;
        let lon = 0.0181818181818182;
        let distance = 10;

        let lowerLat = geoValue?.latitude - lat * distance;
        let lowerLon = geoValue?.longitude - lon * distance;

        let greaterLat = geoValue?.latitude + lat * distance;
        let greaterLon = geoValue?.longitude + lon * distance;

        let lesserGeopoint = new GeoPoint(lowerLat, lowerLon);
        let greaterGeopoint = new GeoPoint(greaterLat, greaterLon);

        if (!$feedsDatas) {
          const feedSnap = await getDocs(
            query(
              collection(db, "feeds"),
              where("location", ">=", lesserGeopoint),
              where("location", "<=", greaterGeopoint)
            )
          );
          const result = await feedSnap.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));

          feedsDatas.set(result);
        }
      }
    });
  });
</script>

<div>
  {#if !$feedsDatas}
    <span>Loading...</span>
  {:else}
    {#each $feedsDatas as feed}
      <FeedCard data={feed} />
    {/each}
  {/if}
</div>
