<script>
  import { Link, useLocation } from "svelte-navigator";
  export let data;

  let location = useLocation();
</script>

<div class="flex justify-center gap-14 mt-5 mx-5 p-3 rounded-2xl bg-white">
  <div class="grid grid-cols-1 text-center">
    <p class="font-semibold">{data?.posts}</p>
    <p class="text-sm font-thin">Posts</p>
  </div>
  <Link
    to={$location?.pathname + "?tab=followers"}
    class="grid grid-cols-1 text-center"
  >
    <p class="font-semibold">{data?.followers}</p>
    <p class="text-sm font-thin">Followers</p>
  </Link>
  <div class="grid grid-cols-1 text-center">
    <p class="font-semibold">{data?.following}</p>
    <p class="text-sm font-thin">Following</p>
  </div>
</div>
