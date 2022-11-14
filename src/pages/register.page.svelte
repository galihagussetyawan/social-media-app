<script defer>
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";
  import {
    handleSignWithGoogleAccount,
    handleLogout,
  } from "../services/auth.service";
  import { onDestroy } from "svelte";

  let MainLayout;
  $: isChecking = true;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  const unsubscribe = currentUser.subscribe((value) => {
    if (value) {
      navigate("/", { replace: true });
    }
    isChecking = false;
  });

  onDestroy(unsubscribe);
</script>

<svelte:component this={MainLayout}>
  {#if isChecking}
    <span>loading...</span>
  {:else}
    <button on:click={handleSignWithGoogleAccount}>LOGIN</button>
  {/if}
  <button on:click={handleLogout}>Logout</button>
</svelte:component>
