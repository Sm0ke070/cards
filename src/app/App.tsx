import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../features/auth/login/Login";
import Profile from "../features/profile/Profile";
import Registration from "../features/auth/registration/Registration";
import NewPassword from "../features/password/new-password/NewPassword";
import ResetPassword from "../features/password/reset-password/ResetPassword";
import Test from "../components/TEST/Test";
import Layout from "../components/Layout/Layout";

const App = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
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
