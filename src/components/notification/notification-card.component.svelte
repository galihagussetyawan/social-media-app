<script defer>
  import { currentUser } from "../../stores/auth.store";
  import { acceptRequestFollowing } from "../../services/follow-unfollow.service";
  import { readNotification } from "../../services/notification.service";

  export let data;
  const emoticonList = ["😎", "😬", "👽", "😺", "😘", "🤡", "🤗"];

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
    <button on:click={handleReadNotification}>
      <p>
        <span class="capitalize font-semibold"
          >{data?.fromUserData?.displayName}</span
        > meminta persetujuan untuk mengikuti anda
      </p>
    </button>
    <button
      class="h-10 px-5 rounded-2xl text-white bg-[#01DC14]"
      on:click={handleAcceptRequestFollowing}>Accept</button
    >
  </li>
{/if}

{#if data?.type === "following"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <button on:click={handleReadNotification}>
      <p>
        <span class="capitalize font-semibold"
          >{data?.fromUserData?.displayName}</span
        > telah mengikuti anda
      </p>
    </button>
    <button class="w-28 h-10 rounded-2xl text-white bg-[#01DC14]"
      >Ikuti Balik</button
    >
  </li>
{/if}

{#if data?.type === "expression"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <button>
      <p>
        <span class="capitalize font-semibold"
          >{data?.fromUserData?.displayName}</span
        >
        memberikan ekspresi
        <span>{emoticonList[Number(data?.symbol) + 1]}</span> pada status anda
      </p>
    </button>
    <button class="w-48 h-10 rounded-2xl text-white bg-[#01DC14]"
      >Lihat Profile</button
    >
  </li>
{/if}
