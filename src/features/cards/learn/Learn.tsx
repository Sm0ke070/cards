import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import React, {FC, useEffect, useState} from "react";
import {CardType, getCardsTC, setCardsPackIdAC} from "../cardsReducer";
import {Link, useParams} from "react-router-dom";
import {putGradeTC} from "./learn-reducer";
import {PutGradeType} from "./learnAPI";
import {routes} from "../../../constants/constants";
import Typography from 'antd/es/typography';
import {Button, Radio, Rate} from "antd";
import s from './Learn.module.css'
import {FaLongArrowAltLeft} from 'react-icons/fa';
import {FrownOutlined, MehOutlined, SmileOutlined} from '@ant-design/icons';

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

const grades = [
    {name: 'не знал', rate: 1},
    {name: 'забыл', rate: 2},
    {name: 'долго думал', rate: 3},
    {name: 'перепутал', rate: 4},
    {name: 'знал', rate: 5}];

export const Learn: FC = () => {
    //const cardQuestion = useAppSelector(state => state.cards.cards[1].question);
    const dispatch = useAppDispatch();


    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useAppSelector((state: AppRootStateType) => state.cards);
    const currentCardName = useAppSelector(state => state.cards.currentCardName)
    const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
    // когда сделаем добавление параметров в урл, можно будет брать из урла данные, а не из редакса
    // const {cardId} = useParams();


    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        /*+answer: string
        +question: string
        +cardsPack_id: string
        +grade: number
        +shots: number
        user_id: string
        +created: string
        +updated: string
        +_id: string*/
    });


    useEffect(() => {
        // console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCardsTC());
            setFirst(false);
        }


        if (cards.length > 0) setCard(getCard(cards));

        //if (cards.length > 0) setCard(getCard(cards));

        return () => {
            // console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardsPack_id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        cards.map(c => {
            if (c.question.length > 0) {
                // dispatch
                setCard(getCard(cards));
            } else {

            }
        })
        /*if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }*/
    }

    const putGradeHandler = (params: PutGradeType) => {
        dispatch(putGradeTC(params))
    }

    //DEV_VERSION && console.log('render LearnPage');


    return (
        <div className={s.wrapper}>
            <Link to={routes.CARDS} className={s.link}>
                <FaLongArrowAltLeft/>back to CardList
            </Link>

            <Typography.Title level={1}>
                LearnPack '{currentCardName}'
            </Typography.Title>

            <Typography.Title level={3}>
                Question: {card.question}
            </Typography.Title>

            <Button type="default" onClick={() => setIsChecked(true)}>
                check
            </Button>


            {isChecked && (
                <>
                    <Typography.Title level={3}>Answer: {card.answer}</Typography.Title>
                    <Typography.Title level={5}>Rate yourself:</Typography.Title>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Radio.Group defaultValue={'grade-' + 0}>

                            {grades.map((g, i) => (
                                    <Radio.Button key={'grade-' + i} value={'grade-' + i}
                                                  onChange={() => putGradeHandler(
                                                      {card_id: card._id, grade: g.rate})}>
                                        {g.name}
                                    </Radio.Button>
                                )
                            )}</Radio.Group>
                    </div>

                    <div style={{marginTop: '15px'}}>
                        <Button type={'primary'} onClick={onNext}>Next</Button>
                    </div>
                </>
            )}
        </div>
    );


    /*return (
        <div>
            <div>
                <h1>packName</h1>
            </div>
            <span>количество ответов на запрос</span>
            <div>
                <div>
                    Question:
                    {cardQuestion}
                    <button onClick={()=>alert('URA')}>OTVET</button>
                </div>

            </div>

        </div>
    )*/
}