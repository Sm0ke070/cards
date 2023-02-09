import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../features/profile/Profile";
import SignUp from "../features/auth/sign-up/SignUp";
import NewPassword from "../features/password/new-password/NewPassword";
import ResetPassword from "../features/password/forgot-password/ResetPassword";
import Test from "../common/components/super-components/Test";
import Layout from "../common/components/Layout/Layout";
import SingIn from "../features/auth/sign-in/SingIn";
import {useAppDispatch, useAppSelector} from "./store";
import {meTC, RequestStatusType} from "./app-reducer";
import {logoutTC} from "../features/auth/sign-in/SingIn-reducer";
import CheckEmail from "../features/password/check-email/CheckEmail";

const App = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])
    const logout = () => {
        dispatch(logoutTC())
    }
    if (!isInitialized) {
        return <div>
            <h1>Loading</h1>
        </div>
    }

    return (
        <>
            {/*кнопка тут временно*/}
            {isLoggedIn && <button onClick={logout}>logOut</button>}
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path={'sign-in'} element={<SingIn/>}/>
                    <Route path={'sign-up'} element={<SignUp/>}/>
                    <Route path={'res-password'} element={<ResetPassword/>}/>
                    <Route path={'new-password/:token'} element={<NewPassword/>}/>
                    <Route path={'/check-email'} element={<CheckEmail/>}/>
                    <Route path={'test'} element={<Test/>}/>
                    <Route path={'404'} element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
