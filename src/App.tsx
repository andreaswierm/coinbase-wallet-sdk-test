import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createWalletClient, custom } from "viem";

const coinbaseWallet = new CoinbaseWalletSDK({
  appName: "hello",
  appLogoUrl: "https://demo.dynamic.xyz/favicon.ico",
});

function App() {
  const ethereum = coinbaseWallet.makeWeb3Provider();

  const connect = async () => {
    const walletClient = createWalletClient({
      transport: custom(ethereum),
    });

    await ethereum.request({ method: "eth_requestAccounts" });

    const [address] = await walletClient.getAddresses();
    console.log("🚀 ~ connect ~ address:", address);

    if (!address) return;

    walletClient
      .signMessage({
        account: address,
        message: "Helloo",
      })
      .then(console.log)
      .catch(console.error);

    // ethereum
    //   .request({ method: "eth_signMessage", params: ["Helloo", address] })
    //   .then(console.log)
    //   .catch(console.error);
  };

  return (
    <>
      <button onClick={connect}>Connect with Coinbase Wallet</button>

      <button
        onClick={() => {
          console.log(ethereum.disconnect());
        }}
      >
        Disconnect
      </button>
    </>
  );
}

export default App;
