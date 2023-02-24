import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import {FC, useEffect, useState} from "react";
import {CardType, getCardsTC} from "../cardsReducer";
import {useParams} from "react-router-dom";
import {putGradeTC} from "./learn-reducer";
import {PutGradeType} from "./learnAPI";

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const grades = [
    {name: 'не знал', rate: 1},
    {name: 'забыл', rate: 2},
    {name: 'долго думал', rate: 3},
    {name: 'перепутал', rate: 4},
    {name: 'знал', rate: 5}];
// {name: 'не знал', rate: 1}

export const Learn: FC = () => {
    //const cardQuestion = useAppSelector(state => state.cards.cards[1].question);


    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useAppSelector((state: AppRootStateType) => state.cards);
    const {cardId} = useParams();
    //const grade=useAppSelector(state=>state.learn.grade)


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

    const dispatch = useAppDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCardsTC());
            setFirst(false);
        }


        if (cards.length > 0) setCard(getCard(cards));

        //if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardId, cards, first]);

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
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (


                        <button key={'grade-' + i}
                                onClick={() => putGradeHandler(
                                    {card_id: card._id, grade: g.rate})}>
                            {g.name}
                        </button>
                    ))}

                    <div>
                        <button onClick={onNext}>next</button>
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