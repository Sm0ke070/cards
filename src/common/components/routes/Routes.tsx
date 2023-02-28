import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import Profile from "../../../features/profile/Profile";
import SingIn from "../../../features/auth/sign-in/SingIn";
import SignUp from "../../../features/auth/sign-up/SignUp";
import ResetPassword from "../../../features/password/forgot-password/ResetPassword";
import NewPassword from "../../../features/password/new-password/NewPassword";
import CheckEmail from "../../../features/password/check-email/CheckEmail";
import Test from "../super-components/Test";
import {routes} from "../../../constants/constants";
import {Packs} from '../../../features/packs/Packs';
import {Cards} from '../../../features/cards/Cards';
import {Learn} from "../../../features/cards/learn/Learn";


const Routing = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path={routes.SIGN_IN} element={<SingIn/>}/>
                    <Route path={routes.SIGN_UP} element={<SignUp/>}/>
                    <Route path={routes.NEW_PASS} element={<NewPassword/>}/>
                    <Route path={routes.CHECK_EMAIL} element={<CheckEmail/>}/>
                    <Route path={routes.RESET_PASS} element={<ResetPassword/>}/>
                    <Route path={routes.NOT_FOUND} element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
                    <Route path={routes.PACKS} element={<Packs/>}/>
                    <Route path={routes.CARDS} element={<Cards/>}/>
                    <Route path={routes.CARD_QUESTION} element={<Learn/>}/>
                    <Route path={'*'} element={<Navigate to={routes.NOT_FOUND}/>}/>
                    <Route path={'test'} element={<Test/>}/>
                </Route>
            </Routes>
        </>
    );
};
export default Routing;