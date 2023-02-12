import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../Layout/Layout";
import Profile from "../../../features/profile/Profile";
import SingIn from "../../../features/auth/sign-in/SingIn";
import SignUp from "../../../features/auth/sign-up/SignUp";
import ResetPassword from "../../../features/password/forgot-password/ResetPassword";
import NewPassword from "../../../features/password/new-password/NewPassword";
import CheckEmail from "../../../features/password/check-email/CheckEmail";
import Test from "../super-components/Test";
import {AllPacksList} from "../../../features/PacksLists/AllPacksList/AllPacksList";
import {MyPacksList} from "../../../features/PacksLists/MyPacksList/MyPacksList";
import {routes} from "../../../constants/constants";

// all project paths
/*export enum routes {
    PROFILE_PATH = '/',
    SIGN_IN_PATH = '/sign-in',
    SIGN_UP_PATH = '/sign-up',
    RESET_PASS_PATH = '/res-password',
    CHECK_EMAIL_PATH = '/check-email',
    NEW_PASS_PATH = '/new-password/:token',
    NOT_FOUND = '/404',
    PACKS_LIST = '/packsList',
    MY_PACKS_LIST = '/myPacksList',
}*/
const Routing = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path={routes.SIGN_IN_PATH} element={<SingIn/>}/>
                    <Route path={routes.SIGN_UP_PATH} element={<SignUp/>}/>
                    <Route path={routes.NEW_PASS_PATH} element={<NewPassword/>}/>
                    <Route path={routes.CHECK_EMAIL_PATH} element={<CheckEmail/>}/>
                    <Route path={routes.RESET_PASS_PATH} element={<ResetPassword/>}/>
                    <Route path={routes.NOT_FOUND} element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
                    <Route path={routes.PACKS_LIST} element={<AllPacksList/>}/>
                    <Route path={routes.MY_PACKS_LIST} element={<MyPacksList/>}/>
                    <Route path={'*'} element={<Navigate to={routes.NOT_FOUND}/>}/>
                    <Route path={'test'} element={<Test/>}/>
                </Route>
            </Routes>
        </>
    );
};
export default Routing;