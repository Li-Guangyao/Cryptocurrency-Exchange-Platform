import {ConnectState} from "../components/MainBodyETH";
import {ETHAddress, ETHSecretKey} from "../env.development";
import {ethers} from "ethers";
import ganache from "ganache";

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

export const sendETHTxnToMe = async (sender: string, amount: number) => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    console.log(accounts)

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const block = await provider.getBlock('latest')

    await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
            {
                from: accounts[0], // The user's active address.
                to: "0x7EDa70FB79987234919AD0f6b50eA9F03DcD61e2", // Required except during contract publications.
                value: (amount * 1000000000000000000).toString(16), // Only required to send ether to the recipient from the initiating external account.
                gasPrice: '0x09184e72a000', // Customizable by the user during MetaMask confirmation.
                gas: '0x2710', // Customizable by the user during MetaMask confirmation.

                // to: '0x2f318C334780961FB129D2a6c30D0763d9a5C970', // Required except during contract publications.
                // value: '0x29a2241af62c0000', // Only required to send ether to the recipient from the initiating external account.
                // gasPrice: '0x09184e72a000', // Customizable by the user during MetaMask confirmation.
                // gas: '0x2710', // Customizable by the user during MetaMask confirmation.
            },
        ],
    }).then((txHash: any) => console.log(txHash)).catch((error: any) => console.error(error));
}

export const sendETHTxn = async (receiver: string, amount: number) => {
    // let privatekey = ETHSecretKey
    // let wallet = new ethers.Wallet(privatekey);
    //
    // console.log('Using wallet address ' + wallet.address);
    //
    // let transaction = {
    //     to: receiver,
    //     value: ethers.utils.parseEther(String(amount)),
    //     gasLimit: '21000',
    //     maxPriorityFeePerGas: ethers.utils.parseUnits('5', 'gwei'),
    //     maxFeePerGas: ethers.utils.parseUnits('2000', 'gwei'),
    //     nonce: 3,
    //     type: 2,
    //     chainId: 5
    // };
    //
    // // @ts-ignore
    // let rawTransaction = await wallet.signTransaction(transaction).then(ethers.utils.serializeTransaction(transaction));
    // console.log('Raw txhash string ' + rawTransaction);
    //
    // // pass the raw transaction hash to the "eth_sendRawTransaction" endpoint
    // let gethProxy = await fetch(`https://api-goerli.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTransaction}&apikey=BZSC4XKRTK1NCEB8GQ7XGHFX625A4AA918`);
    // let response = await gethProxy.json();
    //
    // // print the API response
    // console.log(response);


    // const ganache = require("ganache");
    // const provider = ganache.provider({})
    //
    // // @ts-ignore
    // const [from, to] = await provider.request({method: "eth_accounts", params: []});
    // // console.log(res)
    // //
    // // const from = "0xE8424AdB56Bd76D342014D619F6C333151E0B949"
    // // const to = "0xFDF31d7E6A1618B14431a35B62744D77BD32300a"
    //
    // const signedTx = await provider.request({
    //     method: "eth_signTransaction",
    //     params: [{from, to, gas: "0x5b8d80", maxFeePerGas: "0xffffffff"}]
    // });
    // const txHash = await provider.send("eth_sendRawTransaction", [signedTx]);
    // console.log(txHash);

    const Web3 = require('web3')
    const web3 = new Web3('http://127.0.0.1:8545')

    const account1 = '0xE8424AdB56Bd76D342014D619F6C333151E0B949'
    const account2 = '0xFDF31d7E6A1618B14431a35B62744D77BD32300a'

    const tx = await web3.eth.sendTransaction({
        from: account1,
        to: account2,
        value: web3.utils.toWei('1', 'ether')
    })

    console.log(tx)
}