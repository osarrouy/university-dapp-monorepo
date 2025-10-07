<script>
import { Button } from "$lib";
import { BROKER_ABI, IERC20_ABI } from "$lib/abis";
import { wallet } from "$lib/wallet.svelte.js";
import { readContract, waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { onMount } from "svelte";

let isApproved = false;
let isApproving = false;
let isExchanging = false;
let isExchanged = false;

const RMT = "0xFdbC2C6AfaE0B9648F42a4a5a7E9eD17C9ef857b";
const BROKER = "0xCB043f8756b338d4188b196A01fE444cA7a46915";

onMount(async () => {
	const interval = setInterval(async () => {
		try {
			if (wallet.isConnected) {
				const balance = await readContract(wallet.config, {
					address: RMT,
					abi: IERC20_ABI,
					functionName: "balanceOf",
					args: ["0x3c7e48216C74D7818aB1Fd226e56C60C4D659bA6"],
				});

				if (balance >= 1) {
					isExchanged = true;
				}
				const allowance = await readContract(wallet.config, {
					address: RMT,
					abi: IERC20_ABI,
					functionName: "allowance",
					args: [wallet.address, BROKER],
				});
				if (allowance == 1) {
					isApproved = true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	}, 1000);
	return () => clearInterval(interval);
});

const approve = async () => {
	isApproving = true;

	try {
		const tx = await writeContract(wallet.config, {
			address: RMT,
			abi: IERC20_ABI,
			functionName: "approve",
			args: [BROKER, 1],
		});

		await waitForTransactionReceipt(wallet.config, {
			hash: tx,
		});

		isApproved = true;
	} catch (error) {
		console.error(error);
	}

	isApproving = false;
};

const exchange = async () => {
	isExchanging = true;

	try {
		const tx = await writeContract(wallet.config, {
			address: BROKER,
			abi: BROKER_ABI,
			functionName: "redeem",
			args: [],
		});

		await waitForTransactionReceipt(wallet.config, {
			hash: tx,
		});

		isExchanged = true;
	} catch (error) {
		console.error(error);
	}

	isExchanging = false;
};
</script>

<section>
  {#if isExchanged}
    <p>
      The exchange is now done. Thanks for being here from the start, brother.
    </p>
  {:else}
    <p>
      This webpage is intended to proceed to the exchange of the Ready-Made
      Token for the exact amount of 1.7 ETH.
    </p>
    <p>
      The contract handling this exchange can be found <a
        href="https://etherscan.io/address/{BROKER}"
        target="_blank">here</a
      >.
    </p>
  {/if}
</section>

{#if !wallet.isConnected}
  <section><p>To proceed, please connect your wallet.</p></section>
{:else if !isExchanged}
  <hr />
  <section class={isApproved ? "disabled" : ""}>
    <h2>1. approve</h2>
    <p>
      <small>
        {#if !isApproved}
          You need you to approve our smart contract to transfer the RMT.
        {:else}
          Our smart contract is approved to transfer the RMT.
        {/if}
      </small>
    </p>
    <section>
      <Button
        on:click={approve}
        loading={isApproving ? true : false}
        disabled={isApproved || isApproving ? true : false}
      >
        approve
      </Button>
    </section>
  </section>
  <hr />
  <section class={!isApproved ? "disabled" : ""}>
    <h2>2. exchange</h2>
    <p>
      <small>
        {#if !isApproved}
          You need you to approve our smart contract before we can exchange the
          RMT.
        {:else}
          You can now exchange the RMT against 1.7 ETH.
        {/if}
      </small>
    </p>
    <section>
      <Button
        on:click={exchange}
        loading={isExchanging ? true : false}
        disabled={!isApproved ? true : false}
      >
        exchange
      </Button>
    </section>
  </section>
{/if}

<style>
</style>
