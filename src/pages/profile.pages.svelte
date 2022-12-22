<script defer>
  import { currentUser } from "../stores/auth.store";
  import { pathname } from "../stores/global.store";
  import ProfilePicture from "../components/profile/profile-picture.component.svelte";
  import DescriptionInformation from "../components/profile/description-information.component.svelte";
  import CountInformation from "../components/profile/count-information.component.svelte";
  import AccountInteraction from "../components/profile/account-interaction.component.svelte";
  import { getProfileByUserId } from "../services/profile.service";

  let MainLayout;
  let profileData;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  pathname.set($currentUser?.displayName);

  $: getProfileByUserId($currentUser.uid).then((res) => (profileData = res));
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
      bio={profileData?.bio}
      city={profileData?.city}
    />
    <svelte:component this={CountInformation} />
    <svelte:component this={AccountInteraction} />
  </div>
</svelte:component>
