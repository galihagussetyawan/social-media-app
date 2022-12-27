<script defer>
  import { onMount } from "svelte";
  import { pathname } from "../stores/global.store";
  import { getFeedById } from "../services/feed.service";
  import { useParams } from "svelte-navigator";
  import { feedsData } from "../stores/feed.store";
  import FeedCard from "../components/feed/feed-card.component.svelte";

  let MainLayout;
  let isLoading = true;
  let feedDetail;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  const params = useParams();

  onMount(() => {
    if ($feedsData?.some((data) => data.id.includes($params.feedid))) {
      feedDetail = $feedsData.find((data) => data.id === $params.feedid);
      isLoading = false;
    } else {
      getFeedById($params.feedid).then((res) => {
        feedDetail = res;
        isLoading = false;
      });
    }
  });

  pathname.set("Status");
</script>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <div>Loading...</div>
  {:else}
    <FeedCard data={feedDetail} />
  {/if}
</svelte:component>
