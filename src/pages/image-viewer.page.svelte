<script defer>
  import { LazyImage } from "svelte-lazy-image";
  import { useLocation, useParams } from "svelte-navigator";

  const location = useLocation();
  const params = useParams();
</script>

<div
  class="w-full h-screen relative flex items-center overflow-hidden bg-black"
>
  <LazyImage src={$location?.state[0]?.url} alt="test" />

  <!-- navigation images -->
  {#if $location.state.length > 1}
    <div class="absolute w-full px-5 flex justify-between text-white">
      <button
        class="w-10 h-10 flex justify-center items-center rounded-2xl bg-opacity-20 bg-white"
      >
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </i>
      </button>
      <button
        class="w-10 h-10 flex justify-center items-center rounded-2xl bg-opacity-20 bg-white"
      >
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </i>
      </button>
    </div>
  {/if}
</div>
