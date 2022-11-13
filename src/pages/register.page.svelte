<script defer>
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { auth } from "../config/firebase";
  import { currentUser } from "../stores/auth.store";

  currentUser.subscribe((value) => {
    if (value) window.location.href = "/";
  });

  let MainLayout;

  import("../layouts/main.layout.svelte").then(
    (res) => (MainLayout = res.default)
  );

  const handleSignWithGoogleAccount = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
</script>

<svelte:component this={MainLayout}>
  <button on:click={handleSignWithGoogleAccount}>LOGIN</button>
</svelte:component>
