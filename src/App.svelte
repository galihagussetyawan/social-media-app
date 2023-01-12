<script defer>
  import { Router, Route } from "svelte-navigator";

  let Home,
    Search,
    Register,
    Profile,
    Feed,
    ProtectedRoute,
    UsernameProfile,
    EditProfile,
    Setting,
    ImageViewer,
    FollowingFollowers;

  import("./pages/home.pages.svelte").then((result) => (Home = result.default));
  import("./pages/search.page.svelte").then(
    (result) => (Search = result.default)
  );
  import("./pages/register.page.svelte").then(
    (res) => (Register = res.default)
  );
  import("./pages/profile.pages.svelte").then((res) => (Profile = res.default));
  import("./pages/feed.page.svelte").then((res) => (Feed = res.default));
  import("./routes/protected-route.svelte").then(
    (res) => (ProtectedRoute = res.default)
  );
  import("./pages/username-profile.page.svelte").then(
    (res) => (UsernameProfile = res.default)
  );
  import("./pages/edit-profile.page.svelte").then(
    (res) => (EditProfile = res.default)
  );
  import("./pages/setting.page.svelte").then((res) => (Setting = res.default));
  import("./pages/image-viewer.page.svelte").then(
    (res) => (ImageViewer = res.default)
  );
  import("./pages/following-followers-list.page.svelte").then(
    (res) => (FollowingFollowers = res.default)
  );
</script>

<Router>
  <Route path={"/"} component={Home} />
  <Route path={"/search"} component={Search} />
  <Route path={"/register"} component={Register} />
  <Route path={"/status/:feedid"} component={Feed} />
  <Route path={"/:username"} component={UsernameProfile} />
  <Route path={"/status/:feedid/image/:imageid"} component={ImageViewer} />
  <Route path={"/:username/following"} component={FollowingFollowers} />
  <Route path={"/:username/followers"} component={FollowingFollowers} />

  <!-- proteced routes -->
  <svelte:component this={ProtectedRoute} path={"/profile"}>
    <svelte:component this={Profile} />
  </svelte:component>
  <svelte:component this={ProtectedRoute} path={"/profile/edit"}>
    <svelte:component this={EditProfile} />
  </svelte:component>
  <svelte:component this={ProtectedRoute} path={"/profile/settings"}>
    <svelte:component this={Setting} />
  </svelte:component>

  <svelte:component this={ProtectedRoute} path={"/profile/following"}>
    <svelte:component this={FollowingFollowers} />
  </svelte:component>
  <svelte:component this={ProtectedRoute} path={"/profile/followers"}>
    <svelte:component this={FollowingFollowers} />
  </svelte:component>
</Router>
