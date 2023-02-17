import React, {useEffect} from 'react';
import {ColumnsType} from 'antd/es/table';
import {Table} from 'antd';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getPacks, setPacksPageAC, setPageCountAC} from './packsReducer';
import {formatDate} from '../../common/utils/formatDate';
import s from './Packs.module.css'
import {ShowPacks} from './ShowPacks';
import {PacksHead} from './PacksHead';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
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


    interface DataType {
        key: React.Key
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
            key: p._id,
            name: p.name,
            cardsCount: p.cardsCount,
            lastUpdated: formatDate(p.updated),
            userName: p.user_name
        }
    })

    return <div className={s.tableWrapper}>
        <PacksHead/>
        <ShowPacks/>
        <div>

            <Table columns={columns} dataSource={data} scroll={{x: 1000, y: 500}} pagination={{
                current: page,
                pageSize: pageCount,
                total: cardPacksTotalCount,
                position: ['bottomLeft'],
                onChange: (page, pageSize) => {
                    dispatch(setPacksPageAC(page))
                    dispatch(setPageCountAC(pageSize))
                },
            }}/>

        </div>
    </div>
}