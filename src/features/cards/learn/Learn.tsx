import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../app/store";
import {FC, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CardType, getCardsTC} from "../cardsReducer";
import { useParams } from "react-router-dom";

export const Learn: FC = () => {
    //const cardQuestion = useAppSelector(state => state.cards.cards[1].question);


        const [isChecked, setIsChecked] = useState<boolean>(false);
        const [first, setFirst] = useState<boolean>(true);
        // const [first, setFirst] = useState<boolean>(0);
        const {cards} = useAppSelector((store: AppRootStateType) => store.cards);
        const {cardId} = useParams();

        const [card, setCard] = useState<CardType>({
            _id: 'fake',
            cardsPack_id: '',

            answer: 'answer fake',
            question: 'question fake',
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
                dispatch(getCardsTC(cardId));
                setFirst(false);
            }

            console.log('cards', cards)
            cards.map(c=>{
                if (c.question.length > 0) setCard(getCardsTC(c));
            })
            //if (cards.length > 0) setCard(getCard(cards));

            return () => {
                console.log('LearnContainer useEffect off');
            }
        }, [dispatch, cardId, cards, first]);

        const onNext = () => {
            setIsChecked(false);

            cards.map(c=>{
                if (c.question.length > 0) {
                    // dispatch
                    setCard(getCardsTC(c));
                } else {

                }
            })
            /*if (cards.length > 0) {
                // dispatch
                setCard(getCard(cards));
            } else {

            }*/
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

                        {cards.map((g, i) => (
                            <button key={'grade-' + i} onClick={() => {
                            }}>{g.grade}</button>
                        ))}

                        <div><button onClick={onNext}>next</button></div>
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