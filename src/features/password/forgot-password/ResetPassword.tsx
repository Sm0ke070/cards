import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {SubmitHandler, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {resetPasswordTC} from "./reset-password-reducer";
import CheckEmail from "../check-email/CheckEmail";


type EmailType = {
    email: string
}

const ResetPassword = () => {
    const isSendRequest = useAppSelector(state => state.resPassword.sandRequest)
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors}, reset} = useForm<EmailType>({mode: 'onChange'})

    const onSubmit: SubmitHandler<EmailType> = (data: EmailType) => {
        const {email} = data
        const message = "<div style='background-color: #ccffff; padding: 15px'><a href='http://localhost:3000/#/new-password/$token$'>нажмите на ссылку для сброса пароля</a></div>"
        dispatch(resetPasswordTC({email, message}))
        reset()

    }

    // useEffect(() => {
    //     dispatch(resetPasswordAC(false))
    // }, [dispatch])

    return (
        <>
            {isSendRequest ? <CheckEmail/> : <div>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <h1>Forgot your password?</h1>
                    <input {...register("email", {
                        required: 'enter email!',
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: 'Please enter valid email!'
                        }
                    })} placeholder={'email'} type="text"/>
                    {errors.email && <div>{errors.email.message}</div>}
                    <div>
                        <button>Send Instructions</button>
                    </div>
                </form>
                <Link to={'/sign-in'}>Try logging in</Link>
            </div>}
        </>
    )
};

export default ResetPassword;