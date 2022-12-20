<script defer>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";
  import LoginForm from "../components/register/login-form.component.svelte";
  import LoadingCircle from "../components/skeleton/loading-circle.component.svelte";

  let RegisterLayout;
  let isChecking = true;

  import("../layouts/register.layout.svelte").then(
    (res) => (RegisterLayout = res.default)
  );

  onMount(() => {
    setTimeout(() => {
      currentUser.subscribe((value) => {
        if (value) {
          navigate("/", { replace: true });
        }
        isChecking = false;
      });
    }, 1000);
  });
</script>

<svelte:component this={RegisterLayout}>
  {#if isChecking}
    <svelte:component this={LoadingCircle} />
  {:else}
    <LoginForm />
  {/if}
</svelte:component>
