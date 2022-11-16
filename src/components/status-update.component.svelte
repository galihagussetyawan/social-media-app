<script defer>
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";
  import { postFeed } from "../services/feed.service";
  let statusText;

  function handleStatusPublish() {
    if ($currentUser) {
      if (!statusText) return;
      postFeed(statusText);
    } else {
      navigate("/register");
    }
  }
</script>

<div class="h-44 flex flex-col space-y-5 mt-5 mx-5 border-b border-gray-300">
  <div class="flex flex-col space-y-1">
    <span>Status Update</span>
    <textarea
      placeholder="What are you doing?"
      class="p-3 outline-gray-300 rounded-2xl resize-none"
      bind:value={statusText}
    />
  </div>
  <div class=" w-full flex justify-end">
    <button
      class="px-10 py-2 font-semibold rounded-2xl text-white bg-[#01DC14]"
      on:click={handleStatusPublish}>Pubilsh</button
    >
  </div>
</div>
