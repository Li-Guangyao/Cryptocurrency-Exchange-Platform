/*global AlgoSigner*/

import React, {useEffect, useRef, useState} from "react";

import style from "./index.module.css";
import {useLocation, useNavigate} from "react-router-dom";

// import algosdk from 'algosdk';

const NavItems = [
    {name: "BUY ALGO", path: "/buy"},
    {name: "ALGO&ETH", path: "/ETH"},
    {name: "ALGO&BTC", path: "/BTC"},
]


function Header() {
    const location = useLocation();
    const path = location.pathname;

    const navigate = useNavigate();

    // const ConnectWallet = async () => {
    //     let signer = null;
    //
    //     let provider;
    //     if (window.ethereum == null) {
    //         console.log("MetaMask not installed; using read-only defaults");
    //         provider = ethers.getDefaultProvider("");
    //     } else {
    //         // Connect to the MetaMask EIP-1193 object. This is a standard
    //         // protocol that allows Ethers access to make all read-only
    //         // requests through MetaMask.
    //         provider = new ethers.BrowserProvider(window.ethereum);
    //
    //         // It also provides an opportunity to request access to write
    //         // operations, which will be performed by the private key
    //         // that MetaMask manages for the user.
    //         signer = await provider.getSigner();
    //     }
    // };

    let userAccount = useRef();

    const connectAlgoSigner = async () => {
        // lgy-浏览器装了ALgoSigner之后，会自动调取
        await window.algorand.connect();
        await getUserAccount();
    };

    const getUserAccount = async () => {
        // lgy-获取一个数组，里面是全部的testnet账户
        userAccount.current = await window.algorand.accounts({
            ledger: "TestNet",
        });
        console.log(userAccount);
    };


    return (
        <div className={style["container"]}>
            <div className={style['left']}>
                <div className={style['logo']}>Rocket Exchange
                </div>
                <div className={style['options']}>
                    {
                        NavItems.map((navItem, i) => {
                            let className = ((path == navItem.path) || (path == "/" && navItem.path == "/buy")) ? style['option'] + " " + style['option-selected'] : style['option'];
                            return <div className={className} onClick={() => {
                                navigate(navItem.path)
                            }}>{navItem.name}
                            </div>
                        })
                    }
                </div>
            </div>

            <div className={style["right"]}>
                <div className={style["address"]}>{}</div>
                <div className={style["net-sign"]}></div>
                <div
                    className={style["connect-wallet-btn"]}
                    onClick={connectAlgoSigner}
                >
                    Testnet
                </div>
            </div>
        </div>
    );
}

export default Header;
