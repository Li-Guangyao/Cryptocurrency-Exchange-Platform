import React from "react";
import style from "./index.module.css";

function Footer() {
    return (
        <div className={style["container"]}>
            <div className={style["left"]}>
                Rocket Exchange © 2023 Developed independently by&nbsp;
                <a href="http://39.99.133.150">Li Guangyao</a>
            </div>
            <div className={style["right"]}>
                <div className={style["text-item"]}>Introduction</div>
                <div className={style["text-item"]}>Terms & Conditions</div>
                <div className={style["text-item"]}>FAQ</div>
                <a
                    className={style["icon-wrapper"]}
                    href="https://twitter.com/Lee_Kwong_Yiu"
                >
                    <img
                        className={style["icon"]}
                        src={require("../../sources/twitter.png")}
                    ></img>
                </a>
                <a
                    className={style["icon-wrapper"]}
                    href="https://github.com/Li-Guangyao"
                >
                    <img
                        className={style["icon"]}
                        src={require("../../sources/github.png")}
                    ></img>
                </a>
            </div>
        </div>
    );
}

export default Footer;
