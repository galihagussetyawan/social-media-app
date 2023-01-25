<script defer>
  import { useParams, Link, navigate } from "svelte-navigator";
  import { currentUser } from "../../stores/auth.store";
  import { isUpdate } from "../../stores/global.store";
  import { follow, unfollow } from "../../services/follow-unfollow.service";

  export let data;

  const params = useParams();

  function handleFollow() {
    if (!$currentUser?.uid) {
      navigate("/register");
    } else {
      follow(data?.id, data?.isPrivate, $currentUser?.uid).then(() => {
        data.isFollowing = true;
        isUpdate.set(true);
      });
    }
  }

  function handleUnfollow() {
    unfollow(data?.id, $currentUser?.uid).then(() => {
      data.isFollowing = false;
      isUpdate.set(true);
    });
  }
</script>

<div class=" flex justify-center px-5 space-x-3">
  {#if !$params?.username}
    <Link
      to={"/profile/edit"}
      class="w-5/12 h-[40px] flex justify-center items-center rounded-2xl bg-gray-300"
      >Edit Profile</Link
    >
  {:else}
    <!-- follow and unfollow button -->
    {#if data?.isFollowing}
      {#if data?.isConfirm}
        <button
          class="w-5/12 h-[40px] rounded-2xl text-black bg-gray-300"
          on:click={handleUnfollow}>Unfollow</button
        >
        <!-- request accepted -->
      {:else}
        <button
          class="w-5/12 h-[40px] rounded-2xl text-black bg-gray-300"
          on:click={handleUnfollow}>Request</button
        >
      {/if}
    {:else}
      <button
        class="w-5/12 h-[40px] rounded-2xl text-white
     bg-[#01DC14]"
        on:click={handleFollow}>Follow</button
      >
    {/if}
    <button
      class="h-[40px] flex justify-center items-center aspect-square rounded-2xl bg-gray-300"
    >
      <i>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </i>
    </button>
  {/if}
</div>
