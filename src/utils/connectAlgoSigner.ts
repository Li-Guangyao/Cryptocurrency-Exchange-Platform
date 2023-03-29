// import {ethereum, web3} from "./chain";
import algosdk from 'algosdk'

export default class connectAlgoSigner {
    get connect(): () => Promise<any> {
        return this._connect;
    }

    private _connect = async () => {
        console.log("Connect", 'algoSigner')
        if (!window.algorand) window.location.href = "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm";
        else {
            // const accounts: string[] = await ethereum.request({method: 'eth_requestAccounts'});
            // const chainId: number = await web3.eth.getChainId();

            let algoConnectiion = await window.algorand.enable({
                genesisID: "testnet-v1.0",
            });

            return algoConnectiion.accounts[0];


            // setAddress(accounts[0]);
            // setState(chainId == ChainId ?
            //     ConnectState.Connected : ConnectState.Switch);
        }
    }
}

// // Connect to AlgoSigner
// await window.algorand.enable();
//
// // Create an Algod client to get suggested transaction params
// let client = new algosdk.Algodv2(token, server, port, headers);
// let suggestedParams = await client.getTransactionParams().do();
//
// // Use the JS SDK to build a Transaction
// let sdkTxn = new algosdk.Transaction({
//     to: 'RECEIVER_ADDRESS',
//     from: 'SENDER_ADDRESS',
//     amount: 100,
//     ...suggestedParams,
// });
//
// // Get the binary and base64 encode it
// let binaryTxn = sdkTxn.toByte();
// let base64Txn = algorand.encoding.msgpackToBase64(binaryTxn);
//
// let signedTxns = await algorand.signTxns([
//     {
//         txn: base64Txn,
//     },
// ]);
