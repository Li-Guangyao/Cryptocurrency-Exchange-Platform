import React from 'react';
import style from "./index.module.css"

import type {MenuProps} from 'antd';
import {Button, Dropdown, Input} from 'antd';
import 'antd/dist/reset.css';

function MainBody() {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];

    return (
        <div className={style["container"]}>
            <div className={style["exchange-block"]}>
                <div className={style['left']}>
                    <div className={style['title']}>Source</div>

                    <div className={style['connect-wallet']}>
                        <Dropdown menu={{items}}>
                            <Button>bottomLeft</Button>
                        </Dropdown>
                        <Button>CONNECT WALLET</Button>
                    </div>

                    <div className={style['select-asset']}>
                        <div className={style['select-aeest-tip']}>Select Asset</div>
                        <Dropdown menu={{items}}>
                            <Button>bottomLeft</Button>
                        </Dropdown>
                    </div>

                    <div className={style['input-amount']}>
                        <div className={style['input-amount-tip']}>Input Exchange Amount</div>
                        <div className={style['input-amount-input-wrapper']}>
                            <Input className={style['input-amount-input']}></Input>
                        </div>
                        <div className={style['input-amount-account-balance']}>The Balance of xxx is xxx</div>
                    </div>

                    <div className={style['bottom-area']}>
                        <div className={style['divide-bar']}></div>
                        <div className={style['exchange-fee']}>
                            <div className={style['exchange-fee-tip']}>Exchange Fee</div>
                            <div className={style['exchange-fee-amount']}>xxx</div>
                        </div>
                        <div className={style['gas-fee']}>
                            <div className={style['gas-fee-tip']}>Gas Fee</div>
                            <div className={style['gas-fee-amount']}>xxx</div>
                        </div>
                    </div>

                </div>
                <div className={style['middle']}>
                    <img className={style['arrow-right']} src={require("../../sources/arrowright.png")}/>
                </div>
                <div className={style['right']}>
                    <div className={style['title']}>Destination</div>
                    <div className={style['connect-wallet-btn']}>
                        <Button>CONNECT WALLET</Button>
                    </div>
                    <div>
                        {/*<Dropdown></Dropdown>*/}
                    </div>

                </div>
            </div>
            <div className={style['launch-trans-btn']}>
            </div>
        </div>
    );
}

export default MainBody;