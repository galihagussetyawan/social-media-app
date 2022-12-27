<script defer>
  import { onMount } from "svelte";
  import { currentUser } from "../../../stores/auth.store";
  import { getFeedsByUserId } from "../../../services/feed.service";
  import FeedCard from "../../feed/feed-card.component.svelte";

  let isLoading = true;
  let datas = [];

  onMount(async () => {
    datas = await getFeedsByUserId($currentUser?.uid);
    isLoading = false;
  });
</script>

<div class="space-y-5">
  {#each datas as data}
    <svelte:component this={FeedCard} {data} />
  {/each}
</div>
