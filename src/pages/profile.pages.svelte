<script defer>
  import { currentUser } from "../stores/auth.store";
  import { pathname } from "../stores/global.store";
  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  pathname.set($currentUser?.displayName);
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<svelte:component this={MainLayout}>
  <div>
    <div class="w-20 h-20 m-auto rounded-2xl overflow-hidden bg-gray-300">
      <img src={$currentUser?.photoURL} alt={$currentUser?.displayName} />
    </div>
    <div class=" text-center">@username</div>
    <div
      class="grid grid-cols-1 space-y-2 text-center mt-2 mx-5 p-3 rounded-2xl bg-white"
    >
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, qui?
      </p>
      <span class="font-semibold italic">Jatiprahu, Indonesia</span>
    </div>
    <div class="flex justify-center gap-14 mt-5 mx-5 p-3 rounded-2xl bg-white">
      <div class="grid grid-cols-1 text-center">
        <p class="font-semibold">12312</p>
        <p class="text-sm font-thin">Posts</p>
      </div>
      <div class="grid grid-cols-1 text-center">
        <p class="font-semibold">12312</p>
        <p class="text-sm font-thin">Follower</p>
      </div>
      <div class="grid grid-cols-1 text-center">
        <p class="font-semibold">12312</p>
        <p class="text-sm font-thin">Following</p>
      </div>
    </div>
  </div>
</svelte:component>
