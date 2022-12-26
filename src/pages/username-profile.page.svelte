<script defer>
  import { navigate, useParams } from "svelte-navigator";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import LoadingCircle from "../components/skeleton/loading-circle.component.svelte";
  import { getUserByUsername } from "../services/user.service";
  import { getProfileByUserId } from "../services/profile.service";
  import {
    checkIsFollowed,
    getFollowersCount,
    getFollowingCount,
  } from "../services/follow-unfollow.service";
  import { onMount } from "svelte";

  let MainLayout,
    ProfilePicture,
    DescriptionInformation,
    CountInformation,
    AccountInteraction;
  let data, profileData, countInformationData;
  let isLoading = true;

  const params = useParams();

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  import("../components/profile/profile-picture.component.svelte").then(
    (res) => (ProfilePicture = res.default)
  );

  import("../components/profile/description-information.component.svelte").then(
    (res) => (DescriptionInformation = res.default)
  );

  import("../components/profile/count-information.component.svelte").then(
    (res) => (CountInformation = res.default)
  );

  import("../components/profile/account-interaction.component.svelte").then(
    (res) => (AccountInteraction = res.default)
  );

  $: if ($currentUser?.username === $params?.username) {
    navigate("/profile", { replace: true });
  }

  $: if (isLoading) {
    pathname.set("...");
  } else {
    pathname.set(data?.displayName);
  }

  onMount(async () => {
    data = await getUserByUsername($params?.username);
    profileData = await getProfileByUserId(data?.id);
    // @ts-ignore
    data.isFollowing = await checkIsFollowed(
      await data?.id,
      await $currentUser?.uid
    );
    countInformationData = {
      posts: 0,
      followers: await getFollowersCount(data?.id),
      following: await getFollowingCount(data?.id),
    };
    isLoading = false;
  });
</script>

<svelte:head>
  <title>{$pathname} (@{$params?.username})</title>
</svelte:head>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={LoadingCircle} />
  {:else}
    <div class=" space-y-5">
      <svelte:component
        this={ProfilePicture}
        imageUrl={data?.photoURL}
        imageAlt="asdasd"
        username={data?.username}
      />
      <svelte:component
        this={DescriptionInformation}
        bio={profileData?.bio}
        city={profileData?.city}
      />
      <svelte:component this={CountInformation} data={countInformationData} />
      <svelte:component this={AccountInteraction} {data} />
    </div>
  {/if}
</svelte:component>
