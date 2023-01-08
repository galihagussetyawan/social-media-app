<script defer>
  import { pathname } from "../stores/global.store";
  import { getUsersByName } from "../services/user.service";
  import { Link } from "svelte-navigator";
  import { LazyImage } from "svelte-lazy-image";

  pathname.set("Search");

  let val, timer, searchResults;

  function debounce(value) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      val = value;
    }, 1000);
  }

  $: {
    if (val) {
      getUsersByName(val).then((res) => (searchResults = res));
    }
  }
</script>

<div class="mx-5 py-2">
  <input
    placeholder="Find people"
    class=" w-full h-10 px-5 rounded-2xl outline-gray-300"
    on:keyup={({ target: { value } }) => debounce(value)}
  />
</div>

{#if searchResults?.length > 0}
  <div class="mx-5 p-2 rounded-2xl bg-white">
    {#each searchResults as data}
      <Link to={`/${data?.username}`} class="flex items-center gap-3">
        <LazyImage
          src={data?.photoURL}
          class="w-16 h-16 rounded-2xl bg-gray-200"
        />
        <div>
          <p class="font-semibold">{data?.displayName}</p>
          <p class="text-gray-500">@{data?.username}</p>
        </div>
      </Link>
    {/each}
  </div>
{/if}
