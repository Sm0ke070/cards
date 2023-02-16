import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {Link, Navigate} from 'react-router-dom';
import {setErrorSignUpAC, setIsRegisteredAC, SignUpTC} from './SignUpReducer';
import {Button, Input, Spin} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import style from "../auth-form.module.css";
import {routes} from "../../../constants/constants";


type Inputs = {
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const isRegistered = useAppSelector(state => state.registration.isRegistered)
    const errorSignUp = useAppSelector(state => state.registration.errorSignUp)
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    console.log(status)

    const dispatch = useAppDispatch()
    const {
        control,
        watch,
        handleSubmit,
        reset,
        clearErrors,
        formState: {errors, isValid}
    } = useForm<Inputs>({mode: 'onChange'})

    const confirmPasswordValue = watch("password")

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {email, password} = data
        dispatch(SignUpTC({email, password}))
        reset()
        clearErrors()
    }

    if (isRegistered) {
        dispatch(setIsRegisteredAC(false))
        return <Navigate to={routes.SIGN_IN}/>
    }

    if (isLoggedIn) {
        return <Navigate to={routes.PROFILE}/>
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <h2>Sign Up</h2>

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "email is required",
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: 'Please enter valid email!'
                        }

                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                        <Input value={value}
                               style={{width: '70%'}}
                               onChange={(e) => {
                                   dispatch(setErrorSignUpAC(null))
                                   onChange(e.currentTarget.value)
                               }}
                               placeholder={'Email'}
                        />
                        {error && <div style={{color: 'red'}}>{errors.email?.message}</div>}
                    </>}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: "Field is required",
                        minLength: {
                            value: 8,
                            message: 'Minimum length 8 characters'
                        }
                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                        <Input.Password value={value}
                                        style={{width: '70%'}}
                                        onChange={(e) => onChange(e.currentTarget.value)}
                                        placeholder={'Password'}
                                        iconRender={(visible) => (visible ?
                                            <EyeTwoTone/> :
                                            <EyeInvisibleOutlined/>)}/>
                        {error && <div style={{color: 'red'}}>{errors.password?.message}</div>}
                    </>}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: "Field is required",
                        validate: (value) => value === confirmPasswordValue || "Password mismatch"

                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                        <Input.Password value={value}
                                        style={{width: '70%'}}
                                        onChange={(e) => onChange(e.currentTarget.value)}
                                        placeholder={'Сonfirm Password'}
                                        iconRender={(visible) => (visible ?
                                            <EyeTwoTone/> :
                                            <EyeInvisibleOutlined/>)}
                        />
                        {error && <div style={{color: 'red'}}>{errors.confirmPassword?.message}</div>}
                        {errorSignUp && <div style={{color: 'red'}}>{errorSignUp}</div>}
                    </>}
                />

                <div style={{width: '70%'}}><Button type="primary" htmlType="submit" disabled={!isValid} block>Sign
                    Up</Button></div>

                {status === 'loading' && <Spin size="large"/>}

                {status !== 'loading' && <><br/><br/> </>}

                <h5>Already have an account?</h5>
                <Button type="link" block>
                    <Link to={'/sign-in'}>Sign in</Link>
                </Button>
            </form>

        </>
    );

};

export default SignUp;