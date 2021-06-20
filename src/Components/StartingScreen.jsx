import React from 'react'
import { useSelector } from 'react-redux'
import startingImage from "../Images/starting_banner.png"
import { Login } from './Login'
import { Redirect } from 'react-router'

export const StartingScreen = () => {

    const isAuth = useSelector((state) => state.auth.isAuth)

    if(isAuth) {
        return <Redirect to="/" />
    } 
    
    return (
        <>
            <div className="absolute sm:w-2/5 mt-10 sm:mt-20 top-0 left-0 right-0 bottom-0 m-auto flex">
                <img src={startingImage} alt="mobile" className="w-2/4 h-3/4 hidden sm:inline-block" />
                <Login />
            </div>
        </>
    )
}
