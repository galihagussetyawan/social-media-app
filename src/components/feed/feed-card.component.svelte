<script defer>
  import { Link, useParams } from "svelte-navigator";
  export let data;

  let Reaction, ProfilePhoto;
  let params = useParams();

  import("../reaction.component.svelte").then(
    (res) => (Reaction = res.default)
  );
  import("./profile-photo.component.svelte").then(
    (res) => (ProfilePhoto = res.default)
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
  {#if data?.images}
    <div class="w-full aspect-[16/9] bg-gray-100" />
  {/if}

  <svelte:component this={Reaction} {data} />
  <div>Comment</div>
</div>
