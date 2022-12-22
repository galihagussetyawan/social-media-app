<script defer>
  import { navigate, useParams } from "svelte-navigator";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import ProfilePicture from "../components/profile/profile-picture.component.svelte";
  import DescriptionInformation from "../components/profile/description-information.component.svelte";
  import CountInformation from "../components/profile/count-information.component.svelte";
  import LoadingCircle from "../components/skeleton/loading-circle.component.svelte";
  import { getUserByUsername } from "../services/user.service";
  import AccountInteraction from "../components/profile/account-interaction.component.svelte";
  import { getProfileByUserId } from "../services/profile.service";

  let MainLayout;
  let data, profileData;
  let isLoading = true;

  const params = useParams();

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  $: if ($currentUser?.username === $params?.username) {
    navigate("/profile", { replace: true });
  }

  $: if (isLoading) {
    pathname.set("...");
  } else {
    pathname.set(data?.displayName);
  }

  $: getUserByUsername($params?.username).then((res) => {
    data = res;
  });

  $: getProfileByUserId(data?.id).then((res) => (profileData = res));

  $: if (data && profileData) {
    isLoading = false;
  }
</script>

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
      <svelte:component this={CountInformation} />
      <svelte:component this={AccountInteraction} />
    </div>
  {/if}
</svelte:component>
