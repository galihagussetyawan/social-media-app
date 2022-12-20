<script defer>
  import { pathname } from "../stores/global.store";
  import { useParams } from "svelte-navigator";
  let MainLayout;

  const params = useParams();

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
</script>

<svelte:component this={MainLayout}>
  <div>sadasd</div>
</svelte:component>
