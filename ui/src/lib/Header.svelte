<script>
import { page } from "$app/stores";
import { sepolia } from "@reown/appkit/networks";
import { Wallet } from ".";

export let title = "";
export let nav = [];
</script>

<header>
    <nav class="framed">
        <a href="/">
            <hgroup>
                <h1>
                    DG<span>@</span>{title}
                </h1>
                <span>&nbsp;»_&nbsp;</span>
            </hgroup>
        </a>

    {#if nav.length > 0}
        <ul>
        {#each nav as entry}
            <li>
            <a
                class={entry.url == $page.url.pathname ? "active" : ""}
                href={entry.url}>{entry.label}</a
            >
            </li>
        {/each}
        </ul>
    {/if}
  </nav>

  <Wallet networks={[sepolia]}></Wallet>
</header>

<style>
    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    header {
        font-size: 0.9rem;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-between;
        margin-bottom: var(--space-md);
        position: relative;
        nav {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            flex-grow: 10;
        }
        hgroup {
        display: flex;
        h1 {
            text-transform: uppercase;
            span {
            color: var(--foreground-subtle);
            }
        }

        span {
            color: var(--accent);
        }
    }

    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: flex-end;
      li {
        position: relative;
        margin-right: var(--space-sm);

        &:last-of-type {
          margin-right: 0;
        }

        a {
          text-transform: uppercase;
          /* font-size: 0.8em; */
          border-bottom: none;
          padding: 4px;
          color: var(--foreground);
          text-decoration-thickness: 0.75px;
          /* text-decoration-style: double; */

          /* color: var(--foreground-subtle); */
          &:hover {
            /* color: var(--accent); */
            text-decoration: underline;
            text-decoration-color: var(--accent);
            /* text-decoration-style: double; */
            text-decoration-line: line-through;
            /* text-decoration-thickness: 2px; */
          }

          &.active {
            color: var(--accent);
            text-decoration-color: var(--accent);
            /* text-decoration-style: double; */
            &:hover {
              text-decoration: none;
            }
          }
        }
      }

      position: relative;
      &::after {
        content: "";
        background: var(--pink);
        display: inline-block;
        width: 1px;
        height: 80%;
        position: absolute;
        top: 8%;
        right: -10px;
        animation: 1s blink step-end infinite;
      }
    }
  }
</style>
