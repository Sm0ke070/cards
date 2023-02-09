import React from 'react';
import {useAppSelector} from "../../../app/store";
import {Link} from "react-router-dom";
import style from './accountBlock.module.css'


const AccountBlock = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const userName = useAppSelector((state) => state.auth.userData.name)
    const ava = useAppSelector((state) => state.auth.userData.avatar)

    return (
        <div className={style.accountContainer}>
            {isLoggedIn
                ?
                <div><Link to={'/'}>{userName}</Link><img src={ava} alt="-avatar"/></div>
                :
                <button><Link style={{textDecoration: 'none'}} to={'sign-in'}>sign-in</Link></button>}


        </div>
    );
};

export default AccountBlock;