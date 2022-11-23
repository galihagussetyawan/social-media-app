<script defer>
  import {
    addReactionFeed,
    getFeedReactionByFeedId,
  } from "../services/feed.service";

  export let feedId;

  let reactionData;

  function handleAddReactionFeed(symbol) {
    addReactionFeed(feedId, symbol);
  }

  getFeedReactionByFeedId(feedId).then((res) => {
    reactionData = res;
    console.log(res);
  });
</script>

<div class="mt-5">
  <span class=" text-gray-400">{reactionData?.count} reactions</span>
  <div class="grid grid-cols-7 gap-1">
    <button
      class=" aspect-square rounded-2xl bg-gray-100"
      on:click={() => handleAddReactionFeed(1)}>😎</button
    >
    <button class=" aspect-square rounded-2xl bg-gray-100">😬</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">👽</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">😺</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">😘</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">🤡</button>
    <button class=" aspect-square rounded-2xl bg-gray-100">🤗</button>
  </div>
</div>
