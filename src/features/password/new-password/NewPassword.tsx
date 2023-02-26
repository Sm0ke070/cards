import React, {useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../app/store";
import {setNewPasswordTC} from "../forgot-password/ResetPasswordReducer";
import style from "../../auth/auth-form.module.css";
import {Button, Input} from "antd";

type PasswordType = {
    password: string
}

const NewPassword = () => {
        const dispatch = useAppDispatch()
        const {token} = useParams<{ token: string }>()
        const {
            handleSubmit,
            control,
            formState: {errors, isValid},
            reset
        } = useForm<PasswordType>({mode: 'onChange'})
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

                <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                    <h2 style={{width: '70%'}}>Create new password</h2>

                    <Controller
                        control={control}
                        name={'password'}
                        rules={{
                            required: "email is required",
                            pattern: {
                                value: /(?=.*[a-z,0-9])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                                message: 'Must be more than 7 characters!'
                            }
                        }}
                        render={({field: {onChange, value}, fieldState: {error}}) => <>
                            <Input.Password
                                placeholder={'Password'}
                                value={value}
                                style={{width: '70%'}}
                                onChange={(e) => {
                                    onChange(e.currentTarget.value)
                                }}/>
                            {errors && <div style={{color: 'red'}}>{errors.password?.message}</div>}
                        </>}
                    />
                    <div style={{width: '70%'}}>
                        Create new password and we will send you further instructions to email.
                    </div>

                    <div style={{width: '70%'}}>
                        <Button type="primary" htmlType="submit" disabled={!isValid} block>
                            Create new password
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
;

export default NewPassword;