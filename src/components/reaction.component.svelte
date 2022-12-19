<script defer>
  import {
    addReactionFeed,
    deleteReactionfeed,
    updateReactionFeed,
  } from "../services/feed.service";

  export let data;

  function handleAddReactionFeed(symbol) {
    if (data?.reactions?.filterUserReaction) {
      if (data.reactions?.filterUserReaction?.symbol === symbol) {
        deleteReactionfeed(data?.id, data?.reactions?.filterUserReaction?.id);
        data.reactions.filterUserReaction = null;
        data.reactions.count = data?.reactions?.count - 1;
      } else {
        updateReactionFeed(
          data?.id,
          data?.reactions?.filterUserReaction?.id,
          symbol
        );
        data.reactions.filterUserReaction.symbol = symbol;
      }
    } else {
      addReactionFeed(data?.id, symbol).then((res) => {
        data.reactions.filterUserReaction = {
          id: res,
          symbol: symbol,
        };
      });
      data.reactions.count = data.reactions.count + 1;
    }
  }
</script>

<div>
  <span class=" text-gray-400">{data?.reactions?.count} reactions</span>
  <div class="grid grid-cols-7 gap-1">
    <button
      class={` aspect-square rounded-2xl ${
        data?.reactions?.filterUserReaction?.symbol === 1 &&
        "border-2 border-green-400"
      } bg-gray-100`}
      on:click={() => handleAddReactionFeed(1)}>😎</button
    >
    <button
      class={` aspect-square rounded-2xl ${
        data?.filterUserReaction?.symbol === 2 && "border-2 border-green-400"
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
