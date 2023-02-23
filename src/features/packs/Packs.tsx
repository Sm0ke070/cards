import React from 'react';
import {useAppSelector} from '../../app/store';
import s from './Packs.module.css'
import {PacksHead} from './PacksHead';
import {PacksSettings} from './PackSettings/PacksSettings';
import {useNavigate} from 'react-router-dom';
import {routes} from '../../constants/constants';
import {PackList} from './PackList';


export const Packs = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    if (!isLoggedIn) {
        navigate(routes.SIGN_IN)
    }


    return <div className={s.tableWrapper}>
        <PacksHead/>
        <PacksSettings/>
        <PackList/>
    </div>
}