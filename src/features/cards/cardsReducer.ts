import {sortingCardsMethods} from '../../constants/sortingMethods';
import {Dispatch} from 'redux';

//
// const initialState = {
//     cards: [] as cardsType[],
//     cardPacksTotalCount: 0,
//     minCardsCount: 0,
//     maxCardsCount: 110,
//     resetFilter: false,
//     queryParams: {
//         pageCount: 5,
//         page: 1,
//         cardName: '',
//         sortCards: sortingCardsMethods.desUpdate
//     },
// }
// type InitialStateType = typeof initialState
//
// export const cardsReducer = (state: InitialStateType = initialState, action: packsReducerActionsType): InitialStateType => {
//     switch (action.type) {
//
//         default:
//             return state
//     }
// }
// //Actions
//
//
//
// // Thunks
// export const getCards = () => async (dispatch: Dispatch, getState: any) => {
//     const {packName, sortPacks, max, min, page, pageCount} = getState().c.queryParams
//     const user_id = filter === 'MY' ? getState().auth.userData._id : ''
//     dispatch(setAppStatusAC('loading'))
//
//     try {
//         const res = await PacksAPI.getPacks({packName, sortPacks, max, min, page, pageCount, user_id})
//         const {cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount} = res.data
//         dispatch(setPacks({cardPacks, cardPacksTotalCount, minCardsCount, maxCardsCount}))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (e) {
//         dispatch(setAppStatusAC('failed'))//временно тут
//
//     }
//
// }
//



// Types
