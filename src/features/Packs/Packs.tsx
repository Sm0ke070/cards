import React, {useEffect} from 'react';
import {ColumnsType} from 'antd/es/table';
import {Table} from 'antd';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {getPacks} from './packsReducer';

export const Packs = () => {
const dispatch = useAppDispatch()
    const packs = useAppSelector(state=>state.packs.cardPacks)
    const page = useAppSelector(state=>state.packs.queryParams.page)
    const packName = useAppSelector(state=>state.packs.queryParams.packName)
    const pageCount = useAppSelector(state=>state.packs.queryParams.pageCount)
    const userId = useAppSelector(state=>state.packs.queryParams.user_id)
    const min = useAppSelector(state=>state.packs.queryParams.min)
    const max = useAppSelector(state=>state.packs.queryParams.max)
    const sortPacks = useAppSelector(state=>state.packs.queryParams.sortPacks)
    useEffect(()=>{
        dispatch(getPacks())
    },[page, packName, pageCount, userId, min, max, sortPacks])
    console.log(packs)

    interface DataType {
        key: React.Key;
        name: string;
        age: number;
        address: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            width: 110,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Cards',
            width: 100,
            dataIndex: 'Cards',
            key: 'Cards',
            fixed: 'left',
        },

        {
            title: 'Last Updated ',
            dataIndex: 'address',
            key: '1',
            width: 150,
        },
        {
            title: 'Created by',
            dataIndex: 'address',
            key: '2',
            width: 150,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>,
        },
    ];
    const data = packs.map((el)=>{

})

    return <>

        {/*<Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}}/>*/}
    </>
}