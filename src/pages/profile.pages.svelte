<script defer>
  import { onMount } from "svelte";
  import { currentUser, profileData } from "../stores/auth.store";
  import { pathname } from "../stores/global.store";
  import { getProfileByUserId } from "../services/profile.service";
  import {
    getFollowersCount,
    getFollowingCount,
  } from "../services/follow-unfollow.service";

  let MainLayout,
    ProfilePicture,
    DescriptionInformation,
    CountInformation,
    AccountInteraction;

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

  let countInformationData;

  pathname.set($currentUser?.displayName);

  onMount(async () => {
    profileData.set(await getProfileByUserId($currentUser.uid));
    countInformationData = {
      posts: 0,
      followers: await getFollowersCount($currentUser?.uid),
      following: await getFollowingCount($currentUser?.uid),
    };
  });
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<svelte:component this={MainLayout}>
  <div class=" space-y-5">
    <svelte:component
      this={ProfilePicture}
      imageUrl={$currentUser.photoURL}
      imageAlt="asdasd"
      username={$currentUser.username}
    />
    <svelte:component
      this={DescriptionInformation}
      bio={$profileData?.bio}
      city={$profileData?.city}
    />
    <svelte:component this={CountInformation} data={countInformationData} />
    <svelte:component this={AccountInteraction} />
  </div>
</svelte:component>
