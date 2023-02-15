import React, {useEffect, useState} from 'react';
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router";
import {logoutTC} from "../auth/sign-in/SingInReducer";
import {Button, Typography} from 'antd';
import {Link} from "react-router-dom";
import {routes} from "../../constants/constants";
import {changeNameAC, changeUserNameTC, getUserNameTC} from "./ProfileReducer";

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const name = useAppSelector((state) => state.auth.userData.name)
    //const userName = useAppSelector((state) => state.profile.userName)
    const email = useAppSelector((state) => state.auth.userData.email)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const [editableStr, setEditableStr] = useState(name)
    const {Title} = Typography


    const logOutProfileHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(()=>{
        dispatch(getUserNameTC())

    })

    const changeNameHandler = (value: string) => {
        dispatch(changeUserNameTC(value))
    }

    console.log('render')

    if (!isLoggedIn) return <Navigate to={routes.SIGN_IN}/>
    return (
        <div className={s.container}>
            <div className={s.profileGlobal}>
                <Link to={routes.PACKS_LIST}>back to packsList</Link>
                <div className={s.profile}>
                    <Title>Personal Information</Title>
                    <div className={s.profilePhoto}>
                        <img src={avatar}/>
                        <div>
                            <Typography.Title
                                editable={{onChange: changeNameHandler}}
                                level={1}
                                style={{margin: 0}}>
                                {editableStr}

                            </Typography.Title>
                        </div>

                        <div><span>{email}</span></div>
                        <div>

                            <Button type="dashed" size={'small'} onClick={logOutProfileHandler} shape={"round"}>
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