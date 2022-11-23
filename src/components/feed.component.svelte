<script defer>
  import { onMount } from "svelte";
  import FeedCard from "./feed/feed-card.component.svelte";
  import { feedsDatas } from "../stores/feed.store";
  import { getFeeds } from "../services/feed.service";

  let feedData = [];

  onMount(async () => {
    if (!$feedsDatas) {
      feedsDatas.set(await getFeeds().then((res) => res));
    }
    feedData = $feedsDatas;
  });
</script>

<div>
  {#each feedData as feed}
    <FeedCard data={feed} />
  {/each}
</div>
