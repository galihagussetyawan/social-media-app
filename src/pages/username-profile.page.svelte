<script defer>
  import { navigate, useParams } from "svelte-navigator";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import ProfilePicture from "../components/profile/profile-picture.component.svelte";
  import DescriptionInformation from "../components/profile/description-information.component.svelte";
  import CountInformation from "../components/profile/count-information.component.svelte";
  import LoadingCircle from "../components/skeleton/loading-circle.component.svelte";

  import { getUserByUsername } from "../services/user.service";

  let MainLayout;
  let data;
  let isLoading = true;

  const params = useParams();

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  $: if ($currentUser?.username === $params?.username) {
    navigate("/profile", { replace: true });
  }

  $: getUserByUsername($params?.username).then((res) => {
    data = res;
    isLoading = false;
  });
  $: pathname.set(data?.displayName);
</script>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={LoadingCircle} />
  {:else}
    <svelte:component
      this={ProfilePicture}
      imageUrl={data?.photoURL}
      imageAlt="asdasd"
      username={data?.username}
    />
    <svelte:component this={DescriptionInformation} />
    <svelte:component this={CountInformation} />
  {/if}
</svelte:component>
