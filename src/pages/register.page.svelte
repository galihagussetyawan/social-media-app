<script defer>
  import { onDestroy } from "svelte";
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";
  import LoginForm from "../components/register/login-form.component.svelte";

  let RegisterLayout;
  $: isChecking = true;

  import("../layouts/register.layout.svelte").then(
    (res) => (RegisterLayout = res.default)
  );

  const unsubscribe = currentUser.subscribe((value) => {
    console.log(value);
    if (value) {
      navigate("/", { replace: true });
    }
    isChecking = false;
  });

  onDestroy(unsubscribe);
</script>

<svelte:component this={RegisterLayout}>
  {#if isChecking}
    <span>loading...</span>
  {:else}
    <LoginForm />
  {/if}
</svelte:component>
