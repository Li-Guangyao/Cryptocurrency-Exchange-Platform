import React from 'react';
import style from "./index.module.css"

function MainBody() {
    return (
        <div className={style["container"]}>
            <div className={style["exchange-block"]}>
                <div className={style['left']}></div>
                <div className={style['middle']}></div>
                <div className={style['right']}></div>
            </div>
        </div>
    );
}

export default MainBody;