import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'https://neko-back.herokuapp.com/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const passwordAPI = {
    resetPassword(data: resetPasswordParamsType) {
        return instance.post<resetPasswordParamsType>('/auth/forgot', data)
    },
    serNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<setNewPasswordParamsType>('/auth/set-new-password', {password, resetPasswordToken})
    }
}

export type resetPasswordParamsType = {
    email: string
    message: string
}
export type setNewPasswordParamsType = {
    password: string
    token: string
}