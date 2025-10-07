import { browser } from '$app/environment';
import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet } from '@reown/appkit/networks';
const PROJECT_ID = '1070829b0484d9bf22521a1c8fa93cf7';
let appKit = $state(undefined);
const kit = () => {
    return appKit;
};
const wallet = $state({
    kit,
    isConnected: false,
    chainId: 0,
    address: '',
    config: undefined
});
const initialize = (networks = [mainnet], metadata) => {
    // additionnal params that we may add is defaultNetwork
    // metadata looks like this :
    // metadata: {
    // 	name: 'SvelteKit Example',
    // 	description: 'SvelteKit Example using Ethers adapter',
    // 	url: 'https://reown.com/appkit',
    // 	icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
    // },
    const wagmiAdapter = new WagmiAdapter({
        networks,
        projectId: PROJECT_ID
    });
    wallet.config = wagmiAdapter.wagmiConfig;
    if (browser) {
        if (!PROJECT_ID)
            throw new Error('reown project id not set');
        appKit = createAppKit({
            adapters: [wagmiAdapter],
            projectId: PROJECT_ID,
            networks,
            metadata,
            themeVariables: {
                // '--w3m-font-family': 'IBM Plex Mono ',
                '--w3m-color-mix': '#000000',
                '--w3m-color-mix-strength': 10,
                '--w3m-border-radius-master': '1px',
                '--w3m-font-size-master': '14',
                '--w3m-accent': '#ff00c3'
            }
        });
        appKit?.subscribeAccount((_state) => {
            wallet.address = _state?.address;
            wallet.isConnected = _state?.isConnected;
        });
        appKit?.subscribeNetwork((_state) => {
            wallet.chainId = _state?.chainId;
        });
        // appKit?.subscribeState((_) => {});
    }
};
export { wallet, initialize };
