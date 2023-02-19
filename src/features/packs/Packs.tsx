import React, {useEffect} from 'react';
import {ColumnsType} from 'antd/es/table';
import {Spin, Table} from 'antd';
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

export const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)
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
        <PacksSettings/>
        <div>

            {isLoading !== 'loading' ?
                <Table columns={columns} dataSource={data} scroll={{x: 1000, y: 500}} pagination={{
                    current: page,
                    pageSize: pageCount,
                    total: cardPacksTotalCount,
                    position: ['bottomLeft'],
                    onChange: (page, pageSize) => {
                        dispatch(setPacksPageAC(page))
                        dispatch(setPageCountAC(pageSize))
                    },
                }}/> : <Spin size="large"/>
            }

        </div>
    </div>
}