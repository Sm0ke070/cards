import React from 'react';
import profilePhoto from '../../common/assets/pngReact.png'
import s from './Profile.module.css'

const Profile = () => {
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
                        <button>changeer</button>
                        <span>email</span>
                        <button>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;