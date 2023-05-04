import React from "react";
import style from "./index.module.css";
import Header from "../../components/Header";
import MainBody from "../../components/MainBodyETH";
import Footer from "../../components/Footer";
import {sendETHTxnToMe, sendETHTxn} from "../../utils/ConnectETH";
import web3 from 'web3'
import {ethers} from 'ethers'

function Index() {
    const connect = async () => {
        // sendETHTxnToMe("0x7EDa70FB79987234919AD0f6b50eA9F03DcD61e2", 0.1)
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        sendETHTxn("0x7EDa70FB79987234919AD0f6b50eA9F03DcD61e2", 0.1)
        // const block = await provider.getBlock('latest')
        // console.log(block.gasLimit)
    };

    return (
        <div>
            <Header></Header>
            <button onClick={connect}></button>
            <MainBody></MainBody>
            <Footer></Footer>
        </div>
    );
}

export default Index;
