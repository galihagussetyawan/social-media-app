<script defer>
  import { onMount } from "svelte";
  import { navigate, useMatch, useParams } from "svelte-navigator";
  import { LazyImage } from "svelte-lazy-image";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import {
    getFollowingByUserId,
    getFollowersByUserId,
    follow,
    unfollow,
  } from "../services/follow-unfollow.service";
  import { getUserByUsername } from "../services/user.service";

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
  import("../components/skeleton/circle-spinner.component.svelte").then(
    (res) => (CircleSpinner = res.default)
  );

  let MainLayout, CircleSpinner;
  let params = useParams();
  let followingList, followersList;
  let isLoading = true;

  const relativeMatch = useMatch("/:username/*action");
  pathname.set($relativeMatch?.params?.action);

  function handleFollow(followUserId, followUserIsPrivate, index) {
    if (!$currentUser?.uid) return navigate("/register");

    follow(followUserId, followUserIsPrivate, $currentUser?.uid).then(() => {
      if ($pathname === "following") {
        followingList[index].isFollowed = true;
      } else {
        followersList[index].isFollowed = true;
      }
    });
  }

  function handleUnfollow(followUserId, index) {
    unfollow(followUserId, $currentUser?.uid).then(() => {
      if ($pathname === "following") {
        followingList[index].isFollowed = false;
      } else {
        followersList[index].isFollowed = false;
      }
    });
  }

  onMount(async () => {
    // in public profile
    // path: '/:username/*following-followers'
    if ($params?.username) {
      console.log("username profile");

      const user = await getUserByUsername($params?.username);
      if ($pathname === "following") {
        followingList = await getFollowingByUserId(user?.id);
      } else {
        followersList = await getFollowersByUserId(user?.id);
      }
    } else {
      // in private profile
      // path: '/profile/*following-followers'
      if ($pathname === "following") {
        followingList = await getFollowingByUserId($currentUser?.uid);
      } else {
        followersList = await getFollowersByUserId($currentUser?.uid);
      }
    }
    isLoading = false;
  });
</script>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={CircleSpinner} />
  {:else}
    <ul class=" mx-5 m-auto rounded-2xl divide-y bg-white">
      {#if followingList || followersList}
        {#each $pathname === "following" ? followingList : followersList as data, index}
          <li class="p-3 grid grid-cols-[15%_55%_30%] items-center">
            <LazyImage
              src={data?.user?.photoURL}
              class=" min-w-[40px] max-w-[40px] aspect-square rounded-2xl bg-gray-100"
            />
            <div class="grid grid-cols-1">
              <span>{data?.user?.displayName}</span>
              <span>@{data?.user?.username}</span>
            </div>
            {#if data.isFollowed}
              <button
                class="text-center p-1 rounded-2xl text-gray-500 bg-gray-200"
                on:click={() => handleUnfollow(data?.user?.id, index)}
                >Unfollow</button
              >
            {:else}
              <button
                class="text-center p-1 rounded-2xl text-white bg-green-500"
                on:click={() =>
                  handleFollow(data?.user?.id, data?.user?.isPrivate, index)}
                >Follow</button
              >
            {/if}
          </li>
        {/each}
      {/if}
    </ul>
  {/if}
</svelte:component>
