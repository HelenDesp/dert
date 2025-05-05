import { Magic } from 'magic-sdk';
import { createConnector } from 'wagmi';

const createMagicConnector = () => {
  const magic = new Magic('pk_live_XXXXXXXXXXXXXXXX', {
    network: 'mainnet',
  });

  return createConnector(() => ({
    id: 'magic',
    name: 'Magic',
    ready: true,
    connect: async () => {
      const accounts = await magic.wallet.connectWithUI();
      return {
        account: accounts[0],
        chain: {
          id: 8453, // Base chain
          unsupported: false,
        },
        provider: magic.rpcProvider,
      };
    },
    disconnect: async () => {
      await magic.wallet.disconnect();
    },
    getAccount: async () => {
      const accounts = await magic.wallet.getAccounts();
      return accounts[0];
    },
    getProvider: async () => magic.rpcProvider,
    getChainId: async () => 8453,
  }));
};

export default createMagicConnector;
