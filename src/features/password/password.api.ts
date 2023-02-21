import {instance} from "../../app/base-url";

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