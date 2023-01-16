<script defer>
  import { afterUpdate, onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../../../stores/auth.store";
  import {
    addComment,
    getCommentsByFeedId,
  } from "../../../services/comment.service";
  import CommentCard from "./comment-card.component.svelte";

  export let data;

  let commentText, commentsList;
  let isOpenAddComment = false;
  let isUpdate = false;

  function handleToggleAddComment() {
    if (!$currentUser?.uid) return navigate("/register");
    isOpenAddComment = !isOpenAddComment;
  }

  function handleAddComment() {
    if (commentText) {
      addComment(commentText, data?.id, $currentUser?.uid);
      isUpdate = true;
    }
  }

  onMount(async () => {
    commentsList = await getCommentsByFeedId(data?.id);
  });

  afterUpdate(async () => {
    if (isUpdate) {
      commentsList = await getCommentsByFeedId(data?.id);
      isUpdate = false;
    }
  });

  // $: console.log(commentsList);
</script>

<div class=" mx-5 m-auto space-y-3">
  <div class="flex justify-between items-center">
    <span class="font-semibold text-lg">Comments</span>
    {#if !isOpenAddComment}
      <button
        class="font-semibold text-green-500"
        on:click={handleToggleAddComment}>+Add Comment</button
      >
    {/if}
  </div>

  <!-- input add comment section -->
  {#if isOpenAddComment}
    <div class="w-full grid grid-cols-[60%_40%] p-2 rounded-2xl bg-white">
      <div>
        <textarea
          class="w-full p-2 border border-gray-200 outline-gray-300 resize-none rounded-2xl"
          placeholder="Write a comment..."
          bind:value={commentText}
        />
      </div>
      <div class="grid grid-cols-2 items-center">
        <button class="h-8 text-gray-500" on:click={handleToggleAddComment}
          >cancel</button
        >
        <button
          class=" h-8 rounded-2xl text-white bg-green-500"
          on:click={handleAddComment}>send</button
        >
      </div>
    </div>
  {/if}
  <!-- end of input add comment section -->

  <!-- comments list card -->
  {#if commentsList && commentsList?.length > 0}
    <ul class="rounded-2xl divide-y bg-white">
      {#each commentsList as commentData}
        <CommentCard feedData={data} {commentData} />
      {/each}
    </ul>
  {/if}
</div>
