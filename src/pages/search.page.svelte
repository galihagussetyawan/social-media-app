<script defer>
  import SearchInput from "../components/search.component.svelte";
  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
</script>

<svelte:component this={MainLayout}>
  <SearchInput />
</svelte:component>
