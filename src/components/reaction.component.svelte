<script defer>
  import {
    addReactionFeed,
    deleteReactionfeed,
    getFeedReactionByFeedId,
    updateReactionFeed,
  } from "../services/feed.service";
  import { currentUser } from "../stores/auth.store";

  export let feedId;

  let reactionData;

  function handleAddReactionFeed(symbol) {
    if (reactionData?.filterUserReaction) {
      if (reactionData.filterUserReaction.symbol === symbol) {
        deleteReactionfeed(feedId, reactionData?.filterUserReaction?.id);
        reactionData.filterUserReaction = null;
        reactionData.count = reactionData.count - 1;
      } else {
        updateReactionFeed(
          feedId,
          reactionData?.filterUserReaction?.id,
          symbol
        );
        reactionData.filterUserReaction.symbol = symbol;
      }
    } else {
      addReactionFeed(feedId, symbol).then((res) => {
        reactionData.filterUserReaction = {
          id: res,
          symbol: symbol,
        };
      });
      reactionData.count = reactionData.count + 1;
    }
  }

  getFeedReactionByFeedId(feedId, $currentUser?.uid).then((res) => {
    reactionData = res;
  });
</script>

<div class="mt-5">
  <span class=" text-gray-400">{reactionData?.count} reactions</span>
  <div class="grid grid-cols-7 gap-1">
    <button
      class={` aspect-square rounded-2xl ${
        reactionData?.filterUserReaction?.symbol === 1 &&
        "border-2 border-green-400"
      } bg-gray-100`}
      on:click={() => handleAddReactionFeed(1)}>😎</button
    >
    <button
      class={` aspect-square rounded-2xl ${
        reactionData?.filterUserReaction?.symbol === 2 &&
        "border-2 border-green-400"
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
