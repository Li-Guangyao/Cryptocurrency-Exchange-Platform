import React from "react";
import style from "./index.module.css";
import Header from "../../components/Header";
import MainBody from "../../components/MainBodyBTC";
import Footer from "../../components/Footer";

function Index() {
    return (
        <div>
            <Header></Header>
            <MainBody></MainBody>
            <Footer></Footer>
        </div>
    )
}

export default Index;
