import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, Navigate} from "react-router-dom";
import {loginTC} from "./SingInReducer";
import {Button, Checkbox, Input} from "antd";
import style from "../sign-up/SignUp.module.css";
import {routes} from "../../../constants/constants";
import {LoginParamsType} from "../auth.api";

const SingIn = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const errorSignIn = useAppSelector(state => state.auth.errorSignIn)

    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        clearErrors
    } = useForm<LoginParamsType>({mode: 'onChange'})
    const onSubmit: SubmitHandler<LoginParamsType> = (data: LoginParamsType) => {
        dispatch(loginTC(data))
        clearErrors()
    }

    if (isLoggedIn) {
        return <Navigate to={routes.PROFILE_PATH}/>
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>

                <h1>Sign In</h1>

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
                    </>}
                />

                <Controller
                    name={'password'}
                    control={control}
                    rules={{
                        required: "Field is required",
                        minLength: {
                            value: 8,
                            message: 'Minimum length 8 characters'
                        }
                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) =>
                        <>
                            <Input.Password
                                type={'password'}
                                placeholder={'password'}
                                value={value}
                                style={{width: '70%'}}
                                onChange={e => onChange(e.currentTarget.value)}/>
                            {error && <div style={{color: 'red'}}>{errors.password?.message}</div>}
                            {errorSignIn && <div style={{color: 'red'}}>{errorSignIn}</div>}
                        </>}/>

                <Controller
                    name={'rememberMe'}
                    control={control}
                    render={({field: {onChange, value}, fieldState: {error}}) =>
                        <>
                            <Checkbox checked={value} onChange={e => onChange(e.target.checked)}>
                                rememberMe
                            </Checkbox>
                        </>}/>
                <Link to={routes.RESET_PASS_PATH}>Forgot Password?</Link>

                <div style={{width: '70%'}}>
                    <Button type="primary" htmlType="submit" disabled={!isValid} block>
                        Login
                    </Button>
                </div>

                <div>Already have an account?</div>
                <div>
                    <Link to="/sign-up">sign-up</Link>
                </div>
            </form>
        </>
    );
};

export default SingIn;