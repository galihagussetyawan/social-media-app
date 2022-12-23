<script defer>
  import { isShowModal } from "../stores/global.store";

  let inner;
  function handleClickOutside() {
    function click(event) {
      if ($isShowModal && !inner.contains(event?.target)) {
        $isShowModal = false;
      }
    }

    document.addEventListener("click", click);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class=" w-full h-screen max-h-screen flex justify-center fixed top-0 z-10 bg-opacity-50 bg-black"
  on:click={handleClickOutside}
>
  <div
    bind:this={inner}
    class="w-full md:max-w-sm space-y-10 fixed bottom-0 rounded-t-2xl px-5 py-10 bg-gray-100"
  >
    <div class="flex justify-center">
      <button
        class=" w-1/4 h-2 rounded-2xl bg-gray-300"
        on:click={() => isShowModal.set(false)}
      />
    </div>
    <slot />
  </div>
</div>
