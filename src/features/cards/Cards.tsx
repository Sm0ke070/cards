import React, {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {routes} from '../../constants/constants';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {ColumnsType} from "antd/es/table";
import {formatDate} from "../../common/utils/formatDate";
import {getCardsTC, setCardsPackIdAC, setCardsPageAC, setCardsPageCountAC} from "./cardsReducer";
import s from "../packs/Packs.module.css";
import {Table} from "antd";
import {CardsHead} from "./CardsHead";
import FindCards from "./cards-settings/FindCards";
import ActionsCard from "./ActionsCard";
import SortCardsUpdated from "./cards-sort/SortCardsUpdated";
import RatingOfCards from "./rating-of-cards/ratingOfCards";

interface DataType {
    key: React.Key
    question: string;
    answer: string;
    lastUpdated: string
    grade: JSX.Element
}

export const Cards = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const card = useAppSelector(state => state.cards.cards)
    const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion)
    const isLoading = useAppSelector(state => state.app.status)
    const packId = useAppSelector(state => state.cards.cardsPack_id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const page = useAppSelector(state => state.cards.queryParams.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const sortCards = useAppSelector(state => state.cards.queryParams.sortCards)
    const myId = useAppSelector(state => state.auth.userData._id)

    const dispatch = useAppDispatch()

    const isMy = myId === packUserId

    useEffect(() => {
        dispatch(getCardsTC())
    }, [cardQuestion, sortCards, page, pageCount])

    useEffect(() => {
        // return ()=>{
        //     dispatch(setCardsPackIdAC(''))
        // }
    }, [])
    // const onChangeTableHandler = (page: number, pageSize: number) => {
    //     dispatch(setCardsPageAC(page))
    //     dispatch(setCardsPageCountAC(pageSize))
    // }

    const data = card.map((c) => {
        return {
            key: c._id,
            answer: c.answer,
            question: c.question,
            grade: <><RatingOfCards isMy={isMy}
                                    packUserId={c.user_id}
                                    question={c.question}
                                    cardsPack_id={c._id}
                                    cardUserId={c.user_id}
                                    value={c.grade}/></>,
            lastUpdated: formatDate(c.updated),

        }
    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Question',
            dataIndex: 'question',
            width: 250,
        },
        {
            title: "Answer",
            dataIndex: 'answer',
            width: 350,

        },
        {
            title: <SortCardsUpdated/>,
            dataIndex: 'lastUpdated',
            width: 130,
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            width: 150,
        }
    ]

    if (!isLoggedIn) {
        return <Navigate to={routes.SIGN_IN}/>
    }
    if (!packId) {
        return <Navigate to={routes.PACKS}/>
    }


    return (
        <div className={s.tableWrapper}>
            <CardsHead cardsPack_id={packId} packUserId={packUserId}/>
            <FindCards/>


            <div>
                {
                    <Table columns={columns}
                           dataSource={data}
                           scroll={{x: 1000, y: 500}}
                           loading={isLoading === 'loading'}
                           onRow={record => {
                               return {}
                           }}
                           pagination={false}
                        //    pagination={{
                        // current: page,
                        // pageSize: pageCount,
                        // total: cardsTotalCount,
                        //
                        // position: ['bottomLeft'],
                        // onChange: (page, pageSize) => {
                        //     onChangeTableHandler(page, pageSize)
                        // }}}
                    />
                }
            </div>
        </div>
    );
}