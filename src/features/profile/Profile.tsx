import React from 'react';
import s from '../auth/auth-form.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router";
import {logoutTC} from "../auth/sign-in/SingInReducer";
import {Button, Typography} from 'antd';
import {Link} from "react-router-dom";
import {routes} from "../../constants/constants";
import {changeUserNameTC} from "./ProfileReducer";
import {FaLongArrowAltLeft} from "react-icons/fa";
import defaultUserAvatar from "../../assets/image/user-avatar/defaultUserAvatar.png";
import {BsCameraFill} from 'react-icons/bs'

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const name = useAppSelector((state) => state.auth.userData.name)
    const email = useAppSelector((state) => state.auth.userData.email)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const isLoading = useAppSelector(state => state.app.status)
    const {Title} = Typography


    const logOutProfileHandler = () => {
        dispatch(logoutTC())
    }

    const onChangeUserNameHandler = (value: string) => {
        dispatch(changeUserNameTC(value))

    }
    const onChangeAvatarHandler = () => {
        alert('test')
    }

    if (!isLoggedIn) return <Navigate to={routes.SIGN_IN}/>

    return (
        <div>
            <Link to={routes.PACKS} style={{textDecoration: 'none', color: 'black'}}>
                <FaLongArrowAltLeft/> Back to Packs List
            </Link>

            <div className={s.form}>

                <Title>Personal Information</Title>

                <div>
                    <img style={{width: '150px'}} src={avatar ? avatar : defaultUserAvatar} alt={'avatar photo'}/>
                    <Button onClick={onChangeAvatarHandler} size={'large'} shape="circle">
                        <BsCameraFill/>
                    </Button>
                </div>

                <Typography.Title
                    editable={{onChange: onChangeUserNameHandler}}
                    level={2}
                    style={{letterSpacing: '2px', margin: 0}}>
                    {name}
                </Typography.Title>

                <span>{email}</span>

                <Button loading={isLoading === 'loading'} type="default" size={'large'} onClick={logOutProfileHandler}>
                    Log out
                </Button>
            </div>
        </div>
    );
};

export default Profile;