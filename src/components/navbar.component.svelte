<script defer>
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";
  import { isShowModal } from "../stores/global.store";
  import SlotBottomModal from "./navbar/slot-bottom-modal.component.svelte";

  let pathname = window.location.pathname;

  onMount(() => ($isShowModal = false));

  function handleNavigationButton() {
    if (pathname !== "/") {
      navigate(-1);
    } else {
      navigate("/search");
    }
  }

  function getCurrentPathname() {
    if (pathname === "/") {
      return "discover";
    } else {
      if (pathname.startsWith("/profile")) return $currentUser?.displayName;
      return pathname.replaceAll("/", " ");
    }
  }

  function handleShowModal() {
    $isShowModal = !$isShowModal;
  }
</script>

<header
  class="w-full md:max-w-sm h-20 sticky top-0 z-10 m-auto flex flex-col justify-end bg-gray-100"
>
  <nav class="flex justify-between items-center mb-3 mx-5">
    <button
      class=" min-w-[40px] max-w-[40px] aspect-square p-2 rounded-2xl text-white bg-gray-300"
      on:click={handleNavigationButton}
    >
      <i>
        {#if pathname !== "/"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        {:else}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        {/if}
      </i>
    </button>
    <span
      class="min-h-[40px] max-h-[40px] w-1/2 flex justify-center items-center text-center rounded-2xl font-bold capitalize text-white bg-gray-300"
      >{getCurrentPathname()}</span
    >
    <button
      disabled={$currentUser ? false : true}
      class="min-w-[40px] max-w-[40px] flex justify-center items-center overflow-clip aspect-square rounded-2xl text-white bg-gray-300"
    >
      <button on:click={handleShowModal}>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </i>
      </button>
    </button>
  </nav>
</header>

{#if $isShowModal}
  <SlotBottomModal on:close={() => ($isShowModal = false)} />
{/if}
