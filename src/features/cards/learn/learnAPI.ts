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


/*
const obj = {
    a: 1,
    foo(x) {
        a:2,
            bas = function () {
                return this.a
            },
            bar = () => this.a
        if (x) {
            return bar
        } else {
            return bas
        }
    }
}
console.log(obj.foo()())
console.log(obj.foo(true)())*/


