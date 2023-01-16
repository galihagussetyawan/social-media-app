<script defer>
  import { afterUpdate, onMount } from "svelte";
  import { getChildrenComments } from "../../../services/comment.service";

  import("./reply-comment.component.svelte").then(
    (res) => (ReplyComment = res?.default)
  );

  export let feedData, commentData;

  let ReplyComment;
  let isShowChildren = false;
  let childrenData;

  async function handleShowChildren() {
    isShowChildren = true;
  }

  $: {
    if (isShowChildren) {
      if (commentData?.children) {
        getChildrenComments(feedData?.id, commentData?.children).then(
          (res) => (childrenData = res)
        );
      }
    }
  }

  // $: console.log(childrenData);
</script>

<div class="py-2">
  <!-- root comments -->
  <div class="flex gap-2 mx-5 py-2">
    <img
      src={commentData?.user?.photoURL}
      alt="test"
      class="min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px]s aspect-square rounded-2xl bg-gray-200"
    />

    <!-- displayname, username, comment text, reply comment -->
    <div class="w-full">
      <div>
        <div class="flex justify-between">
          <div>
            <span class="font-semibold uppercase"
              >{commentData?.user?.displayName}</span
            >
            <span class="text-gray-500">@{commentData?.user?.username}</span>
          </div>
          <span class="text-gray-500">1s</span>
        </div>
      </div>
      <div>
        <p class="text-lg py-3">{commentData?.text}</p>
      </div>

      <svelte:component
        this={ReplyComment}
        feedId={feedData?.id}
        commentId={commentData?.id}
        rootCommentId={commentData?.id}
        commentChildren={commentData?.children}
        bind:isShowChildren
      />
    </div>
    <!-- displayname, username, comment text, reply comment -->
  </div>
  <!-- end of root comments -->

  <!-- -------------------------------------------------------------------------------------------------->
  <!-- children comments -->
  <!-- if click Lihat Balasan button, fetch children data and show children comments -->
  {#if isShowChildren && childrenData}
    <div class="py-2">
      {#each childrenData as data}
        <div class="flex gap-2 mx-5 pl-5 py-1 border-l border-gray-400">
          <img
            src={data?.user?.photoURL}
            alt="test"
            class="min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px]s aspect-square rounded-2xl bg-gray-200"
          />

          <!-- displayname, username, comment text, reply comment -->
          <div class="w-full">
            <div>
              <div class="flex justify-between">
                <div>
                  <span class="font-semibold uppercase"
                    >{data?.user?.displayName}</span
                  >
                  <span class="text-gray-500">@{data?.user?.username}</span>
                </div>
                <span class="text-gray-500">1s</span>
              </div>
              {#if data?.reply?.id}
                <span>
                  <span class=" text-gray-500">balas</span>
                  <button class=" font-semibold text-green-500"
                    >@{data?.reply?.user?.username}</button
                  >
                </span>
              {/if}
            </div>
            <div>
              <p class="text-lg py-3">{data?.text}</p>
            </div>

            <svelte:component
              this={ReplyComment}
              feedId={feedData?.id}
              commentId={data?.id}
              rootCommentId={commentData?.id}
              commentChildren={data?.children}
              bind:isShowChildren
            />
          </div>
          <!-- displayname, username, comment text, reply comment -->
        </div>
        <!-- end of root comments -->
      {/each}
    </div>
  {/if}
  <!-- end of children comments -->
</div>
