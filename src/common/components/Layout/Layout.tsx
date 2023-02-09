import React from 'react';
import {Link, Outlet} from "react-router-dom";
import style from "./Layout.module.css"
import AccountBlock from "../account block/AccountBlock";
import {logoutTC} from "../../../features/auth/sign-in/SingIn-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/store";

const Layout = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <>
            <header className={style.headerContainer}>
                <AccountBlock/>
            </header>

            <div>
                {isLoggedIn && <button onClick={logout}>logOut</button>}
                <div><Link to="/sign-in">login</Link></div>
                <div><Link to="/">profile</Link></div>
                <div><Link to="/sign-up">registration</Link></div>
                <div><Link to="/res-password">res_password</Link></div>
                <div><Link to="/new-password">new_password</Link></div>
                <div><Link to="/404">404</Link></div>
                <div><Link to="/test">test</Link></div>
            </div>

            <main className={style.mainContainer}>

                <Outlet/>

            </main>
            <footer style={{height: '100px', textAlign: 'center'}}><h2>footer</h2></footer>
        </>
    );
};

export default Layout;