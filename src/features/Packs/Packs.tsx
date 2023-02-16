import React, {useEffect} from 'react';
import {ColumnsType} from 'antd/es/table';
import {Table} from 'antd';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getPacks} from './packsReducer';
import {formatDate} from '../../common/utils/formatDate';
import s from './Packs.module.css'
import {ShowPacks} from './ShowPacks';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const page = useAppSelector(state => state.packs.queryParams.page)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
    const userId = useAppSelector(state => state.packs.queryParams.user_id)
    const min = useAppSelector(state => state.packs.queryParams.min)
    const max = useAppSelector(state => state.packs.queryParams.max)
    const sortPacks = useAppSelector(state => state.packs.queryParams.sortPacks)
    useEffect(() => {
        dispatch(getPacks())
    }, [page, packName, pageCount, userId, min, max, sortPacks])






    interface DataType {
        name: string;
        cardsCount: number;
        lastUpdated: string
        userName: string
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Cards',
            dataIndex: 'cardsCount',
        },

        {
            title: 'Last Updated',
            dataIndex: 'lastUpdated',
        },
        {
            title: 'Created by',
            dataIndex: 'userName',
        },
        {
            title: 'Action',
            width: 100,
            render: () => <a>action</a>,
        },
    ];
    const data = packs.map((p) => {
        return {
            name: p.name,
            cardsCount: p.cardsCount,
            lastUpdated: formatDate(p.updated),
            userName: p.user_name
        }
    })

    return <div className={s.tableWrapper}>
        <ShowPacks/>
        <div >

            <Table columns={columns} dataSource={data} scroll={{x: 1000, y: 500}}/>
        </div>
    </div>
}