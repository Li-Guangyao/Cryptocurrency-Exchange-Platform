import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./index.css";

import ExchangeETH from "./pages/ExchangeETH";
import ExchangeBTC from "./pages/ExchangeBTC";
import BuyAlgo from "./pages/BuyAlgo";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<BuyAlgo/>}></Route>
                <Route path={"/buy"} element={<BuyAlgo/>}></Route>
                <Route path={"/ETH"} element={<ExchangeETH/>}></Route>
                <Route path={"/BTC"} element={<ExchangeBTC/>}></Route>
            </Routes>
        </BrowserRouter>

    </React.StrictMode>
);

document.body.style.overflow = "hidden";
