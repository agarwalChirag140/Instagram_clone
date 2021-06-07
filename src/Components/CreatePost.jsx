import React from "react"
import { useSelector } from "react-redux"
import { auth, db, storage } from "../firebase"

export const CreatePost = () => {

    const [postImage, setPostImage] = React.useState("")
    const [postCaption, setPostCaption] = React.useState("")
    const [postImageUrl, setPostImageUrl] = React.useState("")
    const [currentUser, setCurrentUser] = React.useState("")

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setPostImage(e.target.files[0])
        }
    }

    const createPost = () => {
        const createPostImage = storage.ref(`postImages/${postImage.name}`).put(postImage)

        createPostImage.on(
            "state changed",
            snapshot => {},
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("postImages")
                    .child(postImage.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("usersPost")
                        .add({
                            caption: postCaption,
                            postImage: url,
                            profileName: currentUser.displayName,
                            profileUrl: currentUser.photoURL
                        })

                        setPostCaption("")
                        setPostImage("")
                    })
            }
        )

    }

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    },[])

    return (
        <>
            <div className="sm:w-3/4 border-2 border-gray-300 mt-4">
                <h1 className="text-2xl font-semibold pl-2 pt-1">Create Post</h1>
                <div className="border-t-2 border-gray-300 mt-1">
                <textarea rows="3" className="w-full focus:outline-none pl-2 text-xl pt-1" placeholder="Add the post" value={postCaption} onChange={e => setPostCaption(e.target.value)} />
                </div>
                <div className="border-t-2 border-gray-300 p-2 flex justify-between">
                    <input type="file" onChange={handleChange} />
                    <button className="p-1 bg-blue-800 text-white font-bold focus:-outline-none" onClick={createPost}>Create post</button>
                </div>
            </div>
        </>
    )
}