<script defer>
  import {
    addReactionFeed,
    deleteReactionfeed,
    updateReactionFeed,
  } from "../services/feed.service";
  import { currentGeolocation } from "../stores/geolocation.store";
  import { getDistance } from "geolib";
  import { currentUser } from "../stores/auth.store";
  import { navigate } from "svelte-navigator";
  import { giveExpressionFeedNotification } from "../services/notification.service";

  export let data;

  function handleAddReactionFeed(symbol) {
    if (!$currentUser) {
      navigate("/register");
    } else {
      if (data?.reaction?.id) {
        if (data?.reaction?.symbol === symbol) {
          deleteReactionfeed(data?.id, data?.reaction?.id).then((res) => {
            data.reaction = null;
            data.count.reaction = data?.count?.reaction - 1;
          });
        } else {
          updateReactionFeed(data?.id, data?.reaction?.id, symbol).then(
            (res) => {
              data.reaction.symbol = symbol;
            }
          );
        }
      } else {
        addReactionFeed(data?.id, $currentUser?.uid, symbol).then((res) => {
          data.reaction = {
            id: res,
            symbol: symbol,
          };
          data.count.reaction = data?.count?.reaction + 1;
        });
        handleSendNotification(symbol);
      }
    }
  }

  //prevent send notification if creator feed
  function handleSendNotification(symbol) {
    if (data?.user?.id === $currentUser?.uid) {
      return;
    } else {
      giveExpressionFeedNotification(
        data?.user?.id,
        $currentUser?.uid,
        data?.id,
        symbol
      );
    }
  }
</script>

<div>
  <!-- info count reaction and distance -->
  <div class="flex items-center py-2 space-x-1 text-gray-400">
    <i class=" text-red-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
          clip-rule="evenodd"
        />
      </svg>
    </i>
    <span
      >{getDistance(
        {
          latitude: data?.location?._lat,
          longitude: data?.location?._long,
        },
        {
          latitude: $currentGeolocation?.latitude,
          longitude: $currentGeolocation?.longitude,
        }
      )} meters</span
    >
  </div>

  <!-- reaction icon button section -->
  <div class="grid grid-cols-7 gap-1">
    <button
      class={`aspect-square rounded-2xl ${
        data?.reaction?.symbol === 1 && "border-2 bg-green-200 border-[#01DC14]"
      } bg-gray-100`}
      on:click={() => handleAddReactionFeed(1)}>😎</button
    >
    <button
      class={` aspect-square rounded-2xl ${
        data?.reaction?.symbol === 2 && "border-2 bg-green-200 border-[#01DC14]"
      } bg-gray-100`}
      on:click={() => handleAddReactionFeed(2)}>😬</button
    >
    <button class=" aspect-square rounded-2xl bg-gray-100">👽</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">😺</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">😘</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">🤡</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">🤗</button>
  </div>
</div>
