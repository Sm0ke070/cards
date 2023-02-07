import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {SignUpTC} from './signUp-reducer';


type Inputs = {
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const isRegistered = useAppSelector(state => state.registration.isRegistered)
    const dispatch = useAppDispatch()
    const {
        register,
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
        return <Navigate to={'/sign-in'}/>
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div><input type="text"
                            placeholder={'Email'}
                            {...register("email", {
                                required: "email is required",
                                pattern: {
                                    value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                    message: 'Please enter valid email!'
                                }

                            })}/></div>

                <div style={{color: 'red'}}>{errors?.email && <p>{errors.email.message}</p>}</div>

                <div><input type="text"
                            placeholder={'Password'}
                            {...register("password",
                                {
                                    required: "Field is required",
                                    minLength: {
                                        value: 8,
                                        message: 'Minimum length 8 characters'
                                    }
                                })}/></div>
                <div style={{color: 'red'}}>{errors?.password && <p>{errors.password.message}</p>}</div>


                <div><input type="text"
                            placeholder={'Сonfirm Password'}
                            {...register("confirmPassword",
                                {
                                    required: "Field is required",
                                    validate: (value) => value === confirmPasswordValue || "Password mismatch"

                                })}/></div>

                <div style={{color: 'red'}}>{errors?.confirmPassword &&
                    <p>{errors.confirmPassword.message}</p>}</div>

                123
                <div>
                    <input type="submit" disabled={!isValid} value={'Sign Up'}/>
                </div>
            </form>
        </div>
    );

};

export default SignUp;