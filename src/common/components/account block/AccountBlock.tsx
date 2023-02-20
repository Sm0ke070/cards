import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import style from './accountBlock.module.css'
import {Button} from "antd";
import {routes} from "../../../constants/constants";
import {meTC} from "../../../app/AppReducer";


const AccountBlock = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const name = useAppSelector((state) => state.auth.userData.name)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signInHandler = () => {
        navigate(routes.SIGN_IN)
    }

    useEffect(() => {
        dispatch(meTC())
    }, [name])

    return (
        <div className={style.accountContainer}>
            {isLoggedIn
                ?
                <div className={style.accountBlock}><Link to={'/'}>{name}</Link><img style={{maxWidth: '45px'}} src={avatar} alt="-avatar"/></div>
                :
                <Button type="primary" onClick={signInHandler}>
                    sign-in
                </Button>}
        </div>
    );
};
export default AccountBlock;