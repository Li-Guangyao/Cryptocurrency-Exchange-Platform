import {ConnectState} from "../components/MainBody";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Button} from 'antd'

type Params = {
    state: ConnectState
    setState: (val: ConnectState) => void
    address: string
    setAddress: (val: string) => void
}

export default class ConnectETH {
    get connect(): () => Promise<string> {
        // @ts-ignore
        return this._connect;
    }

    private _connect = async () => {
        console.log("Connect", "ethereum")
        // const provider = await detectEthereumProvider();
        // console.log(provider)

        if (!window.ethereum) window.location.href = "https://metamask.io/download/";
        else {
            const accounts: string[] = await window.ethereum.request({method: 'eth_requestAccounts'});
            const balance = formatBalance(await window.ethereum!.request(
                {
                    method: "eth_getBalance",
                    params: [accounts[0], "latest"],
                }))
            // const chainId: number = await web3.eth.getChainId();
            console.log(accounts, balance)
            return {address: accounts[0], balance: Number(balance)};

            // setAddress(accounts[0]);
            // setState(chainId == ChainId ?
            //     ConnectState.Connected : ConnectState.Switch);
        }
    }

    private _signTxn = async () => {

    }

    // private _handleAccountsChanged = (accounts: []) => {
    //     if (accounts.length === 0) {
    //         // MetaMask is locked or the user has not connected any accounts.
    //         console.log('Please connect to MetaMask.');
    //     } else if (accounts[0] !== currentAccount) {
    //         // Reload your interface with accounts[0].
    //         currentAccount = accounts[0];
    //         // Update the account displayed (see the HTML for the connect button)
    //         showAccount.innerHTML = currentAccount;
    //     }
    // }
}

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
}

export const sendETHTxnToMe = (sender: string, amount: number) => {
    
}

export const sendETHTxn = (receiver: string, amount: number) => {

}


// export const ConnectBtn = () => {
//     return (
//         <ConnectButton.Custom>
//             {({
//                   account,
//                   chain,
//                   openAccountModal,
//                   openChainModal,
//                   openConnectModal,
//                   authenticationStatus,
//                   mounted,
//               }) => {
//                 // Note: If your app doesn't use authentication, you
//                 // can remove all 'authenticationStatus' checks
//                 const ready = mounted && authenticationStatus !== 'loading';
//                 const connected =
//                     ready &&
//                     account &&
//                     chain &&
//                     (!authenticationStatus ||
//                         authenticationStatus === 'authenticated');
//
//                 return (
//                     <div
//                         {...(!ready && {
//                             'aria-hidden': true,
//                             'style': {
//                                 opacity: 0,
//                                 pointerEvents: 'none',
//                                 userSelect: 'none',
//                             },
//                         })}
//                     >
//                         {(() => {
//                             if (!connected) {
//                                 return (
//                                     <button onClick={openConnectModal} type="button">
//                                         Connect Wallet
//                                     </button>
//                                 );
//                             }
//
//                             if (chain.unsupported) {
//                                 return (
//                                     <button onClick={openChainModal} type="button">
//                                         Wrong network
//                                     </button>
//                                 );
//                             }
//
//                             return (
//                                 <div style={{display: 'flex', gap: 12}}>
//                                     <button
//                                         onClick={openChainModal}
//                                         style={{display: 'flex', alignItems: 'center'}}
//                                         type="button"
//                                     >
//                                         {chain.hasIcon && (
//                                             <div
//                                                 style={{
//                                                     background: chain.iconBackground,
//                                                     width: 12,
//                                                     height: 12,
//                                                     borderRadius: 999,
//                                                     overflow: 'hidden',
//                                                     marginRight: 4,
//                                                 }}
//                                             >
//                                                 {chain.iconUrl && (
//                                                     <img
//                                                         alt={chain.name ?? 'Chain icon'}
//                                                         src={chain.iconUrl}
//                                                         style={{width: 12, height: 12}}
//                                                     />
//                                                 )}
//                                             </div>
//                                         )}
//                                         {chain.name}
//                                     </button>
//
//                                     <button onClick={openAccountModal} type="button">
//                                         {account.displayName}
//                                         {account.displayBalance
//                                             ? ` (${account.displayBalance})`
//                                             : ''}
//                                     </button>
//                                 </div>
//                             );
//                         })()}
//                     </div>
//                 );
//             }}
//         </ConnectButton.Custom>
//     )
// }