import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import SuperCardsSort from "./SuperCardsSort";
import {sortingCardsMethods} from "../../../constants/sortingMethods";
import {setSortCardsMethodAC} from "../cardsReducer";

const SortCardsUpdated = () => {

    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.cards.queryParams.sortCards)
    const onClickSort = (newSort: sortingCardsMethods) => {
        dispatch(setSortCardsMethodAC(newSort))
    }
    return (
        <div>
            <span>Last Updated</span>
            <SuperCardsSort sort={sort} value={'updated'} onChange={onClickSort}/>
        </div>
    );
};

export default SortCardsUpdated;