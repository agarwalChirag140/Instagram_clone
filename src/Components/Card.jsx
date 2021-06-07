import Avatar from "@material-ui/core/Avatar"
import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import { AiOutlineHeart, AiOutlineComment } from 'react-icons/ai'


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

export const Card = ({caption, postImage, profileName, profileUrl}) => {
    const classes = useStyles()

    return (
        <>
            <div className="w-full sm:w-3/4 border-2 border-gray-300 mt-4 mb-4">
                
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
                    <AiOutlineHeart className="text-3xl cursor-pointer" />
                    <AiOutlineComment className="text-3xl ml-2 cursor-pointer" />
                </div>
                
                {/* Comment Box */}
                <div className="border-t-2 border-gray-300">
                    <input type="text" placeholder="Add Comment" className="p-2 w-10/12 sm:w-11/12 border-2 border-gray-300 focus:outline-none" />
                    <button className="p-2 w-14 text-blue-500  border-2 border-gray-300">Post</button>
                </div>
            </div>
        </>
    )
}