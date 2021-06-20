import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { auth } from "../firebase";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: "center"
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      margin: "auto",
      marginTop: theme.spacing(1)
    },
  }));  

export const Profile = () => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState("")

    React.useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    },[])


    return (
        <div className="w-full h-64 ml-2 border-2 border-gray-300 mt-4 sm:inline-block hidden">
            <Avatar alt={currentUser.displayName} src={currentUser.photoURL} className={classes.large} />
            <p className="text-center font-bold text-2xl">Welcome {currentUser.displayName}</p>
            <p className="text-center font-bold">{currentUser.email}</p>
        </div>
    )
}