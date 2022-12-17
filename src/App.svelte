<script defer>
  import { Router, Route } from "svelte-navigator";

  let Home, Search, Register, Profile, Feed;

  import("./pages/home.pages.svelte").then((result) => (Home = result.default));
  import("./pages/search.page.svelte").then(
    (result) => (Search = result.default)
  );
  import("./pages/register.page.svelte").then(
    (res) => (Register = res.default)
  );
  import("./pages/profile.pages.svelte").then((res) => (Profile = res.default));
  import("./pages/feed.page.svelte").then((res) => (Feed = res.default));
  import ProtectedRoute from "./routes/protected-route.svelte";
</script>

<Router>
  <Route path={"/"} component={Home} />
  <Route path={"/search"} component={Search} />
  <Route path={"/register"} component={Register} />
  <Route path={"/status/:feedid"} component={Feed} />
  <ProtectedRoute path={"/profile"} component={Profile} />
</Router>
