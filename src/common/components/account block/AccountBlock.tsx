import React from 'react';
import {useAppSelector} from "../../../app/store";
import {Link, Navigate} from "react-router-dom";
import style from './accountBlock.module.css'
import {Button} from "antd";
import {routes} from "../routes/Routes";


const AccountBlock = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const userName = useAppSelector((state) => state.auth.userData.name)
    const ava = useAppSelector((state) => state.auth.userData.avatar)

    const signInHandler = () => {
        return <Navigate to={routes.SIGN_IN_PATH}/>
    }


    return (
        <div className={style.accountContainer}>
            {isLoggedIn
                ?
                <div><Link to={'/'}>{userName}</Link><img src={ava} alt="-avatar"/></div>
                :
                <Button title={'sign-in'} type="primary" onClick={signInHandler}>
                    sign-in
                </Button>}
        </div>
    );
};

export default AccountBlock;