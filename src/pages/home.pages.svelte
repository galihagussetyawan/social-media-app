<script defer>
  let Feed, MainLayout, Banner;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
  import("../components/banner.component.svelte").then(
    (res) => (Banner = res.default)
  );
  import("../components/feed.component.svelte").then(
    (res) => (Feed = res.default)
  );
</script>

<svelte:head>
  <title>For Your Update</title>
</svelte:head>

<svelte:component this={MainLayout}>
  <svelte:component this={Banner} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
  <svelte:component this={Feed} />
</svelte:component>
