import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SocialIcon } from "react-social-icons"
import { loginUser } from '../Redux/Auth/action'
import { Signin } from './Signin'
import { Redirect } from "react-router"

export const Login = () => {

    const [signup, setSignup] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const dispatch = useDispatch()
    const loginSuccessMessage = useSelector((state) => state.auth.loginSuccessMessage)
    const loginErrorMessage = useSelector((state) => state.auth.loginErrorMessage)
    const loginSuccess = useSelector((state) => state.auth.loginSuccess)
    const loginFailure = useSelector((state) => state.auth.loginFailure)

    const isAuth = useSelector((state) => state.auth.isAuth)

    if(isAuth){
        return <Redirect to="/" />
    }

    const signUp = () => {
        setSignup(!signup)
    }

    const logIn = (e) => {
        e.preventDefault()
        dispatch(loginUser({email, password}))
    }
    return (
        <>  
            {
                signup ? 
                  <Signin /> :
                <div className="w-full sm:w-2/4">
                    <div className="shadow-xl border-2 border-gray-300 mr-2 ml-2 ">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVKYACsp_iK3zk3TdqJ-bwTpSP3_3vlVotARHETB16ZLg_n37rhkRkD01JYxF0vf8PJc&usqp=CAU" alt="instagram logo" className="w-3/5 m-auto" />
                        <form>
                            <div className=" w-4/5 m-auto">
                                <input type="text" placeholder="Phone number, username or email" className="w-full border-2 border-gray p-2 mt-5 focus:outline-none" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className=" w-4/5 m-auto mt-2">
                                <input type="text" placeholder="Password" className="w-full border-2 border-gray p-2 focus:outline-none" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="w-4/5 m-auto">
                                <button className="w-full mt-4 bg-blue-700 text-white p-2 font-bold" onClick={logIn}>Log In</button>
                            </div>
                            {
                                loginSuccess === true && loginFailure === false && <p className="pl-9 text-green-700 pt-1">{loginSuccessMessage}</p>
                            } 
                            {
                                loginSuccess === false && loginFailure === true && <p className="pl-9 text-red-700 pt-1">{loginErrorMessage}</p>
                            }                        
                            <div className="flex w-4/5 m-auto">
                                <hr className="mt-6 border-gray-700 w-40" />
                                <p className="ml-2 mt-3 text-gray-500 font-semibold">OR</p>
                                <hr className="mt-6 border-gray-700 w-40 ml-3" />
                            </div>
                            <div className="flex mt-5 cursor-pointer w-4/5 justify-center items-center m-auto">
                                <SocialIcon url="https://facebook.com/in/jaketrent" style={{width: 25, height: 25, marginLeft: 2}} />
                                <p className="text-blue-900 ml-2 font-bold">Log in with Facebook</p>
                            </div>
                            <div className="flex mt-5 cursor-pointer w-4/5 justify-center items-center m-auto">
                                <SocialIcon url="https://google.com/in/jaketrent" style={{width: 25, height: 25, marginLeft: 2}} />
                                <p className="text-red-900 ml-2 font-extrabold">Log in with Google</p>
                            </div>
                            <p className="text-center mb-5 mt-5 text-blue-900 cursor-pointer">Forgot password?</p>
                        </form>
                    </div>
                    <div className="flex justify-center items-center p-4 border-2 border-gray-300 mt-5 bg-white shadow-xl mr-2 ml-2">
                        <p className="font-normal">Don't have an account? <span className="text-blue-500 font-bold cursor-pointer" onClick={signUp}>Sign up</span></p>
                    </div>
                    <div className=" mt-5">
                        <p className="pt-2 text-center">Get the app.</p>
                        <div className="flex mt-4">
                            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="App Store" className="w-1/3 ml-14" />
                            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="Google play" className="w-1/3 ml-2" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
