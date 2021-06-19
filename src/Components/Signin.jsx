import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from './Login'
import { registerUser } from "../Redux/Auth/action"
import { storage } from '../firebase'

export const Signin = () => {

    const [login, setLogin] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [name, setName] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [number, setNumber] = React.useState("")
    const [uploadImage, setUploadImage] = React.useState(null)
    const [imageUrl, setImageUrl] = React.useState("")
    const [imageErrorMessage, setimageErrorMessage] = React.useState("")

    const logIn = () => {
        setLogin(!login)
    }

    const dispatch = useDispatch()

    const success_message = useSelector((state) => state.auth.registerSuccessMessage)
    const error_message = useSelector((state) => state.auth.registerErrorMessage)
    const register_success = useSelector((state) => state.auth.registerSuccess)
    const register_failure = useSelector((state) => state.auth.registerFailure)

    const signUp = (e) => {
        e.preventDefault()

        const uploadUserProfileImage = storage.ref(`profileImages/${uploadImage.name}`).put(uploadImage)
        uploadUserProfileImage.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("profileImages")
                    .child(uploadImage.name)
                    .getDownloadURL()
                    .then(url => {
                        setImageUrl(url)
                    }) 
                    .catch((err) => {
                        console.log(err)
                    })
            }
        )
        console.log(imageUrl)
        if(imageUrl) {
            dispatch(registerUser({email, name, username, password, number, imageUrl}))
        }
        else {
            setimageErrorMessage("Using an Existing image")
        }
    }

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setUploadImage(e.target.files[0])
        }
    }
    return (
        <>
            {
                login ? 
                  <Login /> :
                <div className="w-full sm:w-2/4 mr-4">
                    <div className="shadow-xl border-2 border-gray-300 mr-2 ml-2 w-full">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVKYACsp_iK3zk3TdqJ-bwTpSP3_3vlVotARHETB16ZLg_n37rhkRkD01JYxF0vf8PJc&usqp=CAU" alt="instagram logo" className="w-3/5 m-auto" />
                        <form>
                            <div className=" w-4/5 m-auto mt-2">
                                <input type="text" placeholder="Full Name" className="w-full border-2 border-gray p-2 focus:outline-none" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className=" w-4/5 m-auto mt-2">
                                <input type="text" placeholder="Username" className="w-full border-2 border-gray p-2 focus:outline-none" value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className=" w-4/5 m-auto mt-2">
                                <input type="text" placeholder="Email" className="w-full border-2 border-gray p-2 focus:outline-none" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className=" w-4/5 m-auto mt-2">
                                <input type="text" placeholder="Password" className="w-full border-2 border-gray p-2 focus:outline-none" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className=" w-4/5 m-auto mt-2">
                                <input type="text" placeholder="Type a number" className="w-full border-2 border-gray p-2 focus:outline-none" value={number} onChange={e => setNumber(e.target.value)} />
                            </div>
                            <div className=" w-4/5 m-auto mt-3">
                                <label>Choose a photo for profile</label>
                                <input type="file" className="mt-4" onChange={handleChange} />
                            </div>
                            <div className="w-4/5 m-auto">
                                <button className={`w-full mt-4 bg-blue-400 text-white p-2 font-bold ${email && name && username && password && "bg-blue-900"}`} onClick={signUp}>Sign up</button>
                            </div>                         
                        </form>
                        {
                           register_success === true && register_failure === false &&  <p className="pl-9 text-green-700 pt-1">{success_message}</p>
                        }
                        {
                           register_success === false && register_failure === true &&  <p className="pl-9 text-red-700 pt-1">{error_message}</p>
                        }
                        <p className="text-center text-sm pt-5 text-gray-500">By Signing up, you agree to our <span className="font-bold">Terms, Data</span></p>
                        <p className="text-center text-sm text-gray-500 mb-5"><span className="font-bold">Policy</span> and <span className="font-bold">Cookies Policy</span></p>
                    </div>
                    <div className="mr-2 ml-2 shadow-xl border-2 border-gray-300 w-full flex justify-center items-center itens-center mt-5 h-14">
                        <p>Have an account? <span className="text-blue-600 cursor-pointer" onClick={logIn}>Log in</span></p>
                    </div>
                </div>
            }
        </>
    )
}
