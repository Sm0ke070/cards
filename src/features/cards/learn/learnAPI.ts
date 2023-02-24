import {instance} from "../../../app/base-url";



export const LearnAPI = {
    putGrade(params: PutGradeType) {
        return instance.put<GradeResponseType>('/cards/grade', {...params})
    }
}
export type PutGradeType = {
    card_id: string
    grade: number
}
export type GradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}