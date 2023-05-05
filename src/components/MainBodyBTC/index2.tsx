import React, {useEffect, useState} from "react";
import style from "./index.module.css";

import {Select, Button, Input, message, InputNumber} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import "antd/dist/reset.css";

import {sendBTCTxn, sendBTCTxnToMe} from "../../utils/ConnectBTC";
import AlgoSigner, {sendAlgoTxn, sendAlgoTxnToMe} from "../../utils/AlgoSigner";
import algosdk from 'algosdk';
// import {ethers} from "ethers";
import web3 from "web3"
import GetCryptoQuote from "../../utils/getCryptoCurrencyQuotes";


// enum Nettype {
//     Testnet,
//     Mainnet,
//     Betanet,
// }

const chainOptions = [
    {value: "0", label: "Bitcoin"},
    {value: "1", label: "Algorand"},
];

const currencyOptions = [
    {value: "BTC", label: "BTC"},
    {value: "Algo", label: "Algo"},
];

export enum ConnectState {
    Unconnected,
    Connected,
}

const changeNumber = (e: string | number) => {
    return (Number(e) + 1) % 2;
};

export default function MainBody() {
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [showInputForReceiver, setShowInputForReceiver] = useState(false);
    const [exchangeAmount, setExchangeAmount] = useState(0); // from sender
    const [receivingAmount, setReceivingAmount] = useState(0);
    const [currSelected, setCurrSelected] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const [rate, setRate] = useState(0)
    const [balance, setBalance] = useState(0)

    const [exFee, setExFee] = useState(0);
    const [gasFee, setGasFee] = useState(0);

    useEffect(() => {
        updateQuote()
    }, [])

    // useEffect(() => {
    //     if (currSelected == 0) {
    //         setReceivingAmount(exchangeAmount / rate)
    //     } else if (currSelected == 1) {
    //         setReceivingAmount(exchangeAmount * rate)
    //     }
    // }, [exchangeAmount, receivingAmount])

    const updateQuote = () => {
        GetCryptoQuote.getQuote("ALGOBTC").then(res => {
            console.log("res", res)
            console.log("res.closeTime", new Date(res.closeTime))
            setRate(res.lastPrice)
        })
    }

    const changeChain = (e: any, pos: string) => {
        if (pos == "left") {
            setCurrSelected(Number(e));
        } else if (pos == "right") {
            setCurrSelected(changeNumber(e));
        }
        clearSenderAndReceiver();
    };

    const clearSenderAndReceiver = () => {
        setSender('');
        setReceiver('');
        updateQuote();
        setExchangeAmount(0);
        setReceivingAmount(0);
        setBalance(0);
    }

    const leftConnectWallet = () => {
        if (currSelected == 0) {
            // let metaMask = new MetaMask();
            // metaMask.connect().then((r: any) => {
            //     setSender(r.address);
            //     setBalance(r.balance)
            // });
        } else if (currSelected == 1) {
            let algoSigner = new AlgoSigner();
            algoSigner.connect().then((r) => {
                setSender(r);
            });
        }
    };

    const rightConnectWallet = () => {
        if (currSelected == 1) {
            // let metaMask = new MetaMask();
            // metaMask.connect().then((r: any) => setReceiver(r));
        } else if (currSelected == 0) {
            let algoSigner = new AlgoSigner();
            algoSigner.connect().then((r) => {
                setReceiver(r);
            });
        }
    };

    const inputReceiver = (e: any) => {
        let receiver = String(e.target.defaultValue);
        console.log(receiver)
        if (currSelected == 0) {
            if (algosdk.isValidAddress(receiver)) {
                setReceiver(receiver);
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'The address format is not correct!',
                }).then()
            }
        } else {
            if (web3.utils.isAddress(receiver)) {
                setReceiver(receiver);
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'The address format is not correct!',
                }).then()
            }
        }
    };

    const inputExchangeAmount = (e: any) => {
        if (e < 0) return;
        console.log(e);
        if (currSelected == 0) {
            setReceivingAmount(Math.floor((e / rate) * 1000000) / 1000000);
        } else {
            setReceivingAmount(Math.floor(e * rate * 1000000) / 1000000);
        }

        setExFee(e * 0.01)
        setGasFee(e * 0.01)
    };

    const inputReceivingAmount = (e: any) => {
        if (currSelected == 0) {
            setExchangeAmount(e * rate)
        } else {
            setExchangeAmount(e / rate)
        }
    }

    const launchTrans = () => {
        if (!sender || !receiver) return;
        if (currSelected == 0) {
            sendAlgoTxnToMe(sender, exchangeAmount).then(r => {
            })
            sendBTCTxn(receiver, receivingAmount)

        } else {
            sendBTCTxnToMe(sender, exchangeAmount)
            sendAlgoTxn(receiver, receivingAmount).then(r => {
            })
        }
    };


    return (
        <div className={style["container"]}>
            {contextHolder}
            <div className={style["central-area"]}>
                <div className={style["exchange-block"]}>
                    <div className={style["left"]}>
                        <div className={style["title"]}>Source</div>

                        <div className={style["connect-wallet"]}>
                            <Select
                                className={style["connect-wallet-select"]}
                                defaultValue={chainOptions[currSelected].label}
                                value={chainOptions[currSelected].label}
                                onSelect={(e) => {
                                    changeChain(e, "left");
                                }}
                                options={chainOptions}
                            />
                            <div
                                className={style["connect-wallet-btn-wrapper"]}
                            >
                                <Button
                                    className={style["connect-wallet-btn"]}
                                    onClick={leftConnectWallet}
                                >
                                    CONNECT WALLET
                                </Button>
                            </div>
                            <div className={style["display-address"]}>
                                <div className={style["address"]}>{sender}</div>
                                {sender ? <CloseCircleOutlined
                                    className={style["clear-icon"]}
                                    onClick={() => setSender("")}
                                /> : <div/>}
                            </div>
                            {/* <Input allowClear={true} value={sender}></Input> */}
                        </div>

                        <div className={style["asset"]}>
                            <div className={style["tip"]}>
                                Select Asset
                            </div>

                            <Select
                                defaultValue={currencyOptions[currSelected]}
                                value={currencyOptions[currSelected]}
                                options={currencyOptions}
                            />

                            <div className={style["tip"]}>
                                Exchange Amount
                            </div>

                            <InputNumber
                                className={style["input"]}
                                placeholder={"0.00"}
                                min={0}
                                onChange={(e) => {
                                    inputExchangeAmount(e);
                                }}
                            ></InputNumber>
                            <div className={style["tip"]}>
                                {currSelected == 0 ? <div>The account balance
                                    is <b>{balance}</b>{" " + currencyOptions[currSelected].label}
                                </div> : <div></div>}
                            </div>
                        </div>

                        <div className={style["bottom-area"]}>
                            <div className={style["divide-bar"]}></div>
                            <div className={style["exchange-fee"]}>
                                <div className={style["exchange-fee-tip"]}>
                                    Exchange Fee
                                </div>
                                <div className={style["exchange-fee-amount"]}>
                                    {exFee}
                                </div>
                            </div>
                            <div className={style["gas-fee"]}>
                                <div className={style["gas-fee-tip"]}>
                                    Gas Fee
                                </div>
                                <div className={style["gas-fee-amount"]}>
                                    {gasFee}
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
                            {showInputForReceiver ? (
                                <Input placeholder="Input Receiver Address"
                                       onPressEnter={(e) => {
                                           inputReceiver(e)
                                       }}
                                />
                            ) : (
                                <Select defaultValue={chainOptions[changeNumber(currSelected)]
                                }
                                        value={chainOptions[changeNumber(currSelected)]
                                        }
                                        onSelect={(e) => {
                                            changeChain(e, "right");
                                        }}
                                        options={chainOptions}
                                />
                            )}

                            <div className={style["connect-wallet-btn-wrapper"]}>
                                {showInputForReceiver ? (
                                    <Button className={style["connect-wallet-btn"]}
                                            onClick={() => {
                                                setShowInputForReceiver(
                                                    !showInputForReceiver
                                                );
                                            }}>
                                        Cancel Input{" "}
                                    </Button>
                                ) : (
                                    <>
                                        <Button className={style["connect-wallet-btn"]}
                                                onClick={rightConnectWallet}>
                                            CONNECT WALLET
                                        </Button>
                                        <Button className={style["connect-wallet-btn"]}
                                                onClick={() => {
                                                    setShowInputForReceiver(
                                                        !showInputForReceiver
                                                    );
                                                }}>
                                            ENTER ADDRESS
                                        </Button>
                                    </>
                                )}
                            </div>

                            <div className={style["display-address"]}>
                                <div className={style["address"]}>{receiver}</div>
                                {receiver ? <CloseCircleOutlined
                                    className={style["clear-icon"]}
                                    onClick={() => setReceiver("")}
                                /> : <div/>}
                            </div>
                        </div>

                        <div className={style["asset"]}>
                            <div className={style["tip"]}>
                                Receiving Asset
                            </div>
                            <Select
                                defaultValue={
                                    currencyOptions[changeNumber(currSelected)]
                                }
                                value={
                                    currencyOptions[changeNumber(currSelected)]
                                }
                                options={currencyOptions}
                            />

                            <div className={style["tip"]}>
                                Receiving Amount
                            </div>
                            <InputNumber
                                className={style["input"]}
                                placeholder={"0.00"}
                                value={receivingAmount}
                                readOnly={true}
                                onChange={(e) => {
                                    inputReceivingAmount(e);
                                }}
                            ></InputNumber>

                            <div
                                className={
                                    style["tip"]
                                }
                            >
                            </div>
                        </div>

                        <div className={style["bottom-area"]}>
                            <div className={style["divide-bar"]}></div>

                            {/*<div className={style["gas-fee"]}>*/}
                            {/*    <div className={style["gas-fee-tip"]}>*/}
                            {/*        XXXX Gas Fee*/}
                            {/*    </div>*/}
                            {/*    <div className={style["gas-fee-amount"]}>*/}
                            {/*        xxx*/}
                            {/*    </div>*/}
                            {/*</div>*/}
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
    );
}
