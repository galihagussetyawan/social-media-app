<script defer>
  import { Router, Route } from "svelte-navigator";

  let Home, Search, Register;

  import("./pages/home.pages.svelte").then((result) => (Home = result.default));
  import("./pages/search.page.svelte").then(
    (result) => (Search = result.default)
  );
  import("./pages/register.page.svelte").then(
    (res) => (Register = res.default)
  );
</script>

<Router>
  <Route path={"/"} component={Home} />
  <Route path={"/search"} component={Search} />
  <Route path={"/register"} component={Register} />
</Router>
