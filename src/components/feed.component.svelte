<script defer>
  import Reaction from "./reaction.component.svelte";
</script>

<div class=" min-h-[164px] relative mx-5 p-5 rounded-2xl mt-5 bg-white">
  <span
    class="w-8 h-8 absolute -top-2 -right-2 rounded-full border-4 border-gray-100 outline-gray-100 bg-red-500"
  />
  <div class="flex justify-between">
    <div>
      <div class="flex gap-2">
        <div
          class="min-w-[45px] max-w-[45px] min-h-[45px] max-h-[45px] rounded-2xl bg-gray-100"
        />
        <div class="grid grid-cols-1">
          <span class="uppercase">galih agus</span>
          <span class="text-[0.9rem] font-extralight">2 jam lalu</span>
        </div>
      </div>
      <p class="mt-5 leading-tight">Kok hari ini hujan terus ya? hufft</p>
    </div>
    <div
      class="min-w-[78px] max-w-[78px] min-h-[78px] max-h-[78px] rounded-2xl bg-gray-100"
    />
  </div>
  <Reaction />
  <div>Comment</div>
</div>
