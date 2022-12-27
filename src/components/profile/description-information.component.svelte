<script defer>
  export let bio, city;
</script>

{#if bio && city}
  <div
    class="grid grid-cols-1 space-y-2 text-center mx-5 p-3 rounded-2xl bg-white"
  >
    <p>{bio}</p>
    <span class="font-semibold italic">{city}</span>
  </div>
{/if}
