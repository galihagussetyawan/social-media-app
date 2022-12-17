<script defer>
  import dayjs from "dayjs";
  import Reaction from "../reaction.component.svelte";
  import relativeTime from "dayjs/plugin/relativeTime";
  import { navigate } from "svelte-navigator";

  dayjs.extend(relativeTime);

  export let data;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class=" min-h-[164px] relative mx-5 p-5 rounded-2xl mt-5 bg-white"
  on:click={() => navigate(`/status/${data?.id}`)}
>
  <span
    class="w-8 h-8 absolute -top-2 -right-2 rounded-full border-4 border-gray-100 outline-gray-100 bg-red-500"
  />
  <div class="flex justify-between">
    <div>
      <div class="flex gap-2">
        {#if data?.user?.photoURL}
          <img
            src={data?.user?.photoURL}
            class="min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-2xl bg-gray-100"
            alt="profile"
          />
        {/if}
        <div class="grid grid-cols-1">
          <span class="uppercase">{data?.user?.displayName}</span>
          <span class="text-[0.9rem] font-extralight"
            >{dayjs(Number(data.createdAt)).fromNow()}</span
          >
        </div>
      </div>
      <p class="mt-5 leading-tight">{data?.text}</p>
    </div>
    {#if data?.images}
      <div
        class="min-w-[78px] max-w-[78px] min-h-[78px] max-h-[78px] rounded-2xl bg-gray-100"
      />
    {/if}
  </div>
  <Reaction feedId={data?.id} />
  <div>Comment</div>
</div>
