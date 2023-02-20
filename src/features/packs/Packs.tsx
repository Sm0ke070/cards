import React, {useEffect} from 'react';
import {ColumnsType} from 'antd/es/table';
import { Table} from 'antd';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getPacks, setPacksPageAC, setPageCountAC} from './packsReducer';
import {formatDate} from '../../common/utils/formatDate';
import s from './Packs.module.css'
import {PacksHead} from './PacksHead';
import {PacksSettings} from './PackSettings/PacksSettings';
import {SortPacksUpdated} from './packs-sort/SortPacksUpdated';
import {SortPacksCards} from './packs-sort/SortPacksCards';
import {SortPackName} from './packs-sort/SortPackName';
import {SortPackCreatedBy} from './packs-sort/SortPackCreatetBy';
import {Actions} from './Actions';
import {Navigate, useNavigate} from 'react-router-dom';
import {routes} from '../../constants/constants';

    interface DataType {
        key: React.Key
        name: string;
        cardsCount: number;
        lastUpdated: string
        userName: string
    }

export const Packs = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector(state => state.app.status)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.queryParams.page)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const sortPacks = useAppSelector(state => state.packs.queryParams.sortPacks)

    useEffect(() => {
        dispatch(getPacks())
    }, [page, packName, pageCount, min, max, sortPacks])


    if (!isLoggedIn) {
        navigate(routes.SIGN_IN)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: <SortPackName/>,
            dataIndex: 'name',
        },
        {
            title: <SortPacksCards/>,
            dataIndex: 'cardsCount',
        },

        {
            title: <SortPacksUpdated/>,
            dataIndex: 'lastUpdated',
        },
        {
            title: <SortPackCreatedBy/>,
            dataIndex: 'userName',
        },
        {
            title: 'Action',
            width: 100,
            dataIndex: 'actions',
        },
    ];

    const data = packs.map((p) => {
        return {
            key: p._id,
            name: p.name,
            cardsCount: p.cardsCount,
            lastUpdated: formatDate(p.updated),
            userName: p.user_name,
            actions: <Actions packId={p._id} packUserId={p.user_id}/>

        }
    })
    const onClickPack = (record:DataType) => {
        console.log('record', record)
        navigate(routes.CARDS)

    }
    return <div className={s.tableWrapper}>
        <PacksHead/>
        <PacksSettings/>
        <div>

            {
                <Table columns={columns} dataSource={data} scroll={{x: 1000, y: 500}} loading={isLoading === 'loading'}
                       onRow={record=>{
                           return {
                               onClick:()=>onClickPack(record)
                           }
                       }} pagination={{
                    current: page,
                    pageSize: pageCount,
                    total: cardPacksTotalCount,
                    position: ['bottomLeft'],
                    onChange: (page, pageSize) => {
                        dispatch(setPacksPageAC(page))
                        dispatch(setPageCountAC(pageSize))
                    },
                }}/>
            }

        </div>
    </div>
}