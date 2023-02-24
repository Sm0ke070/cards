import React from 'react';
import {Outlet} from "react-router-dom";
import style from "./Layout.module.css"
import AccountBlock from "../account block/AccountBlock";
import logo from "../../../assets/image/it-logo/it-incubator.svg";

const Layout = () => {

    return (
        <>
            <header className={style.headerContainer}>
                <img src={logo} alt="logo"/>
                <AccountBlock/>
            </header>

            <main className={style.mainContainer}>

                <Outlet/>

            </main>
        </>
    );
};

export default Layout;