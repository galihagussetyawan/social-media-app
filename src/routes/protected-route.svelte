<script defer>
  import { onMount } from "svelte";
  import { Route } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";

  let isLoading = true;
  let isAuth = false;
  export let path;
  export let component;

  onMount(() => {
    currentUser.subscribe(async (value) => {
      setTimeout(() => {
        isLoading = false;
      }, 3000);
    });
  });
</script>

{#if isLoading}
  <div class=" w-full h-screen flex justify-center items-center">
    Loading.....
  </div>
{:else if !$currentUser}
  <div>Kosong</div>
{:else}
  <Route {path} {component} />
{/if}
