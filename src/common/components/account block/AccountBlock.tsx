import React from 'react';
import {useAppSelector} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import style from './accountBlock.module.css'
import {Button} from "antd";
import {routes} from "../../../constants/constants";
import defaultUserAvatar from '../../../assets/image/user-avatar/defaultUserAvatar.png'

const AccountBlock = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const name = useAppSelector((state) => state.auth.userData.name)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const navigate = useNavigate()

    const signInHandler = () => {
        navigate(routes.SIGN_IN)
    }


    return (
        <div className={style.accountContainer}>
            {isLoggedIn
                ?

                <div className={style.accountBlock}>
                    <Link
                        style={{
                            paddingRight: '10px',
                            textDecoration: 'underline',
                            color: 'black',
                            letterSpacing: '2px'
                        }}
                        to={'/'}>{name}
                    </Link>

                    <img style={{maxWidth: '45px'}}
                         src={avatar ? avatar : defaultUserAvatar} alt="-avatar"/>
                </div>
                :
                <Button type="primary" onClick={signInHandler}>
                    sign-in
                </Button>}
        </div>
    );
};
export default AccountBlock;