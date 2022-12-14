<script defer>
  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
</script>

<svelte:component this={MainLayout}>
  <div>feed</div>
</svelte:component>
