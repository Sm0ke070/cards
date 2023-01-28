import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Test from "../components/Test";
import Login from "../features/login/Login";
import Profile from "../features/profile/Profile";

function App() {
    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<Test/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>Page not found</h1>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>

        </div>
    );
}

export default App;
