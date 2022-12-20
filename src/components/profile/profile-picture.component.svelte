<script defer>
  export let imageUrl, imageAlt, username;
</script>

<div class="w-20 h-20 m-auto rounded-2xl overflow-hidden bg-gray-300">
  <img src={imageUrl} alt={imageAlt} />
</div>
<div class=" text-center">@{username}</div>
