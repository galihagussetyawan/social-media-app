<script defer>
  import { onMount } from "svelte";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import { getUserById } from "../services/user.service";
  import { updatePrivateAccount } from "../services/settings.services";

  let MainLayout, CircleSpinner;
  pathname.set("settings");

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );
  import("../components/skeleton/circle-spinner.component.svelte").then(
    (res) => (CircleSpinner = res.default)
  );

  let isPrivate = false;
  let isLoading = false;

  function handleChangePrivate(e) {
    updatePrivateAccount($currentUser?.uid, e?.target?.checked);
  }

  onMount(async () => {
    isLoading = true;
    await getUserById($currentUser?.uid).then(
      (res) => (isPrivate = res?.isPrivate)
    );
    isLoading = false;
  });
</script>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={CircleSpinner} />
  {:else}
    <div class="mx-5">
      <div class="space-y-3">
        <span class="font-semibold">Account</span>
        <ul class="space-y-1.5 rounded-2xl px-5 divide-y bg-white">
          <li class="flex justify-between py-3">
            <span>Private account</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                bind:checked={isPrivate}
                on:change={handleChangePrivate}
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#01DC14]"
              />
            </label>
          </li>
        </ul>
      </div>
    </div>
  {/if}
</svelte:component>
