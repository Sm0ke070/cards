import React, {useEffect,useState} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router";
import {logoutTC} from "../auth/sign-in/SingInReducer";
import {Button, Typography} from 'antd';
import {Link} from "react-router-dom";
import {routes} from "../../constants/constants";
import {changeUserNameTC, getUserNameTC} from "./ProfileReducer";

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const userName = useAppSelector((state) => state.profile.userName)
    const email = useAppSelector((state) => state.auth.userData.email)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const {Title} = Typography


    const logOutProfileHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(getUserNameTC())
    }, [dispatch])

    const changeNameHandler = (value: string) => {
        dispatch(changeUserNameTC(value))
    }

    if (!isLoggedIn) return <Navigate to={routes.SIGN_IN}/>
    return (
        <div className={s.container}>
            <div className={s.profileGlobal}>
                <Link to={routes.PACKS_LIST}>back to packsList</Link>
                <Link to={routes.PACKS}>back to packsList2</Link>
                <div className={s.profile}>
                    <Title>Personal Information</Title>
                    <div className={s.profilePhoto}>
                        <img src={avatar}/>
                        <div>
                            <Typography.Title
                                editable={{onChange: changeNameHandler}}
                                level={1}
                                style={{margin: 0}}>
                                {userName}

                            </Typography.Title>
                        </div>

                        <div><span>{email}</span></div>
                        <div>

                            <Button type="default" size={'small'} onClick={logOutProfileHandler} shape={"round"}>
                                Log out
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;