<script defer>
  import { tabProfile } from "../../../stores/global.store";

  function handleChangeTab(tab) {
    tabProfile.set(tab);
  }
</script>

<div class="grid grid-cols-3 mx-5 rounded-2xl bg-gray-300">
  <button
    class={$tabProfile === "posts"
      ? "py-2 rounded-2xl text-black border-2 border-gray-300 bg-white"
      : "py-2 rounded-2xl text-gray-500"}
    on:click={() => handleChangeTab("posts")}>Posts</button
  >
  <button
    class={$tabProfile === "replies"
      ? "py-2 rounded-2xl text-black border-2 border-gray-300 bg-white"
      : "py-2 rounded-2xl text-gray-500"}
    on:click={() => handleChangeTab("replies")}>Replies</button
  >
  <button
    class={$tabProfile === "tags"
      ? "py-2 rounded-2xl text-black border-2 border-gray-300 bg-white"
      : "py-2 rounded-2xl text-gray-500"}
    on:click={() => handleChangeTab("tags")}>Tags</button
  >
</div>
