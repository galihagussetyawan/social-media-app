<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$currentUser) {
    navigate("/register", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $currentUser}
  <slot />
{/if}
