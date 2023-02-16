import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {resetPasswordTC} from "./ResetPasswordReducer";
import CheckEmail from "../check-email/CheckEmail";
import style from '../../auth/auth-form.module.css'
import {Button, Input} from "antd";


type EmailType = {
    email: string
}

const ResetPassword = () => {
    const isSendRequest = useAppSelector(state => state.resPassword.sandRequest)
    const requestError = useAppSelector(state => state.resPassword.errorRequest)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isValid},
        reset
    } = useForm<EmailType>({mode: 'onTouched'})

    const onSubmit: SubmitHandler<EmailType> = (data: EmailType) => {
        const {email} = data
        const message = "<div style='background-color: #ccffff; padding: 15px'><a href='http://localhost:3000/#/new-password/$token$'>нажмите на ссылку для сброса пароля</a></div>"
        dispatch(resetPasswordTC({email, message}))
        reset()

    }

    return (
        <>
            {isSendRequest ? <CheckEmail/>
                :
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                        <h2 style={{width: '70%'}}>Forgot your password?</h2>

                        <Controller
                            control={control}
                            name={'email'}
                            rules={{
                                required: "email is required",
                                pattern: {
                                    value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                    message: 'Please enter valid email!'
                                }
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => <>
                                <Input
                                    placeholder={'email'}
                                    value={value}
                                    style={{width: '70%'}}
                                    onChange={(e) => {
                                        onChange(e.currentTarget.value)
                                    }}/>
                                {errors && <div style={{color: 'red'}}>{errors.email?.message}</div>}
                                {requestError && <div style={{color: 'red'}}>{requestError}</div>}

                            </>}

                        />
                        <div style={{width: '70%'}}>Enter your email address and we will send you further
                            instructions.
                        </div>


                        {/*<input {...register("email", {*/}
                        {/*    required: 'enter email!',*/}
                        {/*    pattern: {*/}
                        {/*        value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,*/}
                        {/*        message: 'Please enter valid email!'*/}
                        {/*    }*/}
                        {/*})} placeholder={'email'} type="text"/>*/}

                        <div style={{width: '70%'}}>
                            <Button type="primary" htmlType="submit" disabled={!isValid} block>
                                Send Instructions
                            </Button>
                        </div>

                        {/*<div>*/}
                        {/*    <button>Send Instructions</button>*/}
                        {/*</div>*/}
                        <Link to={'/sign-in'}>Try logging in</Link>
                    </form>
                </div>}
        </>
    )
};

export default ResetPassword;