<script>
import { initialize, wallet } from "./wallet.svelte.js";
import { mainnet } from "@reown/appkit/networks";
import { onMount } from "svelte";

export const networks = [mainnet];

onMount(() => {
	initialize(networks);
});

const shorten = (address) => {
	const regex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
	const match = address.match(regex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

const openModal = () => {
	wallet.kit()?.open();
};
</script>

<button class="framed" on:click={openModal}>
	{#if wallet.isConnected}
		{shorten(wallet.address)}
	{:else}
		CONNECT
	{/if}
</button>

<style>
	button {
		margin-left: var(--space-sm);
	}
</style>
