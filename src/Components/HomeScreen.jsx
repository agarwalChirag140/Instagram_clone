import { Card } from "./Card"
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router"
import { NavBar } from './NavBar'
import { Stories } from './Stories'
import { auth, db } from "../firebase"
import { CreatePost } from "./CreatePost"
import { Profile } from "../Components/Profile"

export const HomeScreen = () => {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const [post, setPost] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState("")

    React.useEffect(() => {
        db.collection("usersPost").orderBy("timestamp", "desc").onSnapshot(snapShot => {
            setPost(snapShot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        }) 
    },[])

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    },[])

    console.log(currentUser)

    if(!isAuth) {
        return <Redirect to="/starting" />
    }
    
    return (
        <div>
            {/* <p>This is the main page</p> */}
            <NavBar />
                <div className="w-full sm:w-4/7 sm:m-auto flex">
                    <div>
                        <Stories />
                        <CreatePost />
                        {
                            post.map((item) => { 
                                return <Card currentUserName={currentUser.displayName} currentUserId={currentUser.id} key={item.id} postId={item.id} caption={item.post.caption} postImage={item.post.postImage} profileName={item.post.profileName} profileUrl={item.post.profileUrl} />
                            })
                        }
                        {/* <Card /> */}
                    </div>
                    <div>
                        <Profile />
                    </div>
                </div>
        </div>
    )
}
