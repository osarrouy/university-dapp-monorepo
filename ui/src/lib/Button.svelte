<script>
const buttonProps = {
	class: [$$restProps.class],
};

export let loading = false;
export let disabled = false;
</script>

<button
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:focus
  {...buttonProps}
  disabled={disabled ? true : false}
  class={loading ? "loading" : ""}
>
  <slot />
</button>

<style lang="css">
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

  button {
    position: relative;

    &.loading {
      &::before {
        content: "";
        background-color: var(--background-subtle);
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0.5;
      }

      &::after {
        content: "";
        border: 1px solid var(--background-subtle);
        border-bottom-color: var(--accent);
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        bottom: calc(50% - 10px);
        left: calc(50% - 10px);
        width: 20px;
        height: 20px;
        animation: rotation 1s linear infinite;
      }
    }
  }
</style>
