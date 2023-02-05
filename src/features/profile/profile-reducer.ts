const initialState = {
    titleName: 'Ruslan'
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHANGE_NAME':{
            return {...state, titleName: action.titleName}
               /* let copy=[...state]
                let newTitleName=copy.find(n=>n===action.titleName)
            if (newTitleName){
                newTitleName=action.titleName
            }
            return copy*/
        }
        default:
            return state
    }
}

type ChangeNameType = {
    type: 'CHANGE_NAME'
    titleName: string
}
type ActionsType = ReturnType<typeof ChangeName>

const ChangeName = (titleName: string): ChangeNameType => ({type: 'CHANGE_NAME', titleName})

