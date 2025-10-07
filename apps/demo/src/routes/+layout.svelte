<script>
  import "@distributedgallery/ui/styles/reset.css";
  import "@distributedgallery/ui/styles/fonts.css";
  import "@distributedgallery/ui/styles/app.css";
  import { Header } from "$lib";
  import toast, { Toaster } from "svelte-french-toast";
  // import '$lib/styles/reset.css';
  // import '$lib/styles/fonts.css';
  // import '$lib/styles/app.css';
</script>

<svelte:head>
  <title>Rennes 2 Dapp</title>
  <meta name="description" content="Distributed Gallery" />
</svelte:head>

<div class="app">
  <Toaster></Toaster>
  <Header
    title="dapp"
    nav={[
      { label: "Claim", url: "/" },
      { label: "Governance", url: "/governance" },
    ]}
  ></Header>
  <main class="framed">
    <slot />
  </main>
</div>
