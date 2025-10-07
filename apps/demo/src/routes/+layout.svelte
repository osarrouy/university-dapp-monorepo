<script>
  import "@distributedgallery/ui/styles/reset.css";
  import "@distributedgallery/ui/styles/fonts.css";
  import "@distributedgallery/ui/styles/app.css";
  import { Header } from "@distributedgallery/ui";

  // import '$lib/styles/reset.css';
  // import '$lib/styles/fonts.css';
  // import '$lib/styles/app.css';
</script>

<svelte:head>
  <title>Rennes 2 Dapp</title>
  <meta name="description" content="Distributed Gallery" />
</svelte:head>

<div class="app">
  <Header
    title="rmt"
    nav={[
      { label: "redeem", url: "/" },
      { label: "about", url: "/about" },
    ]}
  ></Header>
  <main class="framed">
    <slot />
  </main>
</div>
