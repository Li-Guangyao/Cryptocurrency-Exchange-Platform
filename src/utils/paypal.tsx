import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {Modal, Button, message, Space} from 'antd'
import React, {useState, useImperativeHandle} from "react";
import {Paypal_Client_ID} from "../env.development";
import AlgoUtils from "./AlgoUtils";

interface PayPalIntegrationProps {
    HKDAmount: number,
    actionsAfterPayment: Function,
    onRef: any
}

const options = {
    "client-id": Paypal_Client_ID,
    // "client-id": "test",
    currency: "HKD",
    intent: "capture"
}

const PayPalIntegration: React.FC<PayPalIntegrationProps> = (props: PayPalIntegrationProps) => {
    const [isShow, setIsShow] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    useImperativeHandle(props.onRef, () => {
        return {setIsShow}
    })

    return (<div>
        <Modal title={<h2>Pay with Paypal</h2>} open={isShow} onCancel={() => {
            setIsShow(false)
        }} centered={true} footer={null}>
            {contextHolder}
            <PayPalScriptProvider options={options}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: String(props.HKDAmount),
                                    },
                                },
                            ],
                        });
                    }}

                    onApprove={(data, actions) => {
                        // @ts-ignore
                        return actions.order.capture().then((details) => {
                            const name = details?.payer?.name?.given_name;
                            messageApi.open({
                                type: 'success',
                                content: 'success',
                            }).then(r => {
                                props.actionsAfterPayment();
                            });
                            setIsShow(false);
                        });
                    }}>
                </PayPalButtons>
            </PayPalScriptProvider>

        </Modal>
    </div>)
}

export {options};
export default PayPalIntegration;