import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import MainBody from "./components/MainBody";
import Footer from "./components/Footer";


const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <Header></Header>
        <MainBody></MainBody>
        <Footer></Footer>
    </React.StrictMode>
);

document.body.style.overflow = "hidden";
