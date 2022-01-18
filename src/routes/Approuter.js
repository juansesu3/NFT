import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import Home from '../components/Home'

const Approuter = ({correoUsuario}) => {
    return (
        <div>
            <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home correoUsuario={correoUsuario}/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Approuter
