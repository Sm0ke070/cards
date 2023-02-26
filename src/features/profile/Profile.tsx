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

const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const name = useAppSelector((state) => state.auth.userData.name)
    const email = useAppSelector((state) => state.auth.userData.email)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const {Title} = Typography


    const logOutProfileHandler = () => {
        dispatch(logoutTC())
    }

    const changeUserNameHandler = (value: string) => {
        dispatch(changeUserNameTC(value))

    }

    if (!isLoggedIn) return <Navigate to={routes.SIGN_IN}/>
    return (
        <div className={s.form}>
            <div className={s.profileGlobal}>
                <Link to={routes.PACKS} style={{textDecoration: 'none', color: 'black'}}>
                    <FaLongArrowAltLeft/> Back to Packs List
                </Link>
                <div className={s.profile}>
                    <Title>Personal Information</Title>
                    <div className={s.profilePhoto}>

                        <img style={{width: '150px'}} src={avatar ? avatar : defaultUserAvatar} alt={'avatar photo'}/>

                        <div>
                            <Typography.Title
                                editable={{onChange: changeUserNameHandler}}
                                level={1}
                                style={{width: '70%', letterSpacing: '2px'}}>
                                {name}

                            </Typography.Title>
                        </div>

                        <div>
                            <span>{email}</span>
                        </div>

                        <div>
                            <Button type="default" size={'large'} onClick={logOutProfileHandler}>
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