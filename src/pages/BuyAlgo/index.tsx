import React, {useEffect, useState} from "react";
import style from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {InputNumber, Button, Modal, Input, message} from 'antd';
import {SwapOutlined} from '@ant-design/icons';
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';

function Index() {
    const [HKDAlgoPrice, setHKDAlgoPrice] = useState(2.345671);
    const [algoAmt, setAlgoAmt] = useState(0)
    const [HKDAmt, setHKDAmt] = useState(0)
    const [receiverAddress, setReceiverAddress] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {

    })

    const inputAlgoAmt = (e: number) => {
        setAlgoAmt(e)
        setHKDAmt(e * HKDAlgoPrice)
        console.log(e * HKDAlgoPrice)
    }

    const inputHKDAmt = (e: number) => {
        setHKDAmt(e)
        setHKDAmt(e / HKDAlgoPrice)
        console.log(e / HKDAlgoPrice)
    }

    const inputReceiverAddress = (e: any) => {
        console.log(e.target.value)
        setReceiverAddress(e.target.value)
    }

    const confirmTrans = () => {
        // verify address format
        setIsModal2Open(true)
    }

    const clickBuyAlgoBtn = () => {
        if (algoAmt == 0 || HKDAmt == 0) {
            messageApi.open({
                type: 'error',
                content: 'Please input the Algo or HKD amount',
            }).then()
        } else {
            setIsModalOpen(true)
        }
    }

    return (
        <div>
            <Header/>
            <div className={style['container']}>
                <div className={style['left']}>
                    <div className={style['title']}>
                        <img className={style['logo-algorand']} src={require("../../sources/algorand.png")}/>
                        <div className={style['title-algorand']}>ALGORAND</div>
                    </div>
                    <div className={style['price']}>
                        <div className={style['price-item']}>{"0.225"}
                            <div className={style['price-item-tip']}>USDT/ALGO</div>
                        </div>
                        <div className={style['price-item']}>{"2.333"}
                            <div className={style['price-item-tip']}>HKD/ALGO</div>
                        </div>
                        <div className={style['price-time-item']}>{"price at 14:35:24, April 30, 2023"}</div>
                    </div>
                </div>
                <div className={style['right']}>
                    <div className={style['title']}>Price Calculator</div>
                    <div className={style['price']}>
                        <div className={style['price-item']}>
                            <InputNumber className={style['number-input']} controls={false} value={algoAmt}
                                         precision={2} onChange={e => inputAlgoAmt(e as number)}/>ALGO
                        </div>
                        <div className={style['up-down-arrow']}>
                            <SwapOutlined rotate={90}/>
                        </div>
                        <div className={style['price-item']}>
                            <InputNumber className={style['number-input']} controls={false} value={HKDAmt}
                                         precision={2} onChange={e => inputHKDAmt(e as number)}/> HKD
                        </div>
                    </div>
                    {contextHolder}
                    <Button className={style['buy-btn']} onClick={clickBuyAlgoBtn}>
                        BUY ALGO
                    </Button>
                </div>
            </div>
            <Modal title={<h2>Confirm transaction</h2>} open={isModalOpen} onCancel={() => setIsModalOpen(false)}
                   centered={true} onOk={confirmTrans}
                   okText={"Confirm"}>
                <h3>You are buying <strong>{algoAmt}</strong> Algos with <strong>{HKDAmt}</strong> HKD</h3>
                <h3>The current price is <strong>{HKDAlgoPrice}</strong> HKD/Algo</h3>
                <h3>The transaction fee is <strong>{5.2}</strong>.</h3>
                <h4>Please input the receiving address:</h4>
                <Input onChange={e => inputReceiverAddress(e)}></Input>
            </Modal>
            <Modal title={<h2>Pay with Paypal</h2>} open={isModal2Open} onCancel={() => {
                setIsModal2Open(false)
            }} centered={true} footer={null}>
                <PayPalScriptProvider options={{"client-id": "test"}}>
                    <PayPalButtons onApprove={(data, actions) => {
                        // @ts-ignore
                        return actions.order.capture().then((details) => {
                            // @ts-ignore
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
                        });
                    }}></PayPalButtons>
                </PayPalScriptProvider>

            </Modal>
            <Footer/>
        </div>
    )
}

export default Index;
