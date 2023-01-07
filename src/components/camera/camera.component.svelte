<script defer>
  import { onDestroy, onMount } from "svelte";
  import { cameraState, images } from "../../stores/global.store";

  let video, videoStream, canvas, photoUrl;

  function handleTakePicture() {
    let context = canvas.getContext("2d");
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    photoUrl = canvas.toDataURL("image/png");
  }

  async function handleStartCamera() {
    await navigator.mediaDevices
      .getUserMedia({
        video: {
          aspectRatio: 9 / 16,
          facingMode: "user",
        },
      })
      .then((stream) => {
        video.srcObject = stream;
        videoStream = stream;
        video.play();
      });
  }

  function handleStopCamera() {
    cameraState.set({
      isShowCamera: false,
      isPermission: false,
    });
  }

  // After taking a picture, select the photo or reject it
  function selectImage() {
    canvas.toBlob(
      (blob) => {
        images.set([blob]);
      },
      "image/webp",
      100
    );
    handleStopCamera();
  }

  function rejectImage() {
    photoUrl = null;
  }

  onMount(() => {
    handleStartCamera();
  });

  onDestroy(() => {
    videoStream.getTracks().forEach((track) => {
      track.stop();
    });
  });
</script>

<div
  class="w-full md:max-w-sm max-h-screen h-screen m-auto fixed top-0 z-10 bg-black"
>
  <!-- result take picture preview -->
  {#if photoUrl}
    <div class="w-full h-screen">
      <div class="absolute w-full h-14 flex justify-between px-5 bg-black">
        <button on:click={rejectImage} class="text-white">
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
        <button on:click={selectImage} class="text-white">SELECT</button>
      </div>
      <img src={photoUrl} alt="test" class="max-w-full max-h-full" />
    </div>
  {/if}

  <!-- camera view -->
  <div>
    <div class="h-14 w-full flex items-center px-5 bg-black">
      <button
        class="flex justify-center text-white"
        on:click={handleStopCamera}
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
        <span>Back</span>
      </button>
    </div>
    <video bind:this={video} class="w-full" />
  </div>
  <div
    class="w-full md:max-w-sm h-[15%] flex justify-center items-center fixed bottom-0 bg-black"
  >
    <button
      class="w-16 h-16 rounded-full bg-white"
      on:click={handleTakePicture}
    />
  </div>
</div>

<canvas bind:this={canvas} />
