import React from 'react';
import profilePhoto from '../../common/assets/pngReact.png'
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logoutTC} from "../auth/sign-in/auth-reducer";
import {Navigate} from "react-router";
import {ChangeName} from "./profile-reducer";


const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logOutProfile = () => {
        dispatch(logoutTC())
    }

    const changeNme = (title: string) => {
        dispatch(ChangeName(''))
    }
    if (!isLoggedIn) return <Navigate to={'/sign-in'}/>
    return (
        <div className={s.container}>
            <div className={s.header}>
                    <span>
                        loginName
                    </span>
                <img src={profilePhoto}/>
            </div>
            <div className={s.profileGlobal}>
                <a href="#">
                    back to Packs
                </a>
                <div className={s.profile}>
                        <span>
                            Personal Information
                        </span>
                    <div className={s.profilePhoto}>
                        <img src={profilePhoto}/>
                        <div><span>name</span></div>
                        <div><span>email</span></div>
                        <button onClick={logOutProfile}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;