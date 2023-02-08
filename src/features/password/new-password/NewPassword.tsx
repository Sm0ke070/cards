import React, {useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../app/store";
import {setNewPasswordTC} from "../forgot-password/reset-password-reducer";

type PasswordType = {
    password: string
}

const NewPassword = () => {
    const dispatch = useAppDispatch()
    const {token} = useParams<{ token: string }>()
    const {register, handleSubmit, formState: {errors}, reset} = useForm<PasswordType>({mode: 'onChange'})
    const onSubmit: SubmitHandler<PasswordType> = (data) => {
        const {password} = data
        dispatch(setNewPasswordTC(password, token as string))
        reset()
        setIsSend(!isSend)
    }
    const [isSend, setIsSend] = useState(false)


    return (
        <div>
            {isSend && <Navigate to={'/sign-in'}/>}
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <h1>Create new password</h1>
                <input {...register("password", {
                    required: 'enter password!',
                    pattern: {
                        //3 символа, буквы или цифры
                        value: /(?=.*[a-z,0-9])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                        message: 'Must be more than 7 characters!'
                    }
                })} placeholder={'password'} type="text"/>
                {errors.password && <div>{errors.password.message}</div>}
                <p>Create new password and we will send you further instructions to email.</p>
                <div>
                    <button>Create new password</button>
                </div>
            </form>
        </div>
    )
};

export default NewPassword;