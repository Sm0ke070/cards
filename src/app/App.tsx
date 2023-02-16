import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store";
import {meTC} from "./AppReducer";
import Routing from '../common/components/routes/Routes'
import {Spin} from "antd";

const App = () => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])
    //1
    if (!isInitialized) {
        return <div style={{marginTop:'35vh',display:'flex',justifyContent:'center'}}>
            <Spin tip="Loading" size="large" />
        </div>
    }

    return (
        <>
            <Routing/>
        </>
    );
}

export default App;
