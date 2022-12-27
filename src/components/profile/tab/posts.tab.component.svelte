<script defer>
  import { onMount } from "svelte";
  import { currentUser } from "../../../stores/auth.store";
  import { getFeedsByUserId } from "../../../services/feed.service";
  import { userFeedsData } from "../../../stores/feed.store";
  import FeedCard from "../../feed/feed-card.component.svelte";
  import CircleSpinner from "../../skeleton/circle-spinner.component.svelte";

  let isLoading = true;

  onMount(async () => {
    if (!$userFeedsData) {
      userFeedsData.set(await getFeedsByUserId($currentUser?.uid));
    }
    isLoading = false;
  });
</script>

<div class="space-y-5">
  {#if isLoading}
    <svelte:component this={CircleSpinner} />
  {:else}
    {#each $userFeedsData as data}
      <svelte:component this={FeedCard} {data} />
    {/each}
  {/if}
</div>
