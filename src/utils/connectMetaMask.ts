import {ConnectState} from "../components/MainBody";
// import {ethereum, web3} from "./chain";

type Params = {
    state: ConnectState
    setState: (val: ConnectState) => void
    address: string
    setAddress: (val: string) => void
}

export default class ConnectMetaMask {
    get connect(): () => Promise<void> {
        return this._connect;
    }
    
    private _connect = async () => {
        // console.log("Connect", ethereum)
        // if (!ethereum) window.location.href = "https://metamask.io/download/";
        // else {
        //     const accounts: string[] = await ethereum.request({method: 'eth_requestAccounts'});
        //     const chainId: number = await web3.eth.getChainId();

        // setAddress(accounts[0]);
        // setState(chainId == ChainId ?
        //     ConnectState.Connected : ConnectState.Switch);
        // }
    }
}