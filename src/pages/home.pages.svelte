<script defer>
  import { currentGeolocation } from "../stores/geolocation.store";
  let Feed, MainLayout, Banner, StatusUpdate;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
  import("../components/banner.component.svelte").then(
    (res) => (Banner = res.default)
  );
  import("../components/feed.component.svelte").then(
    (res) => (Feed = res.default)
  );
  import("../components/status-update.component.svelte").then(
    (res) => (StatusUpdate = res.default)
  );
</script>

<svelte:head>
  <title>For Your Update</title>
</svelte:head>

<svelte:component this={MainLayout}>
  <!-- <span>Latitude {$geolocation?.latitude}</span>
  <span>Longitude {$geolocation?.longitude}</span>
  <span>Accuracy {$geolocation?.accuracy}</span> -->
  <svelte:component this={Banner} />
  <svelte:component this={StatusUpdate} />
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
