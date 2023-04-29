import React, {useEffect, useState} from "react";
import style from "./index.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {InputNumber, Button, Modal} from 'antd';
import {SwapOutlined} from '@ant-design/icons';

function Index() {
    let algoPrice = 0;
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

    })

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
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
                        <div>ALGO/USDT</div>
                        <div>ALGO/HKD</div>
                    </div>
                </div>
                <div className={style['right']}>
                    <div className={style['title']}>Price Calculator</div>
                    <div className={style['price']}>
                        <div className={style['algo-amount']}>
                            <InputNumber/>Algo
                        </div>
                        <div className={style['up-down-arrow']}>
                            <SwapOutlined rotate={90}/>
                        </div>
                        <div className={style['HKD-price']}>
                            <InputNumber/>HKD
                        </div>
                    </div>
                    <Button className={style['buy-btn']} onClick={showModal}>
                        Buy Algo
                    </Button>
                </div>
            </div>
            <Modal title="Basic Modal" open={isModalOpen}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Footer/>
        </div>
    )
}

export default Index;
