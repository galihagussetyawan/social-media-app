<script defer>
  import { navigate } from "svelte-navigator";
  import { replyComment } from "../../../services/comment.service";
  import { currentUser } from "../../../stores/auth.store";

  export let feedId,
    commentId,
    rootCommentId,
    commentChildren,
    isShowChildren,
    isLoadingChildren;

  let isOpenReplyInput = false;
  let commentText;

  function handleToggleReplyInput() {
    if (!$currentUser?.uid) return navigate("/register");
    isOpenReplyInput = !isOpenReplyInput;
  }

  function handleSendReplyComment() {
    replyComment(
      commentText,
      feedId,
      $currentUser?.uid,
      commentId,
      rootCommentId
    );
  }
</script>

<div>
  {#if isOpenReplyInput}
    <div class="space-y-3">
      <textarea
        class="w-full p-2 rounded-2xl border border-gray-200 outline-gray-300 resize-none"
        placeholder="Write a comment..."
        bind:value={commentText}
      />
      <div class="flex justify-end">
        <button
          class="py-1 px-5 text-gray-500"
          on:click={handleToggleReplyInput}>cancel</button
        >
        <button
          class="py-1 px-5 rounded-2xl text-white bg-green-500"
          on:click={handleSendReplyComment}>send</button
        >
      </div>
    </div>
  {:else}
    <div class="flex gap-5">
      <button
        class="flex items-center gap-2 text-gray-500"
        on:click={handleToggleReplyInput}
      >
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            class="bi bi-arrow-90deg-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
            />
          </svg>
        </i>
        <span>Balas</span>
      </button>
      {#if commentChildren?.length > 0}
        <!-- <slot name="show-reply" /> -->
        {#if isLoadingChildren}
          <span class=" text-gray-500">Memuat...</span>
        {:else}
          <button
            class=" text-gray-500"
            on:click={() => (isShowChildren = true)}>Lihat Balasan</button
          >
        {/if}
      {/if}
    </div>
  {/if}
</div>
