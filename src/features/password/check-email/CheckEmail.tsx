import React from 'react';
import {useNavigate} from "react-router-dom";
import style from '../../auth/auth-form.module.css'
import {routes} from "../../../constants/constants";
import {Button} from "antd";

const CheckEmail = () => {
    const navigate = useNavigate()
    const backToLoginHandler = () => {
        navigate(routes.SIGN_IN)
    }

    return (
        <div className={style.form}>
            <h2>Check Email</h2>
            <span style={{
                width: '70%',
                textAlign: 'center'
            }}>We’ve sent an Email with instructions to example@mail.com</span>
            <Button style={{width: '70%'}} type={'primary'} onClick={backToLoginHandler}>
                Back to login
            </Button>
        </div>
    );
};

export default CheckEmail;