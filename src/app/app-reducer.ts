const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
}
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}
