<script defer>
  import { Link, useParams } from "svelte-navigator";

  export let data;

  let Reaction, ProfilePhoto, ImageCollectionCard, CountFeedInfo;
  let params = useParams();

  import("../reaction.component.svelte").then(
    (res) => (Reaction = res.default)
  );
  import("./profile-photo.component.svelte").then(
    (res) => (ProfilePhoto = res.default)
  );
  import("../images/image-collection-card.component.svelte").then(
    (res) => (ImageCollectionCard = res.default)
  );
  import("./count-feed-info.component.svelte").then(
    (res) => (CountFeedInfo = res.default)
  );
</script>

<div class=" min-h-[164px] flex flex-col gap-5 mx-5 p-5 rounded-2xl bg-white">
  <svelte:component this={ProfilePhoto} {data} />

  <!-- status text section -->
  {#if !$params?.feedid}
    <Link to={`/status/${data?.id}`}>
      <p class="w-full py-2 leading-tight text-2xl">
        {data?.text}
      </p>
    </Link>
  {:else}
    <p class="w-full py-2 leading-tight text-2xl">{data?.text}</p>
  {/if}

  <!-- image section -->
  {#if data?.images?.length > 0}
    <svelte:component
      this={ImageCollectionCard}
      imagesList={data?.images}
      feedId={data?.id}
    />
  {/if}

  <svelte:component this={Reaction} {data} />
  <svelte:component
    this={CountFeedInfo}
    feedId={data?.id}
    feedText={data?.text}
  />
</div>
