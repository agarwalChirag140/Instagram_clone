import Avatar from "@material-ui/core/Avatar"
import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'
import { db } from "../firebase";
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6.5),
    },
}));

export const Card = ({caption, postImage, profileName, profileUrl, postId, currentUserId, currentUserName}) => {
    const classes = useStyles()
    const [comment, setComment] = React.useState("")
    const [comments, setComments] = React.useState([])
    const [likes, setLikes] = React.useState([])
    const [liked, setLiked] = React.useState("")

    React.useEffect(() => {
      if(postId) {
        db.collection("usersPost")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()))
        })
      }
    }, [postId])

    React.useEffect(() => {
      if(postId) {
        db.collection("usersPost")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data().username))
        })
      }
    },[postId])

    const postComment = () => {
      db.collection("usersPost").doc(postId).collection("comments").add({
          username: currentUserName,
          text: comment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setComment('')
    }

    return (
        <>
            <div className="w-full border-2 border-gray-300 mt-4 mb-4">
                
                {/* post profile photo */}
                <div className="h-16 border-b-2 border-gray-300 p-1 flex items-center">
                    <Avatar className={classes.large} src={profileUrl} />
                    <p className="pl-2 font-bold">{profileName}</p>
                </div>
                
                {/* caption */}
                <p className="pl-2 pr-2 pt-2">{caption}</p>
                
                {/* Post image */}
                <img src={postImage} alt="post" className="mt-4 h-96 w-full"/>
                
                {/* Post icons */}
                <div className="flex m-2">
                    <AiOutlineHeart className="text-4xl" />
                </div>
                {/* All comments */}
                <div className="p-2">
                   {
                     comments.map((comment) => (
                       <p>
                         <b>{comment.username}</b> {comment.text}
                       </p>
                     ))
                   }
                </div>
                {/* Comment Box */}
                <div className="border-t-2 border-gray-300 w-full flex h-12">
                    <input type="text" placeholder="Add Comment" className="flex-1 p-2 focus:outline-none" value={comment} onChange={e => setComment(e.target.value)} />
                    <button className="flex-none py-2 px-6  bg-blue-900 text-white font-extrabold"  disabled={!comment} onClick={postComment}>Post</button>
                </div>
            </div>
        </>
    )
}