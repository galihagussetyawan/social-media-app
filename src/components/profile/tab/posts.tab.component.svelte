<script defer>
  import { onMount } from "svelte";
  import { useParams } from "svelte-navigator";
  import { currentUser } from "../../../stores/auth.store";
  import { getFeedsByUserId } from "../../../services/feed.service";
  import { getUserByUsername } from "../../../services/user.service";
  import { userFeedsData } from "../../../stores/feed.store";
  import FeedCard from "../../feed/feed-card.component.svelte";
  import CircleSpinner from "../../skeleton/circle-spinner.component.svelte";

  let params = useParams();
  let isLoading = true;
  let datas;

  onMount(async () => {
    // if url pathname /:username
    if ($params?.username) {
      datas = await getFeedsByUserId(
        await (
          await getUserByUsername($params?.username)
        )?.id
      );
    } else {
      // url pathname /profile
      if (!$userFeedsData) {
        userFeedsData.set(await getFeedsByUserId($currentUser?.uid));
      }
    }
    isLoading = false;
  });
</script>

<div class="space-y-5">
  {#if isLoading}
    <svelte:component this={CircleSpinner} />
  {:else}
    {#each $params?.username ? datas : $userFeedsData as data}
      <svelte:component this={FeedCard} {data} />
    {/each}
  {/if}
</div>
