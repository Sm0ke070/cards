import React from 'react';
import profilePhoto from '../../common/assets/pngReact.png'
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {logoutTC} from "../auth/sign-in/auth-reducer";
import {Navigate} from "react-router";

const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const logOutProfile=()=>{
        useAppDispatch(logoutTC())
    }
    if(!isLoggedIn) return <Navigate to={'/sign-in'}/>
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
                        <span>name</span>
                        <span>email</span>
                        <button onClick={logOutProfile}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;