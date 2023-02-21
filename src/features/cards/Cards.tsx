import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {routes} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {ColumnsType} from "antd/es/table";
import {SortPacksUpdated} from "../packs/packs-sort/SortPacksUpdated";
import {formatDate} from "../../common/utils/formatDate";
import {Actions} from "../packs/Actions";
import {getCardsTC, setCardsPageAC, setCardsPageCountAC} from "./cardsReducer";
import s from "../packs/Packs.module.css";
import {PacksHead} from "../packs/PacksHead";
import {PacksSettings} from "../packs/PackSettings/PacksSettings";
import {Table} from "antd";

interface DataType {
    key: React.Key
    question: string;
    answer: string;
    lastUpdated: string
    grade: number
}

export const Cards = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const card = useAppSelector(state => state.cards.cards)
    const cardId = useAppSelector(state => state.cards.cardsPack_id)
    const isLoading = useAppSelector(state => state.app.status)
    const packId = useAppSelector(state => state.cards.cardsPack_id)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const total = useAppSelector(state => state.cards.cardsTotalCount)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsTC())
    }, [])

    const data = card.map((c) => {
        return {
            key: c._id,
            answer: c.answer,
            question: c.question,
            grade: c.grade,
            lastUpdated: formatDate(c.updated),
            actions: <Actions packId={c._id} packUserId={c.user_id}/>

        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: "Answer",
            dataIndex: 'answer',
            width: 350,

        },
        {
            title: 'Question',
            dataIndex: 'question',
            width: 150,
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            width: 150,
        },

        {
            title: <SortPacksUpdated/>,
            dataIndex: 'lastUpdated',
            width: 150,
        },
        {
            title: 'Action',
            dataIndex: 'actions',
            width: 150,
        },
    ]

    if (!isLoggedIn) {
        navigate(routes.SIGN_IN)
    }
    if (!packId) {
        navigate(routes.PACKS)
    }


    return (
        <div className={s.tableWrapper}>
            <PacksHead/>
            <PacksSettings/>
            <div>
                {
                    <Table columns={columns}
                           dataSource={data}
                           scroll={{x: 1000, y: 500}}
                           loading={isLoading === 'loading'}
                           onRow={record => {
                               return {}
                           }} pagination={{
                        current: page,
                        pageSize: pageCount,
                        total: total,
                        position: ['bottomLeft'],
                        onChange: (page, pageSize) => {
                            dispatch(setCardsPageAC(page))
                            dispatch(setCardsPageCountAC(pageSize))
                        },
                    }}/>
                }
            </div>
        </div>
    );
};

