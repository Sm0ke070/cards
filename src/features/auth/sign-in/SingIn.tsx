import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import {loginTC} from "./SingIn-reducer";
import {LoginParamsType} from "./SingIn.api";
import {Button, Checkbox, Input} from "antd";
import style from "../sign-up/SignUp.module.css";
import {routes} from "../../../common/components/routes/Routes";

const SingIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        clearErrors
    } = useForm<LoginParamsType>({mode: 'onChange'})
    const onSubmit: SubmitHandler<LoginParamsType> = (data: LoginParamsType) => {
        dispatch(loginTC(data))
        reset()
        clearErrors()
    }

    if (isLoggedIn) {
        navigate(routes.PROFILE_PATH)
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
                        <Input.Group className={style.inputGroup}>

                            <Input
                                placeholder={'email'}
                                value={value}
                                style={{width: '70%'}}
                                onChange={(e) => {
                                    onChange(e.currentTarget.value)
                                }
                                }
                            />
                        </Input.Group>
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
                            <Input.Group className={style.inputGroup}>

                                <Input
                                    type={'password'}
                                    placeholder={'password'}
                                    value={value}
                                    style={{width: '70%'}}
                                    onChange={e => onChange(e.currentTarget.value)}
                                />

                            </Input.Group>
                            {error && <div style={{color: 'red'}}>{errors.password?.message}</div>}
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
                        Sign In
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