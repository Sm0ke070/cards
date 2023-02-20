import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {routes} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {ColumnsType} from "antd/es/table";
import {SortPackName} from "../packs/packs-sort/SortPackName";
import {SortPacksCards} from "../packs/packs-sort/SortPacksCards";
import {SortPacksUpdated} from "../packs/packs-sort/SortPacksUpdated";
import {SortPackCreatedBy} from "../packs/packs-sort/SortPackCreatetBy";
import {formatDate} from "../../common/utils/formatDate";
import {Actions} from "../packs/Actions";
import {getCard} from "./cardsReducer";
import s from "../packs/Packs.module.css";
import {PacksHead} from "../packs/PacksHead";
import {PacksSettings} from "../packs/PackSettings/PacksSettings";
import {Table} from "antd";
import {setPacksPageAC, setPageCountAC} from "../packs/packsReducer";

interface DataType {
    key: React.Key
    question: string;
    answer: number;
    lastUpdated: string
    grade: string
}

export const Cards = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userId = useAppSelector(state => state.auth.userData._id)
    const card = useAppSelector(state => state.packs.cardPacks)
    const isLoading = useAppSelector(state => state.app.status)
    const packName = useAppSelector(state => state.packs.queryParams.packName)
    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(getCard())
    })
    const data = card.map((c) => {
        return {
            key: c._id,
            name: c.name,
            cardsCount: c.cardsCount,
            lastUpdated: formatDate(c.updated),
            userName: c.user_name,
            actions: <Actions packId={c._id} packUserId={c.user_id}/>

        }
    })

    const columns: ColumnsType<any> = [
        {
            title: <SortPackName/>,
            dataIndex: 'name',
            width: 350,

        },
        {
            title: <SortPacksCards/>,
            dataIndex: 'cardsCount',
            width: 150,
        },

        {
            title: <SortPacksUpdated/>,
            dataIndex: 'lastUpdated',
            width: 150,
        },
        {
            title: <SortPackCreatedBy/>,
            dataIndex: 'userName',
            width: 150,
        },
        {
            title: 'Action',
            dataIndex: 'actions',
            width: 150,
        },
    ];

    if (!isLoggedIn) {
        navigate(routes.SIGN_IN)
    }

    return (
        <div className={s.tableWrapper}>
            <PacksHead/>
            <PacksSettings/>
            <div>

                {
                    <Table columns={columns} dataSource={data} scroll={{x: 1000, y: 500}} loading={isLoading === 'loading'}
                           onRow={record => {
                               return {

                               }
                           }} pagination={{
                        current: 1,
                        pageSize: 1,
                        total: 1,
                        position: ['bottomLeft'],
                        onChange: (page, pageSize) => {
                            dispatch(setPacksPageAC(page))
                            dispatch(setPageCountAC(pageSize))
                        },
                    }}/>
                }
            </div>
        </div>
    );
};

