import React from "react";
import style from "./index.module.css";

import { Select, Button, Input } from "antd";
import "antd/dist/reset.css";

enum Nettype {
    Testnet,
    Mainnet,
    Betanet,
}

const testnet = {
    cryptocurrency: [],
};

const mainnet = {};

function MainBody() {
    const launchTrans = () => {};

    return (
        <div className={style["container"]}>
            <div className={style["central-area"]}>
                <div className={style["exchange-block"]}>
                    <div className={style["left"]}>
                        <div className={style["title"]}>Source</div>

                        <div className={style["connect-wallet"]}>
                            <Select
                                className={style["connect-wallet-select"]}
                                defaultValue="ETH"
                                // onChange={handleChange}
                                options={[
                                    { value: "ETH", label: "ETH" },
                                    { value: "lucy", label: "Lucy" },
                                    { value: "Yiminghe", label: "yiminghe" },
                                    {
                                        value: "disabled",
                                        label: "Disabled",
                                        disabled: true,
                                    },
                                ]}
                            />

                            <div className={style["margin"]}></div>
                            <Button className={style["connect-wallet-btn"]}>
                                CONNECT WALLET
                            </Button>
                        </div>

                        <div className={style["select-asset"]}>
                            <div className={style["select-aeest-tip"]}>
                                Select Asset
                            </div>
                            <div className={style["margin"]}></div>

                            <Select
                                defaultValue="ETH"
                                // onChange={handleChange}
                                options={[
                                    { value: "ETH", label: "ETH" },
                                    { value: "lucy", label: "Lucy" },
                                    { value: "Yiminghe", label: "yiminghe" },
                                    {
                                        value: "disabled",
                                        label: "Disabled",
                                        disabled: true,
                                    },
                                ]}
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
                            <Select
                                defaultValue="ETH"
                                // onChange={handleChange}
                                options={[
                                    { value: "ETH", label: "ETH" },
                                    { value: "lucy", label: "Lucy" },
                                    { value: "Yiminghe", label: "yiminghe" },
                                    {
                                        value: "disabled",
                                        label: "Disabled",
                                        disabled: true,
                                    },
                                ]}
                            />
                            <div className={style["margin"]}></div>

                            <div
                                className={style["connect-wallet-btn-wrapper"]}
                            >
                                <Button className={style["connect-wallet-btn"]}>
                                    CONNECT WALLET
                                </Button>
                                <Button className={style["connect-wallet-btn"]}>
                                    ENTER ADDRESS
                                </Button>
                            </div>
                        </div>

                        <div className={style["select-asset"]}>
                            <div className={style["select-aeest-tip"]}>
                                Received Asset
                            </div>
                            <div className={style["margin"]}></div>
                            <Select
                                defaultValue="ETH"
                                // onChange={handleChange}
                                options={[
                                    { value: "ETH", label: "ETH" },
                                    { value: "lucy", label: "Lucy" },
                                    { value: "Yiminghe", label: "yiminghe" },
                                    {
                                        value: "disabled",
                                        label: "Disabled",
                                        disabled: true,
                                    },
                                ]}
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
                                ></Input>
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
    );
}

export default MainBody;
