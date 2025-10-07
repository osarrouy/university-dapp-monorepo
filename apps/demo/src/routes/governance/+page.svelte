<script>
  import { GOVERNANCE_ABI } from "$lib/abis";
  import { wallet } from "$lib/wallet.svelte.js";
  import { Button } from "$lib";
  import {
    readContract,
    waitForTransactionReceipt,
    writeContract,
  } from "@wagmi/core";

  import toast from "svelte-french-toast";

  const ADDRESS = "0x7Ab0e641ED98A4FCf7c4EF7F61919042DDdc7f1D";

  let loaded = $state(false);
  let proposals = $state([]);

  $effect(async () => {
    if (wallet.isConnected) {
      fetchProposals();
    }
  });

  const fetchProposals = async () => {
    try {
      console.log("» fetching number of proposals");
      const nbOfProposals = await readContract(wallet.config, {
        address: ADDRESS,
        abi: GOVERNANCE_ABI,
        functionName: "nbOfProposals",
      });
      console.log("» fetching proposals ...");
      for (let i = proposals.length; i < nbOfProposals; i++) {
        console.log(i);

        let proposal = await readContract(wallet.config, {
          address: ADDRESS,
          abi: GOVERNANCE_ABI,
          functionName: "getProposal",
          args: [i],
        });

        let hasVoted = await readContract(wallet.config, {
          address: ADDRESS,
          abi: GOVERNANCE_ABI,
          functionName: "hasVoted",
          args: [i, wallet.address],
        });

        proposals = [
          ...proposals,
          {
            description: proposal[2],
            yeahs: proposal[3],
            neahs: proposal[4],
            hasVoted,
          },
        ];
      }

      loaded = true;
      console.log("» proposals fetched");
      console.log(proposals);
    } catch (error) {
      console.log(error);
    }
  };

  const _vote = async (id, yes) => {
    const tx = await writeContract(wallet.config, {
      address: ADDRESS,
      abi: GOVERNANCE_ABI,
      functionName: "vote",
      args: [id, yes],
    });
    toast.promise(
      waitForTransactionReceipt(wallet.config, {
        hash: tx,
      }),
      {
        loading: "Waiting for the blockchain to process your vote",
        success: "Vote processed by the blockchain",
        error: "Error processing your vote",
      },
    );
  };

  const vote = async (id, yes) => {
    console.log("» Voting " + yes + " on proposal " + id + " ...");
    try {
      proposals[id].hasVoted = true;
      toast.promise(_vote(id, yes), {
        loading: "Confirm transaction in your wallet",
        success: "Vote transmitted to the blockchain",
        error: "Error during your voting",
      });
    } catch (e) {
      console.log(e);
      proposals[id].hasVoted = false;
      toast.error("There has been an error.");
      await fetchProposals();
    }
  };
</script>

<section>
  {#if !wallet.isConnected}
    <p>Please connect your wallet.</p>
  {:else if loaded}
    <table>
      <thead>
        <tr
          ><th>id</th><th>description</th><th>oui</th><th>non</th><th /><th
          /></tr
        >
      </thead>
      {#each proposals as _proposal, index}
        <tr
          ><td>#{index}</td><td>{_proposal.description}</td><td
            >{_proposal.yeahs}</td
          ><td>{_proposal.neahs}</td>
          {#if !_proposal.hasVoted}
            <td><Button on:click={() => vote(index, true)}>oui</Button></td>
            <td><Button on:click={() => vote(index, false)}>non</Button></td>
          {:else}
            <td />
            <td />
          {/if}
        </tr>
      {/each}
    </table>
  {:else}
    <p>Waiting for data to be fetched from the blockchain.</p>
  {/if}
</section>

<style>
  table {
    width: 100%;

    tr {
      border-bottom: 1px dashed var(--background-subtle);

      th {
        font-weight: bold;
      }
      th,
      td {
        padding: var(--space-sm);

        &:nth-of-type(1),
        &:nth-of-type(2) {
          text-align: left;
        }

        &:nth-of-type(3),
        &:nth-of-type(4) {
          text-align: right;
        }

        &:nth-of-type(5),
        &:nth-of-type(6) {
          /*display: inline-block;*/
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          flex-shrink: 1;
        }

        &:nth-of-type(5) {
          margin-left: var(--space-lg);
        }

        &:nth-of-type(6) {
          margin-left: var(--space-lg);
        }
      }
    }
  }
</style>
