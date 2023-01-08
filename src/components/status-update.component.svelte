<script defer>
  import { navigate } from "svelte-navigator";
  import { currentUser } from "../stores/auth.store";
  import imageCompression from "browser-image-compression";
  import { postFeed } from "../services/feed.service";
  import { uploadImage, postImage } from "../services/images.service";
  import Camera from "./camera/camera.component.svelte";
  import { cameraState, images } from "../stores/global.store";

  let statusText;
  let imageURLs;
  let progressPercent = 0;
  let hasTouchScreen = false;

  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  }

  async function handleChangeBrowseImage(e) {
    const options = {
      maxSizeMB: 0.1,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.5,
      alwaysKeepResolution: true,
      onProgress: (p) => (progressPercent = p),
    };

    const tempArr = [];
    [...e.target.files].forEach((file) => {
      tempArr.push(imageCompression(file, options));
    });

    // images = await Promise.all(tempArr);
    images.set(await Promise.all(tempArr));
  }

  async function handleStartupCamera() {
    // @ts-ignore
    navigator.permissions.query({ name: "camera" }).then((status) => {
      if (status.state === "denied") {
        navigator.mediaDevices.getUserMedia({ video: true });
        cameraState.set({
          isShowCamera: false,
          isPermission: false,
        });
      } else if (status.state === "prompt") {
        navigator.mediaDevices.getUserMedia({ video: true });
      } else if (status.state === "granted") {
        cameraState.set({
          isShowCamera: true,
          isPermission: true,
        });
      }
    });
  }

  async function handleStatusPublish() {
    if ($currentUser) {
      if (!statusText) return;

      const feedId = await postFeed(statusText);

      if ($images?.length > 0) {
        $images?.forEach(async (image) => {
          const uploadResult = await uploadImage(await image, await feedId);
          // @ts-ignore
          await postImage(
            await feedId,
            // @ts-ignore
            await uploadResult?.fileId,
            await uploadResult
          );
        });
      }
    } else {
      navigate("/register");
    }
  }

  function handleRemoveImageByIndex(index) {
    // images?.splice(index, 1);
    // images = [...images];
    $images.splice(index, 1);
    images.set($images);
    progressPercent = 0;
  }

  $: {
    let newImageUrls = [];
    if ($images?.length > 0) {
      $images?.forEach(async (image) => {
        newImageUrls?.push(URL?.createObjectURL(image));
      });
    }
    imageURLs = newImageUrls;
  }
</script>

<div class="flex flex-col space-y-5 py-5 mx-5 border-b border-gray-300">
  <div class="flex flex-col space-y-1">
    <span>Status Update</span>
    <div class=" rounded-2xl bg-white">
      <textarea
        placeholder="What are you doing?"
        class=" w-full p-3 outline-gray-300 rounded-2xl resize-none"
        bind:value={statusText}
      />
      {#if imageURLs?.length > 0}
        <div class="flex gap-2 m-2 overflow-x-scroll">
          {#each imageURLs as url, index}
            <div class="h-32 aspect-square relative">
              <img
                src={url}
                alt="test"
                class="w-full h-full absolute object-cover"
              />
              <button
                on:click={() => handleRemoveImageByIndex(index)}
                class="absolute p-1 right-0 text-white bg-red-500"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </i>
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- progress bars compression image -->
    <div class="w-full bg-gray-100 rounded-2xl h-2">
      <div
        class="max-w-full bg-[#01DC14] h-2 rounded-2xl"
        style="width: {progressPercent}%"
      />
    </div>

    <div class="w-fit h-10 flex items-center gap-5 p-2 rounded-2xl bg-white">
      <span>Add+</span>

      <!-- browse photo in gallery button -->
      <label>
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </i>
        <input
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          on:change={handleChangeBrowseImage}
        />
      </label>

      <!-- button camera if dekstop device -->
      {#if !hasTouchScreen}
        <button on:click={handleStartupCamera}>
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
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </i>
        </button>
      {/if}
    </div>
  </div>
  <div class=" w-full flex justify-end">
    <button
      class="px-10 py-2 font-semibold rounded-2xl text-white bg-[#01DC14]"
      on:click={handleStatusPublish}>Pubilsh</button
    >
  </div>
</div>

{#if $cameraState?.isShowCamera && $cameraState?.isPermission}
  <svelte:component this={Camera} />
{/if}
