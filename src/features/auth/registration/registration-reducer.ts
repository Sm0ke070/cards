const initialState = {
    isLoggedIn: false,

}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}