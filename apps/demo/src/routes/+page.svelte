<script>
  import { Button } from "$lib";
  import { BROKER_ABI, IERC20_ABI } from "$lib/abis";
  import { wallet } from "$lib/wallet.svelte.js";
  import {
    getBalance,
    readContract,
    waitForTransactionReceipt,
    writeContract,
  } from "@wagmi/core";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
  let isApproved = false;
  let isApproving = false;
  let isExchanging = false;
  let isExchanged = false;
  let balance = 0;

  const RMT = "0xFdbC2C6AfaE0B9648F42a4a5a7E9eD17C9ef857b";
  const BROKER = "0xCB043f8756b338d4188b196A01fE444cA7a46915";

  onMount(async () => {
    const interval = setInterval(async () => {
      try {
        // console.log("do");
        // console.log(wallet);
        if (wallet.isConnected) {
          console.log("true");
          balance = await getBalance(wallet.config, {
            address: wallet.address,
          });

          console.log("Balance");
          console.log(balance);

          // const balance = await readContract(wallet.config, {
          //   address: RMT,
          //   abi: IERC20_ABI,
          //   functionName: "balanceOf",
          //   args: ["0x3c7e48216C74D7818aB1Fd226e56C60C4D659bA6"],
          // });

          // if (balance >= 1) {
          //   isExchanged = true;
          // }
          // const allowance = await readContract(wallet.config, {
          //   address: RMT,
          //   abi: IERC20_ABI,
          //   functionName: "allowance",
          //   args: [wallet.address, BROKER],
          // });
          // if (allowance == 1) {
          //   isApproved = true;
          // }
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
  const claim = async () => {
    try {
      fetch(
        "https://university-dapp.vercel.app/api/faucet?address=" +
          wallet.address,
      );

      toast.success("ETH claimed ... please wait a minute or two !");
    } catch (error) {
      toast.error("There has been an issue. Refresh and retry !");
    }
  };
</script>

<section>
  {#if !wallet.isConnected}
    <p>Please connect your wallet.</p>
  {:else if !balance}
    <p>Waiting for data to be fetched from the blockchain.</p>
  {:else}
    <p>You own {balance.formatted} ETH</p>
    {#if balance.value > 50000000000000000n}
      <p>
        That's enough to play. Head to the <a href="/governance">governance</a> page
        to vote on proposals.
      </p>
    {:else}
      <p>
        You need more to play. Click on the button below and wait until the
        transaction is validated refreshes.
      </p>
      <div class="action">
        <Button on:click={claim}>Claim ETH</Button>
      </div>
    {/if}
  {/if}
</section>

<style>
  .action {
    margin-top: var(--space-md);
  }
</style>
