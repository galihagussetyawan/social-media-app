<script defer>
  import dayjs from "dayjs";
  import Reaction from "../reaction.component.svelte";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { Link, useLocation } from "svelte-navigator";

  dayjs.extend(relativeTime);

  export let data;
  let location = useLocation();
</script>

<div class=" min-h-[164px] relative mx-5 p-5 rounded-2xl bg-white">
  <!-- <span
    class="w-8 h-8 absolute -top-2 -right-2 rounded-full border-4 border-gray-100 outline-gray-100 bg-red-500"
  /> -->
  <div class="flex justify-between">
    <div class="w-full">
      <Link to={`/${data?.user?.username}`} class="w-fit flex gap-2">
        {#if data?.user?.photoURL}
          <img
            src={data?.user?.photoURL}
            class="min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-2xl bg-gray-100"
            alt="profile"
          />
        {/if}
        <div class="grid grid-cols-1">
          <span class="uppercase font-semibold">{data?.user?.displayName}</span>
          <span class="text-sm text-gray-400"
            >{dayjs(Number(data.createdAt)).fromNow()}</span
          >
        </div>
      </Link>
      {#if $location?.pathname === "/"}
        <Link to={`/status/${data?.id}`}>
          <p class="w-full py-5 leading-tight text-2xl">
            {data?.text}
          </p>
        </Link>
      {:else}
        <p class="py-5 leading-tight text-2xl">{data?.text}</p>
      {/if}
    </div>
    {#if data?.images}
      <div
        class="min-w-[78px] max-w-[78px] min-h-[78px] max-h-[78px] rounded-2xl bg-gray-100"
      />
    {/if}
  </div>
  <Reaction {data} />
  <div>Comment</div>
</div>
