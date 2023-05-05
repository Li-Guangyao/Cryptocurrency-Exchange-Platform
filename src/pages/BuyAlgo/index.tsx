import React, {useEffect, useState, useRef} from "react";
import style from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {InputNumber, Button, Modal, Input, message, Spin} from 'antd';
import {SwapOutlined} from '@ant-design/icons';
import PayPalIntegration from "../../utils/paypal"
import GetCryptoQuote from "../../utils/getCryptoCurrencyQuotes";
import {isValidAddress} from "algosdk";
import AlgoUtils from "../../utils/AlgoUtils";
import Loading from "../../components/Loading";

function Index() {
    const [HKDAlgoPrice, setHKDAlgoPrice] = useState<number>(2.345671);
    const [USDTAlgoPrice, setUSDTAlgoPrice] = useState<number>(0)
    const [priceTime, setPriceTime] = useState<Date>(new Date())
    const [algoAmt, setAlgoAmt] = useState<number>(0)
    const [HKDAmt, setHKDAmt] = useState<number>(0)
    const [receiverAddress, setReceiverAddress] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const childRef = useRef();

    useEffect(() => {
        updateQuote()
    }, [])

    const updateQuote = () => {
        GetCryptoQuote.getQuote("ALGOUSDT").then(res => {
            console.log("res", res)
            console.log("res.closeTime", new Date(res.closeTime))
            setUSDTAlgoPrice(Number((res.lastPrice * 1.0)))
            setHKDAlgoPrice(Number((res.lastPrice * 7.85)))
            setPriceTime(new Date(res.closeTime))
        })
    }

    const inputAlgoAmt = (e: number) => {
        setAlgoAmt(e)
        setHKDAmt(Math.ceil(e * HKDAlgoPrice * 100) / 100)
        console.log(e * HKDAlgoPrice)
    }

    const inputHKDAmt = (e: number) => {
        setHKDAmt(e)
        setAlgoAmt(Math.floor((e / HKDAlgoPrice) * 1000000) / 1000000)
        console.log(e / HKDAlgoPrice)
    }

    const inputReceiverAddress = (e: any) => {
        console.log(e.target.value)
        setReceiverAddress(e.target.value)
    }

    // press the confirm button
    const confirmTrans = () => {
        if (isValidAddress(receiverAddress)) {
            // @ts-ignore
            childRef.current.setIsShow(true)
        } else {
            messageApi.open({
                type: 'error',
                content: 'Algorand address is not correct.',
            }).then()
        }
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

    const transferAlgo = () => {
        setIsModalOpen(false)
        AlgoUtils.transferAlgo(receiverAddress, algoAmt).then(r => {
            messageApi.open({
                type: 'success',
                content: 'You have successfully bought ' + algoAmt + "Algos",
            }).then()
        })
    }

    return (
        <div>
            {/*<Loading isShow={true} text={"test"}></Loading>*/}
            <Header/>
            {/*<Button onClick={() => transferAlgo()}>测试transferAlgo</Button>*/}
            <div className={style['container']}>
                <div className={style['left']}>
                    <div className={style['title']}>
                        <img className={style['logo-algorand']} src={require("../../sources/algorand.png")}/>
                        <div className={style['title-algorand']}>ALGORAND</div>
                    </div>
                    <div className={style['price']}>
                        <div className={style['price-item']}>{USDTAlgoPrice.toFixed(6)}
                            <div className={style['price-item-tip']}>USDT/ALGO</div>
                        </div>
                        <div className={style['price-item']}>{HKDAlgoPrice.toFixed(6)}
                            <div className={style['price-item-tip']}>HKD/ALGO</div>
                        </div>
                        <div
                            className={style['price-time-item']}>
                            {"Price at " + priceTime.toLocaleTimeString() + " " + priceTime.toLocaleDateString() + " HK Time"}
                        </div>
                    </div>
                </div>
                <div className={style['right']}>
                    <div className={style['title']}>Price Calculator</div>
                    <div className={style['price']}>
                        <div className={style['price-item']}>
                            <InputNumber className={style['number-input']} controls={false} value={algoAmt}
                                         precision={6} onChange={e => inputAlgoAmt(e as number)}/>ALGO
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
                   centered={true} onOk={confirmTrans} maskClosable={false}
                   okText={"Confirm"}>
                <h3>You are buying <strong>{algoAmt}</strong> Algos with <strong>{HKDAmt}</strong> HKD</h3>
                <h3>The current price is <strong>{HKDAlgoPrice.toFixed(6)}</strong> HKD/Algo</h3>
                <h3>The transaction fee is <strong>{0}</strong> HKD.</h3>
                <h4>Please input the receiving address:</h4>
                <Input onChange={e => inputReceiverAddress(e)}></Input>
            </Modal>

            <PayPalIntegration HKDAmount={HKDAmt} actionsAfterPayment={transferAlgo}
                               onRef={childRef}></PayPalIntegration>
            <Footer/>
        </div>
    )
}

export default Index;
