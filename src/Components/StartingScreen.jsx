import React from 'react'
import startingImage from "../Images/starting_banner.png"
import { Login } from './Login'

export const StartingScreen = () => {
    
    return (
        <>
            <div className="absolute sm:w-2/5 mt-24 top-0 left-0 right-0 bottom-0 m-auto flex">
                <img src={startingImage} alt="mobile" className="w-2/4 h-3/4 hidden sm:inline-block" />
                <Login />
            </div>
        </>
    )
}
