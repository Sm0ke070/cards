import React, {useEffect} from 'react';
import {authAPI} from "./login.api";
import {SubmitHandler, useForm} from "react-hook-form";


type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}
const Login = () => {
    useEffect(() => {
        authAPI.login({
            "email": "smokedeveloper070@gmail.com",
            "password": "100%_Smoke",
            "rememberMe": true
        })
            .then(res => res.data._id)
    })
    const {register, handleSubmit, formState: {errors}} = useForm<LoginType>()
    const onSubmit: SubmitHandler<LoginType> = (data) => {
        alert(data.email)
    }

    return (
        <>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div>
                <input {...(register("email",{required: 'email is required'}))} placeholder={'email'} type="text"/>
                {errors.email&& <div>{errors.email.message}</div>}
                </div>
                <input {...register("password")} placeholder={'pass'} type="text"/>
                <input{...register("rememberMe")} placeholder={'pass'} type="checkbox"/>

                <button>ok</button>

            </form>

        </>

    );
};

export default Login;