<script defer>
  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
</script>

<svelte:component this={MainLayout}>
  <h1>Search Page</h1>
</svelte:component>
