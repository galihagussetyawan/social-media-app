<script defer>
  import { onMount } from "svelte";
  import { useLocation, useMatch, useParams } from "svelte-navigator";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import { getFollowingByUserId } from "../services/follow-unfollow.service";
  import { each } from "svelte/internal";

  let MainLayout;
  let location = useLocation();
  let params = useParams();
  let followingList, followersList;

  const relativeMatch = useMatch("/:username/*action");
  pathname.set($relativeMatch?.params?.action);

  onMount(async () => {
    if ($params?.username) {
      console.log("username profile");
    } else {
      console.log("private profile");

      if ($pathname === "following") {
        followingList = await getFollowingByUserId($currentUser?.uid);
      }
    }
  });

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
</script>

<svelte:component this={MainLayout}>
  <ul class=" mx-5 m-auto rounded-2xl divide-y bg-white">
    {#if followingList || followersList}
      {#each $pathname === "following" ? followingList : followersList as data, index}
        <li class="p-3 grid grid-cols-[15%_55%_30%] items-center">
          <div
            class=" min-w-[40px] max-w-[40px] aspect-square rounded-2xl bg-red-300"
          />
          <div class="grid grid-cols-1">
            <span>{data?.user?.displayName}</span>
            <span>@{data?.user?.username}</span>
          </div>
          <button class="text-center p-1 rounded-2xl bg-gray-200"
            >{$pathname}</button
          >
        </li>
      {/each}
    {/if}
  </ul>
</svelte:component>
