import React from "react";
import style from "./index.module.css";
import Header from "../../components/Header";
import MainBody from "../../components/MainBody";
import Footer from "../../components/Footer";
import AlgoSigner from "../../utils/algoSigner";

function Index() {
    const connect = () => {
        const connection = new AlgoSigner();
        console.log(connection.connect());
    };

    return (
        <div>
            <Header></Header>
            <button onClick={connect}></button>
            <MainBody></MainBody>
            <Footer></Footer>
        </div>
    );
}

export default Index;
