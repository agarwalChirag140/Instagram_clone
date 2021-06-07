import { Card } from "./Card"
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from "react-router"
import { NavBar } from './NavBar'
import { Stories } from './Stories'
import { db } from "../firebase"
import { CreatePost } from "./CreatePost"

export const HomeScreen = () => {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const [post, setPost] = React.useState([])

    React.useEffect(() => {
        db.collection("usersPost").onSnapshot(snapShot => {
            setPost(snapShot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        }) 
    },[])

    if(!isAuth) {
        return <Redirect to="/starting" />
    }
    
    return (
        <div>
            {/* <p>This is the main page</p> */}
            <NavBar />
            <div className="w-full sm:w-2/4 sm:m-auto">
                <Stories />
                <CreatePost />
                {
                    post.map((item) => {
                        return <Card key={item.id} caption={item.post.caption} postImage={item.post.postImage} profileName={item.post.profileName} profileUrl={item.post.profileUrl} />
                    })
                }
                {/* <Card /> */}
            </div>
        </div>
    )
}
