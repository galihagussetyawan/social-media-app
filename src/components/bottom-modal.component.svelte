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
  class=" w-full h-screen max-h-screen flex justify-center items-end fixed top-0 z-10 bg-opacity-50 bg-black"
  on:click={handleClickOutside}
>
  <div
    bind:this={inner}
    class="w-full md:max-w-sm h-40 rounded-t-2xl p-5 bg-gray-100"
  >
    <slot />
  </div>
</div>
