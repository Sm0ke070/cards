import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./store";
import {meTC} from "./AppReducer";
import Routing from '../common/components/routes/Routes'

const App = () => {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(meTC())
    }, [dispatch])
    //1
    if (!isInitialized) {
        return <div style={{textAlign: 'center'}}>
            <h1>Loading</h1>
        </div>
    }

    return (
        <>
            <Routing/>
        </>
    );
}

export default App;
