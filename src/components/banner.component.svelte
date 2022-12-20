<script defer>
  import { Link } from "svelte-navigator";
</script>

<div
  class="mx-5 p-5 flex items-center gap-2 rounded-2xl border-b-2 bg-[#01DC14]"
>
  <p class="font-semibold text-white">
    Coba sosmed ini secara GRATIS SEKARANG! 🤑
  </p>
  <Link
    to={"/register"}
    class="min-w-fit p-2 px-5 rounded-2xl font-semibold text-[#01DC14] bg-white"
  >
    Daftar
  </Link>
</div>
