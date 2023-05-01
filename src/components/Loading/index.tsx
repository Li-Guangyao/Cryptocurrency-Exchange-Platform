import React from "react";
import style from "./index.module.css";
import {Spin} from 'antd'
import {useState, useEffect} from "react";

interface props {
    isShow: boolean,
    text?: string
}

const Index: React.FC<props> = (props: props) => {
    const [isShow, setIsShow] = useState(props.isShow)
    useEffect(() => {
        let container = document.getElementById("container")
        // container.style.visibility = false;
    }, [isShow])

    return (
        <div className={style['container']} id={"container"}>
            <Spin className={style['spin']}></Spin>
            <div className={style['text']}>{props.text}</div>
        </div>
    )
}

export default Index;
export {}
