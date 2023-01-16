<script defer>
  import { onMount } from "svelte";
  import { pathname } from "../stores/global.store";
  import { getFeedById } from "../services/feed.service";
  import { useParams } from "svelte-navigator";
  import { feedsData } from "../stores/feed.store";

  let MainLayout, LoadingScreenCircle, FeedCard, CommentList;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
  import("../components/skeleton/loading-screen-circle.component.svelte").then(
    (res) => (LoadingScreenCircle = res.default)
  );
  import("../components/feed/comments/comment-list.component.svelte").then(
    (res) => (CommentList = res.default)
  );
  import("../components/feed/feed-card.component.svelte").then(
    (res) => (FeedCard = res.default)
  );

  let isLoading = true;
  let feedDetail;
  const params = useParams();
  pathname.set("status");

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
</script>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={LoadingScreenCircle} />
  {:else}
    <div class="space-y-5">
      <svelte:component this={FeedCard} data={feedDetail} />
      <svelte:component this={CommentList} data={feedDetail} />
    </div>
  {/if}
</svelte:component>
