<script defer>
  import { onMount } from "svelte";
  import { LazyImage } from "svelte-lazy-image";
  import { useLocation, useParams } from "svelte-navigator";
  import { getFeedById } from "../services/feed.service";

  const location = useLocation();
  const params = useParams();

  let imagesList;

  onMount(async () => {
    // check state imageslist from passing state
    if (!$location?.state) {
      imagesList = await (await getFeedById($params?.feedid))?.images;
    } else {
      imagesList = Object.keys($location?.state)?.map((key) => {
        if (typeof $location.state[key] !== "object") return;
        return $location.state[key];
      });
    }
  });
</script>

<div
  class="w-full h-screen md:max-w-sm m-auto relative flex items-center overflow-hidden bg-black"
>
  {#if imagesList}
    <LazyImage
      src={imagesList[Number($params?.imageid) - 1]?.url}
      alt="test"
      class="max-w-full w-full"
    />
  {/if}

  <!-- navigation images -->
  {#if imagesList?.length > 2}
    <div class="absolute w-full px-5 flex justify-between text-white">
      <button
        class="w-10 h-10 flex justify-center items-center rounded-2xl bg-opacity-30 bg-gray-500"
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
        class="w-10 h-10 flex justify-center items-center rounded-2xl bg-opacity-30 bg-gray-500"
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
