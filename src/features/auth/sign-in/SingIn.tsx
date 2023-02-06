import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, Navigate} from "react-router-dom";
import {loginTC} from "./auth-reducer";

type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}
const SingIn = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        clearErrors
    } = useForm<LoginType>({mode: 'onChange'})
    const onSubmit: SubmitHandler<LoginType> = (data: LoginType) => {
        dispatch(loginTC(data))
        reset()
        clearErrors()
    }
    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div>
                    <input {...(register("email", {
                        required: 'email is required',
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: 'Please enter valid email!'
                        }
                    }))} placeholder={'email'} type="text"/>
                    {errors.email && <div>{errors.email.message}
                    </div>}
                </div>

                <input {...register("password", {required: 'password is required'})} placeholder={'pass'} type="text"/>
                {errors.password && <div>{errors.password.message}</div>}

                <div>
                    <input{...register("rememberMe")} type="checkbox"/> rememberMe
                </div>

                <div>
                    <button>ok</button>
                </div>
                <div>
                    <Link to="/sign-up">sign-up</Link>
                </div>
            </form>
        </>
    );
};

export default SingIn;