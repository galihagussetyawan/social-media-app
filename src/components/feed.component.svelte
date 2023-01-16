<script defer>
  import { onMount } from "svelte";
  import FeedCard from "./feed/feed-card.component.svelte";
  import { currentGeolocation } from "../stores/geolocation.store";
  import { feedsData } from "../stores/feed.store";
  import {
    collection,
    GeoPoint,
    getDoc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "../config/firebase";
  import FeedCardSkeleton from "./skeleton/feed-card-skeleton.component.svelte";
  import {
    checkIsReaction,
    getCountReactionByFeedId,
  } from "../services/feed.service";
  import { getAllImages } from "../services/images.service";
  import { getCountCommentsByFeedId } from "../services/comment.service";

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

        if (!$feedsData) {
          const feedSnap = await getDocs(
            query(
              collection(db, "feeds"),
              where("location", ">=", lesserGeopoint),
              where("location", "<=", greaterGeopoint)
            )
          );

          async function feedResult() {
            return await Promise.all(
              feedSnap.docs.map(async (docSnap) => {
                const userSnap = await getDoc(docSnap.data().userId);

                return {
                  id: docSnap.id,
                  ...docSnap.data(),
                  user: await userSnap.data(),
                  // reactions: await getFeedReactionByFeedId(docSnap?.id),
                  reaction: await checkIsReaction(docSnap?.id),
                  images: await getAllImages(docSnap?.id),
                  count: {
                    reaction: await getCountReactionByFeedId(docSnap?.id),
                    comment: await getCountCommentsByFeedId(docSnap?.id),
                  },
                };
              })
            );
          }

          feedsData.set(await feedResult());
        }
      }
    });
  });
</script>

<div class="space-y-5 mt-5">
  {#if !$feedsData}
    <div>
      <FeedCardSkeleton />
      <FeedCardSkeleton />
    </div>
  {:else}
    {#each $feedsData as feed}
      <FeedCard data={feed} />
    {/each}
  {/if}
</div>
