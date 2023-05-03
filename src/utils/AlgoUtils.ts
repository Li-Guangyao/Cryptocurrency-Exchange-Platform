import {Account} from "algosdk";
import algosdk from "algosdk";
import {
    Purestake_Algorand_Api_Key,
    Purestake_Algorand_Testnet_Algod_URL,
    AlgoMnemonic,
} from "../env.development";

class AlgoUtils {
    private static algodToken = Purestake_Algorand_Api_Key;
    private static algodServer = Purestake_Algorand_Testnet_Algod_URL;
    private static algodPort = '';

    private static algoAccount: Account = algosdk.mnemonicToSecretKey(AlgoMnemonic)
    private static algodClient = new algosdk.Algodv2({
        'X-API-Key': this.algodToken
    }, this.algodServer, this.algodPort);

    static getAlgodClient() {
        return this.algodClient;
    }

    static async transferAlgo(receiver: string, amount: number) {
        console.log("transfer " + amount + " Algo to " + receiver)
        try {
            const suggestedParams = await this.algodClient.getTransactionParams().do();
            const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: this.algoAccount.addr,
                to: receiver,
                amount: amount * 1000000,
                suggestedParams,
                note: new Uint8Array(0),
            });

            const signedTxn = ptxn.signTxn(this.algoAccount.sk);
            const {txId} = await this.algodClient.sendRawTransaction(signedTxn).do();
            const result = await algosdk.waitForConfirmation(this.algodClient, txId, 2);

            console.log(result);
            console.log(`Transaction Information: ${result.txn}`);

            return txId;
        } catch (err) {
            console.log(err)
        }
    }
}

export default AlgoUtils;