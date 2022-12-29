<script defer>
  import { Link, useLocation, useParams } from "svelte-navigator";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);
  export let data;

  let location = useLocation();
  let params = useParams();
</script>

{#if $location?.pathname === "/profile" || $params?.username}
  <div class="w-fit flex gap-2">
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
  </div>
{:else}
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
{/if}
