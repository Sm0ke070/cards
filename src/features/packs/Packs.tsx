import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import s from './Packs.module.css'
import {PacksHead} from './PacksHead';
import {PacksSettings} from './PackSettings/PacksSettings';
import {useNavigate} from 'react-router-dom';
import {routes} from '../../constants/constants';
import {PackList} from './PackList';
import {getPacksTC} from './packsReducer';
import {EmptyList} from '../../common/components/EmptyList';


export const Packs = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const packName = useAppSelector(state => state.packsSettings.queryParams.packName)
    const min = useAppSelector(state => state.packsSettings.queryParams.min)
    const max = useAppSelector(state => state.packsSettings.queryParams.max)
    const sortPacks = useAppSelector(state => state.packsSettings.queryParams.sortPacks)
    const page = useAppSelector(state => state.packsSettings.queryParams.page)
    const pageCount = useAppSelector(state => state.packsSettings.queryParams.pageCount)


    useEffect(() => {
        dispatch(getPacksTC())
    }, [page, packName, pageCount, min, max, sortPacks])


    if (!isLoggedIn) {
        navigate(routes.SIGN_IN)
    }


    return <div className={s.tableWrapper}>
        {isLoading === 'succeeded'&&<>
            <PacksHead/>
            <PacksSettings/>
        </>}
        {packs.length ? <PackList/> : isLoading === 'succeeded' && <EmptyList/>}
    </div>
}