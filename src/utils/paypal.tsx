import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {Modal} from 'antd'
import React, {useState, useImperativeHandle} from "react";
import {Paypal_Client_ID} from "../env.development";

interface PayPalIntegrationProps {
    HKDAmount: number,
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

    useImperativeHandle(props.onRef, () => {
        return {setIsShow}
    })

    return (<div>
        <Modal title={<h2>Pay with Paypal</h2>} open={isShow} onCancel={() => {
            setIsShow(false)
        }} centered={true} footer={null}>

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
                            // @ts-ignore
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
                        });
                    }}>
                </PayPalButtons>
            </PayPalScriptProvider>

        </Modal>
    </div>)
}

export {options};
export default PayPalIntegration;