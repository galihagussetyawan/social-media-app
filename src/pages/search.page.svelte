<script defer>
  import SearchInput from "../components/search.component.svelte";
  import ImageKit from "imagekit-javascript";

  const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_PUBLIC_KEY,
    urlEndpoint: import.meta.env.VITE_URL_ENDPOINT,
  });

  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  // function generateUrlImage() {
  //   return imagekit.url({
  //     path: "/default-image.jpg",
  //     urlEndpoint: "https://ik.imagekit.io/wuod4czc1l/",
  //   });
  // }
</script>

<svelte:head>
  <title>Search people</title>
</svelte:head>

<svelte:component this={MainLayout}>
  <SearchInput />
  <!-- <img src={generateUrlImage()} alt="test" /> -->
</svelte:component>
