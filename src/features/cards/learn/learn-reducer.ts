import {Dispatch} from "redux";
import {setAppStatusAC} from "../../../app/AppReducer";
import {LearnAPI, PutGradeType} from "./learnAPI";

const initialState = {
    _id: '',
    cardsPack_id: '',
    card_id: '',
    user_id: '',
    grade: 0,
    shots: 0,
}

type InitialStateType = typeof initialState

export const learnReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "LEARN/PUT_GRADE": {
            return {
                ...state,
                card_id: action.card_id,
                grade: action.grade
            }
        }
        default: {
            return state
        }
    }
}

export const putGrade = (card_id: string, grade: number) => ({type: 'LEARN/PUT_GRADE', card_id, grade})

export const putGradeTC = (params: PutGradeType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await LearnAPI.putGrade(params)
        dispatch(putGrade(res.data.card_id, res.data.grade))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        dispatch(setAppStatusAC('failed'))
    }
}

type ActionType = ReturnType<typeof putGrade>

