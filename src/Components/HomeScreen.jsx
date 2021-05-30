import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router"

export const HomeScreen = () => {
    const isAuth = useSelector((state) => state.auth.isAuth)

    if(!isAuth) {
        return <Redirect to="/starting" />
    }
    
    return (
        <div>
            <p>This is the main page</p>
        </div>
    )
}
