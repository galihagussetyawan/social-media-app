<script defer>
  import { LazyImage } from "svelte-lazy-image";
  import { Link } from "svelte-navigator";

  export let imagesList, feedId;
</script>

{#if imagesList.length === 1}
  <Link to={`/status/${feedId}/image/1`} state={imagesList}>
    <LazyImage
      src={imagesList[0]?.url}
      class="aspect-[16/9] rounded-2xl object-cover object-center bg-gray-100"
    />
  </Link>
{/if}

{#if imagesList.length === 2}
  <div class="aspect-video grid grid-cols-2 gap-1">
    <LazyImage
      src={imagesList[0]?.url}
      class="w-full h-full object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src={imagesList[1]?.url}
      class="w-full h-full object-cover object-center rounded-2xl bg-gray-100"
    />
  </div>
{/if}

{#if imagesList.length === 3}
  <div class="grid grid-cols-2 gap-2">
    <LazyImage
      src={imagesList[0]?.url}
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src={imagesList[1]?.url}
      class="row-span-2 aspect-[8/9] h-full object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src={imagesList[2]?.url}
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
  </div>
{/if}

{#if imagesList.length > 3}
  <div class="grid grid-cols-2 gap-2">
    <LazyImage
      src={imagesList[0]?.url}
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src={imagesList[1]?.url}
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src={imagesList[2]?.url}
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    {#if imagesList === 4}
      <LazyImage
        src={imagesList[3]?.url}
        class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
      />
    {:else}
      <div class="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <LazyImage
          src={imagesList[3]?.url}
          class=" absolute object-cover object-center rounded-2xl bg-gray-100"
        />
        <div class="w-full h-full absolute opacity-70 bg-black" />
        <span
          class="absolute text-2xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white"
          >+{imagesList?.length - 4}</span
        >
      </div>
    {/if}
  </div>
{/if}
