import React from 'react';
import {Link, Outlet} from "react-router-dom";
import style from "./Layout.module.css"

const Layout = () => {


    return (
        <>
            <header className={style.headerContainer}>
                <div><Link to="/sign-in">login</Link></div>
                <div><Link to="/">profile</Link></div>
                <div><Link to="/sign-up">registration</Link></div>
                <div><Link to="/res-password">res_password</Link></div>
                <div><Link to="/new-password">new_password</Link></div>
                <div><Link to="/404">404</Link></div>
                <div><Link to="/test">test</Link></div>
            </header>

            <main className={style.mainContainer}>

                <Outlet/>


            </main>
            <footer style={{height:'100px',textAlign: 'center'}}><h2>footer</h2></footer>
        </>
    );
};

export default Layout;