import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../features/profile/Profile";
import SignUp from "../features/auth/sign-up/SignUp";
import NewPassword from "../features/password/new-password/NewPassword";
import ResetPassword from "../features/password/reset-password/ResetPassword";
import Test from "../common/components/super-components/Test";
import Layout from "../common/components/Layout/Layout";
import Login from "../features/auth/sign-in/Login";

const App = () => {


    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<SignUp/>}/>
                    <Route path={'/res_password'} element={<ResetPassword/>}/>
                    <Route path={'/new_password'} element={<NewPassword/>}/>
                    <Route path={'/test'} element={<Test/>}/>
                    <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
