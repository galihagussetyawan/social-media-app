<script defer>
  import { pathname } from "../stores/global.store";
  pathname.set("Search");

  let val, timer;

  function debounce(value) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      val = value;
    }, 1000);
  }
</script>

<div class="mx-5 py-2">
  <input
    placeholder="Find people"
    class=" w-full h-10 px-5 rounded-2xl outline-gray-300"
    on:keyup={({ target: { value } }) => debounce(value)}
  />
</div>
