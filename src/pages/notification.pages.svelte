<script defer>
  import { onMount } from "svelte";
  import { getNotificationsByUserId } from "../services/notification.service";
  import { pathname } from "../stores/global.store";
  import { currentUser } from "../stores/auth.store";

  let MainLayout, CircleSpinner, NotificationCard;
  pathname.set("notifications");

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res?.default)
  );
  import("../components/skeleton/circle-spinner.component.svelte").then(
    (res) => (CircleSpinner = res.default)
  );
  import("../components/notification/notification-card.component.svelte").then(
    (res) => (NotificationCard = res.default)
  );

  let notificationList;
  let isLoading = false;

  onMount(async () => {
    isLoading = true;
    notificationList = await getNotificationsByUserId($currentUser?.uid);
    // notificationList = [
    //   {
    //     type: "following",
    //     from: {
    //       displayName: "Galih Agus",
    //     },
    //   },
    //   {
    //     type: "request follow",
    //     from: {
    //       displayName: "Galih",
    //     },
    //   },
    // ];
    isLoading = false;
  });
</script>

<svelte:component this={MainLayout}>
  {#if isLoading}
    <svelte:component this={CircleSpinner} />
  {:else if notificationList?.length > 0}
    <ul class=" rounded-2xl divide-y mx-5 overflow-hidden">
      {#each notificationList as data}
        {#if !data?.isRead}
          <svelte:component this={NotificationCard} bind:data />
        {/if}
      {/each}
    </ul>
  {:else}
    <div>Tidak ada notifikasi</div>
  {/if}
</svelte:component>
