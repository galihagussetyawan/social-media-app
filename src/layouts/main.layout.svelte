<script defer>
  import Navbar from "../components/navbar.component.svelte";
</script>

<Navbar />
<main class=" w-full min-h-screen md:max-w-sm m-auto bg-gray-100">
  <slot />
</main>
