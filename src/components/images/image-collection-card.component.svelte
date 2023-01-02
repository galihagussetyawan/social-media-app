<script defer>
  import { LazyImage } from "svelte-lazy-image";

  export let imagesList;
</script>

{#if imagesList.length === 1}
  <LazyImage
    src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    class="aspect-[16/9] rounded-2xl object-cover object-center bg-gray-100"
  />
{/if}

{#if imagesList.length === 2}
  <div class="aspect-video grid grid-cols-2 gap-1">
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="w-full h-full object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="w-full h-full object-cover object-center rounded-2xl bg-gray-100"
    />
  </div>
{/if}

{#if imagesList.length === 3}
  <div class="grid grid-cols-2 gap-2">
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="row-span-2 aspect-[8/9] h-full object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
  </div>
{/if}

{#if imagesList.length > 3}
  <div class="grid grid-cols-2 gap-2">
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    <LazyImage
      src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
    />
    {#if imagesList === 4}
      <LazyImage
        src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        class="aspect-[16/9] object-cover object-center rounded-2xl bg-gray-100"
      />
    {:else}
      <div class="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <LazyImage
          src="https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
