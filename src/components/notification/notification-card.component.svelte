<script defer>
  import { currentUser } from "../../stores/auth.store";
  import {
    acceptRequestFollowing,
    follow,
    rejectRequestFollowing,
  } from "../../services/follow-unfollow.service";
  import { readNotification } from "../../services/notification.service";
  import { notificationList } from "../../stores/global.store";
  import { Link } from "svelte-navigator";

  export let data;
  const emoticonList = ["😎", "😬", "👽", "😺", "😘", "🤡", "🤗"];

  function handleReadNotification() {
    readNotification(data?.id, $currentUser?.uid);
  }

  function handleAcceptRequestFollowing() {
    acceptRequestFollowing(data?.from, $currentUser?.uid);
    handleReadNotification();
    removeDataById();
  }

  function handleRejectRequest() {
    rejectRequestFollowing(data?.from, $currentUser?.uid);
    handleReadNotification();
    removeDataById();
  }

  function handleViewProfile() {
    handleReadNotification();
    removeDataById();
  }

  function handleFollowBack() {
    follow(data?.from, data.fromUserData?.isPrivate, $currentUser?.uid);
    handleReadNotification();
    removeDataById();
  }

  function removeDataById() {
    notificationList.set(
      $notificationList?.filter((notification) => notification?.id !== data?.id)
    );
  }
</script>

{#if data?.type === "request follow"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <p on:click={handleReadNotification}>
      <span class="capitalize font-semibold"
        >{data?.fromUserData?.displayName}</span
      > meminta persetujuan untuk mengikuti anda
    </p>
    <div class="flex gap-2">
      <button
        class="h-10 px-5 rounded-2xl text-gray-600 bg-gray-200"
        on:click={handleRejectRequest}>Reject</button
      >
      <button
        class="h-10 px-5 rounded-2xl text-white bg-[#01DC14]"
        on:click={handleAcceptRequestFollowing}>Accept</button
      >
    </div>
  </li>
{/if}

{#if data?.type === "following"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <p on:click={handleReadNotification}>
      <span class="capitalize font-semibold"
        >{data?.fromUserData?.displayName}</span
      > telah mengikuti anda
    </p>
    <button
      class="w-28 h-10 rounded-2xl text-white bg-[#01DC14]"
      on:click={handleFollowBack}>Ikuti Balik</button
    >
  </li>
{/if}

{#if data?.type === "expression"}
  <li class="flex justify-between items-center gap-3 p-3 bg-white">
    <p>
      <span class="capitalize font-semibold"
        >{data?.fromUserData?.displayName}</span
      >
      memberikan ekspresi
      <span>{emoticonList[Number(data?.symbol) + 1]}</span> pada status anda
    </p>
    <Link
      to={"/" + data?.fromUserData?.username}
      class="w-48 h-10 flex justify-center items-center rounded-2xl text-white bg-[#01DC14]"
      on:click={handleViewProfile}
      >Lihat Profile
    </Link>
  </li>
{/if}
