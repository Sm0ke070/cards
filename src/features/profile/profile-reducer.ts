const initialState = {
    titleName: 'Ruslan'
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHANGE_NAME':{
            return {...state, titleName: action.titleName}
        }
        default:
            return state
    }
}

type ChangeNameType = {
    type: 'CHANGE_NAME'
    titleName: string
}
type ActionsType =
    ReturnType<typeof ChangeName>

export const ChangeName = (titleName: string): ChangeNameType => ({type: 'CHANGE_NAME', titleName})



