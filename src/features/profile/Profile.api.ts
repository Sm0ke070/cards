import {instance} from "../../app/base-url";
import {ResponseUserDataType} from "../auth/auth.api";

export const profileAPI = {
    changeName(name: string) {
        return instance.put<ResponseUserDataType>('auth/me', {name})
    },
    getUserName() {
        return instance.post<ResponseUserDataType>('auth/me');
    }
}