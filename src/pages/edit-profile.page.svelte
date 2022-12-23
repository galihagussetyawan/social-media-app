<script defer>
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";
  import {
    addProfile,
    getProfileByUserId,
    updateProfile,
  } from "../services/profile.service";

  let MainLayout, LoadingCircle;
  let profileId, profession, city, bio;
  let isLoading = true;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  import("../components/skeleton/loading-circle.component.svelte").then(
    (res) => (LoadingCircle = res.default)
  );

  if ($currentUser.uid) {
    getProfileByUserId($currentUser.uid).then((res) => {
      if (res) {
        // @ts-ignore
        profileId = res?.id;
        // @ts-ignore
        profession = res?.profession;
        // @ts-ignore
        city = res?.city;
        // @ts-ignore
        bio = res?.bio;
      }
      isLoading = false;
    });
  }

  function handleAddProfile() {
    if (!profileId) {
      addProfile($currentUser.uid, profession, city, bio);
    } else {
      updateProfile(profileId, $currentUser.uid, profession, city, bio);
    }
  }

  pathname.set("Edit Profile");
</script>

<svelte:head>
  <title>Edit Profile</title>
</svelte:head>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={LoadingCircle} />
  {:else}
    <div class="p-5 mx-5 space-y-3 rounded-2xl bg-white">
      <div class="grid grid-cols-1 space-y-1">
        <span class=" font-semibold">Profession</span>
        <input
          bind:value={profession}
          class=" border py-2 px-5 rounded-2xl border-gray-200 outline-gray-300 bg-gray-50"
        />
      </div>

      <div class="grid grid-cols-1 space-y-1">
        <span class=" font-semibold">City</span>
        <input
          bind:value={city}
          class=" border py-2 px-5 rounded-2xl border-gray-200 outline-gray-300 bg-gray-50"
        />
      </div>

      <div class="grid grid-cols-1 space-y-1">
        <span class=" font-semibold">Bio</span>
        <textarea
          bind:value={bio}
          class="h-24 border py-2 px-5 rounded-2xl border-gray-200 outline-gray-300 resize-none bg-gray-50"
        />
      </div>

      <div class="w-full py-5 grid grid-cols-2">
        <button>Cancel</button>
        <button
          class="py-2 rounded-2xl text-white bg-[#01DC14]"
          on:click={handleAddProfile}>Save</button
        >
      </div>
    </div>
  {/if}
</svelte:component>
