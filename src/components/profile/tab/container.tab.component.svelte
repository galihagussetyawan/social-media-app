<script defer>
  import { tabProfile } from "../../../stores/global.store";
  import ButtonTab from "./button.tab.component.svelte";
  import PostsTab from "./posts.tab.component.svelte";
</script>

<div class=" grid space-y-5 m-auto mt-10 py-5 border-t border-gray-300">
  <ButtonTab />

  {#if $tabProfile === "posts"}
    <svelte:component this={PostsTab} />
  {:else if $tabProfile === "replies"}
    <div>Replies</div>
  {:else if $tabProfile === "tags"}
    <div>Tags</div>
  {/if}
</div>
