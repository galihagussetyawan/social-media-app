<script defer>
  import { pathname } from "../stores/global.store";

  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  pathname.set("Edit Profile");
</script>

<svelte:component this={MainLayout}>
  <div class="p-5 mx-5 space-y-3 rounded-2xl bg-white">
    <div class="grid grid-cols-1 space-y-1">
      <span class=" font-semibold">Profession</span>
      <input
        class=" border py-2 px-5 rounded-2xl border-gray-200 outline-gray-300 bg-gray-50"
      />
    </div>

    <div class="grid grid-cols-1 space-y-1">
      <span class=" font-semibold">City</span>
      <input
        class=" border py-2 px-5 rounded-2xl border-gray-200 outline-gray-300 bg-gray-50"
      />
    </div>

    <div class="grid grid-cols-1 space-y-1">
      <span class=" font-semibold">Bio</span>
      <input
        class=" border py-2 px-5 rounded-2xl border-gray-200 outline-gray-300 bg-gray-50"
      />
    </div>

    <div class="w-full py-5 grid grid-cols-2">
      <button>Cancel</button>
      <button class="py-2 rounded-2xl text-white bg-[#01DC14]">Save</button>
    </div>
  </div>
</svelte:component>
