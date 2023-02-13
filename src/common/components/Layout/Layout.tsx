import React from 'react';
import {Link, Outlet} from "react-router-dom";
import style from "./Layout.module.css"
import AccountBlock from "../account block/AccountBlock";
import {routes} from "../routes/Routes";

const Layout = () => {

    return (
        <>
            <header className={style.headerContainer}>
                <AccountBlock/>
            </header>

            <div>
                <div><Link to={routes.PROFILE_PATH}>profile</Link></div>
                <div><Link to="/test">test</Link></div>
            </div>

            <main className={style.mainContainer}>

                <Outlet/>

            </main>
            <footer style={{height: '100px', textAlign: 'center'}}>
                <h2>footer</h2>
            </footer>
        </>
    );
};

export default Layout;