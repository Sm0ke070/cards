import React from 'react';
import {Outlet} from "react-router-dom";
import style from "./Layout.module.css"
import AccountBlock from "../account block/AccountBlock";

const Layout = () => {

    return (
        <>
            <header className={style.headerContainer}>
                <AccountBlock/>
            </header>

            <main className={style.mainContainer}>

                <Outlet/>

            </main>
        </>
    );
};

export default Layout;