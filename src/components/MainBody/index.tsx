import React, {useEffect, useState} from "react";
import style from "./index.module.css";

import {Select, Button, Input} from "antd";
import "antd/dist/reset.css";

import connectMetaMask from "../../utils/connectMetaMask";
import connectAlgoSigner from "../../utils/connectAlgoSigner";

// enum Nettype {
//     Testnet,
//     Mainnet,
//     Betanet,
// }

const chainOptions = [{value: "0", label: "Ethereum"},
    {value: "1", label: "Algorand"}]

const currencyOptions = [{value: "Goerli", label: "Goerli"},
    {value: "Algo", label: "Algo"}]

export enum ConnectState {
    Unconnected, Connected
}

const changeNumber = (e: string | number) => {
    return (Number(e) + 1) % 2
}

export default function MainBody() {
    const [sender, setSender] = useState("")
    const [receiver, setReceiver] = useState("")
    const [showInputForReceiver, setShowInputForReceiver] = useState(false)
    const [exchangeAmount, setExchangeAmount] = useState(0) // from sender

    const launchTrans = () => {
    };

    const [currSelected, setCurrSelected] = useState(0)

    const changeChain = (e: any, pos: string) => {
        if (pos == 'left') {
            setCurrSelected(Number(e))
        } else if (pos == 'right') {
            setCurrSelected(changeNumber(e))
        }
    }

    const enterReceiver = () => {

    }

    const leftConnectWallet = () => {
        if (currSelected == 0) {
            let metaMask = new connectMetaMask()
            metaMask.connect().then(r =>
                console.log(r)
            )
        } else if (currSelected == 1) {
            let algoSigner = new connectAlgoSigner();
            algoSigner.connect().then(r => {
                setSender(r)
            });
        }
    }

    const rightConnectWallet = () => {
        if (currSelected == 1) {
            let metaMask = new connectMetaMask()
            metaMask.connect().then(r =>
                console.log(r)
            )
        } else if (currSelected == 0) {
            let algoSigner = new connectAlgoSigner();
            algoSigner.connect().then(r => {
                setReceiver(r)
            });
        }
    }

    const inputExchangeAmount = (side: String, e: any) => {
        console.log(e)
        // 需要测试是否为数值格式
        let amount = e.target.defaultValue
        if (side == 'left') {
            setExchangeAmount(amount)
        } else {
            setExchangeAmount(e.target.defaultValue)
        }
    }

    return (
        <div className={style["container"]}>
            <div className={style["central-area"]}>
                <div className={style["exchange-block"]}>
                    <div className={style["left"]}>
                        <div className={style["title"]}>Source</div>

                        <div className={style["connect-wallet"]}>
                            <Select className={style["connect-wallet-select"]}
                                    defaultValue={chainOptions[currSelected].label}
                                    value={chainOptions[currSelected].label}
                                    onSelect={(e) => {
                                        changeChain(e, "left")
                                    }}
                                    options={chainOptions}
                            />

                            <div className={style["margin"]}></div>
                            <Button className={style["connect-wallet-btn"]} onClick={leftConnectWallet}>
                                CONNECT WALLET
                            </Button>
                        </div>

                        <div className={style["select-asset"]}>
                            <div className={style["select-aeest-tip"]}>
                                Select Asset
                            </div>
                            <div className={style["margin"]}></div>

                            <Select
                                defaultValue={currencyOptions[currSelected]}
                                value={currencyOptions[currSelected]}
                                options={currencyOptions}
                            />
                        </div>

                        <div className={style["input-amount"]}>
                            <div className={style["input-amount-tip"]}>
                                Input Exchange Amount
                            </div>
                            <div
                                className={style["input-amount-input-wrapper"]}
                            >
                                <Input
                                    className={style["input-amount-input"]}
                                    placeholder={"0.00"}
                                    onChange={(e) => {
                                        inputExchangeAmount('left', e)
                                    }}
                                ></Input>
                            </div>
                            <div
                                className={
                                    style["input-amount-account-balance"]
                                }
                            >
                                The Balance of xxx is xxx
                            </div>
                        </div>

                        <div className={style["bottom-area"]}>
                            <div className={style["divide-bar"]}></div>
                            <div className={style["exchange-fee"]}>
                                <div className={style["exchange-fee-tip"]}>
                                    Exchange Fee
                                </div>
                                <div className={style["exchange-fee-amount"]}>
                                    xxx
                                </div>
                            </div>
                            <div className={style["gas-fee"]}>
                                <div className={style["gas-fee-tip"]}>
                                    Gas Fee
                                </div>
                                <div className={style["gas-fee-amount"]}>
                                    xxx
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style["middle"]}>
                        <img
                            className={style["arrow-right"]}
                            src={require("../../sources/arrowright.png")}
                        />
                    </div>
                    <div className={style["right"]}>
                        <div className={style["title"]}>Destination</div>
                        <div className={style["connect-wallet"]}>
                            {showInputForReceiver ? <Input placeholder="Input Receiver Address"/>
                                : <Select
                                    defaultValue={chainOptions[changeNumber(currSelected)]}
                                    value={chainOptions[changeNumber(currSelected)]}
                                    onSelect={(e) => {
                                        changeChain(e, "right")
                                    }}
                                    options={chainOptions}
                                />
                            }
                            <div className={style["margin"]}></div>

                            <div className={style["connect-wallet-btn-wrapper"]}>
                                {showInputForReceiver ? <Button className={style["connect-wallet-btn"]}
                                                                onClick={() => {
                                                                    setShowInputForReceiver(!showInputForReceiver)
                                                                }}>
                                        Cancel address </Button>
                                    :
                                    <>
                                        <Button className={style["connect-wallet-btn"]} onClick={rightConnectWallet}>
                                            CONNECT WALLET
                                        </Button>
                                        <Button className={style["connect-wallet-btn"]} onClick={() => {
                                            setShowInputForReceiver(!showInputForReceiver)
                                        }}>
                                            ENTER ADDRESS
                                        </Button>
                                    </>}
                            </div>
                        </div>

                        <div className={style["select-asset"]}>
                            <div className={style["select-aeest-tip"]}>
                                Received Asset
                            </div>
                            <div className={style["margin"]}></div>
                            <Select
                                defaultValue={currencyOptions[(Number(currSelected) + 1) % 2]}
                                value={currencyOptions[(Number(currSelected) + 1) % 2]}
                                options={currencyOptions}
                            />
                        </div>

                        <div className={style["input-amount"]}>
                            <div className={style["input-amount-tip"]}>
                                Received Amount
                            </div>
                            <div
                                className={style["input-amount-input-wrapper"]}
                            >
                                <Input
                                    className={style["input-amount-input"]}
                                    placeholder={"0.00"}
                                    onInput={(e) => {
                                        inputExchangeAmount('right', e)
                                    }}
                                >
                                </Input>
                            </div>
                            <div
                                className={
                                    style["input-amount-account-balance"]
                                }
                            ></div>
                        </div>

                        <div className={style["bottom-area"]}>
                            <div className={style["divide-bar"]}></div>

                            <div className={style["gas-fee"]}>
                                <div className={style["gas-fee-tip"]}>
                                    XXXX Gas Fee
                                </div>
                                <div className={style["gas-fee-amount"]}>
                                    xxx
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    className={style["launch-trans-btn"]}
                    onClick={launchTrans}
                >
                    LAUNCH TRANSACTION
                </Button>
            </div>
        </div>
    )
        ;
}

