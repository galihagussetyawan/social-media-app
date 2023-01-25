<script defer>
  import { currentUser } from "../../stores/auth.store";
  import { acceptRequestFollowing } from "../../services/follow-unfollow.service";
  import { readNotification } from "../../services/notification.service";

  export let data;

  function handleReadNotification() {
    readNotification(data?.id, $currentUser?.uid);
  }

  function handleAcceptRequestFollowing() {
    acceptRequestFollowing(data?.from?.id, $currentUser?.uid);
    handleReadNotification();
    data = null;
  }
</script>

{#if data?.type === "request follow"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <p on:click={handleReadNotification}>
      <span class="capitalize font-semibold">{data?.from?.displayName}</span> meminta
      persetujuan untuk mengikuti anda
    </p>
    <button
      class="h-10 px-5 rounded-2xl text-white bg-[#01DC14]"
      on:click={handleAcceptRequestFollowing}>Accept</button
    >
  </li>
{/if}

{#if data?.type === "following"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <p on:click={handleReadNotification}>
      <span class="capitalize font-semibold">{data?.from?.displayName}</span> telah
      mengikuti anda
    </p>
    <button class="w-28 h-10 rounded-2xl text-white bg-[#01DC14]"
      >Ikuti Balik</button
    >
  </li>
{/if}
