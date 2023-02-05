import React from 'react';
import {Link, Outlet} from "react-router-dom";

const Layout = () => {


    return (
        <>
            <header>

                <div><Link to="/sign-in">login</Link></div>
                <div><Link to="/profile">profile</Link></div>
                <div><Link to="/sign-up">registration</Link></div>
                <div><Link to="/res_password">res_password</Link></div>
                <div><Link to="/new_password">new_password</Link></div>
                <div><Link to="/404">404</Link></div>
                <div><Link to="/test">test</Link></div>
            </header>

            <main>

                <Outlet/>

            </main>
        </>
    );
};

export default Layout;