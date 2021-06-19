import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../firebase';
import Tooltip from "@material-ui/core/Tooltip"
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../Redux/Auth/action';
import { Redirect } from 'react-router';

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
      width: theme.spacing(7),
      height: theme.spacing(7),
      cursor: "pointer"
    },
  }));  

export const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const [currentUser, setCurrentUser] = React.useState("")
    const [openSetting, setOpenSetting] = React.useState(false)
    const isAuth = useSelector((state) => state.auth.isAuth)

    React.useEffect(() => {
      auth.onAuthStateChanged((user) => {
          setCurrentUser(user)
      })
    })

    if(!isAuth) {
      return <Redirect to="/starting" />
    }

    const settings = () => {
      setOpenSetting(!openSetting)
    }

    const logout = () => {
      dispatch(logOut())
    }

    return (
        <>
            <div className="w-full h-16 flex sm:justify-center border-b-2 border-gray-300">
              <div className="w-full sm:w-2/4 h-16 flex items-center">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVKYACsp_iK3zk3TdqJ-bwTpSP3_3vlVotARHETB16ZLg_n37rhkRkD01JYxF0vf8PJc&usqp=CAU" alt="instagram logo" className="w-28 mt-1" />
                  {/* <input type="text" placeholder="Search" /> */}
                  <input type="text" placeholder="Search" className="border-2 border-gray-300 focus:outline-none ml-44 p-1 h-7 hidden sm:inline-block" />
                  <div className="flex w-full ml-2 mr-2 sm:ml-40 sm:w-56 justify-between">
                      {/* Home */}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {/* Chat */}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {/* Find People */}
                      <svg aria-label="Find People" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22">
                      <path clip-rule="evenodd" d="M24 0C10.8 0 0 10.8 0 24s10.8 24 24 24 24-10.8 24-24S37.2 0 24 0zm0 45C12.4 45 3 35.6 3 24S12.4 3 24 3s21 9.4 21 21-9.4 21-21 21zm10.2-33.2l-14.8 7c-.3.1-.6.4-.7.7l-7 14.8c-.3.6-.2 1.3.3 1.7.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l14.8-7c.3-.1.6-.4.7-.7l7-14.8c.3-.6.2-1.3-.3-1.7-.4-.5-1.1-.6-1.7-.3zm-7.4 15l-5.5-5.5 10.5-5-5 10.5z" fill-rule="evenodd"></path>
                      </svg>
                      {/* Notification */}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {/* Profile Pic */}
                      <Tooltip title="Settings" className="cursor-pointer">
                          <Avatar alt="Chirag Agarwal" src={currentUser.photoURL} className={classes.small} onClick={settings} />
                      </Tooltip>
                  </div>
              </div>
            </div>
            {
              openSetting && 
              <div className="w-56 h-44 border-2 border-gray-300 absolute right-0 sm:left-1/5 bg-white z-50 text-center">
                <Tooltip title="Profile">
                  <p className="text-2xl p-3 border-b-2 border-gray-300 cursor-pointer">Profile</p>
                </Tooltip>
                <Tooltip title="Settings">
                  <p className="text-2xl p-3 border-b-2 border-gray-300 cursor-pointer">Settings</p>
                </Tooltip>
                <Tooltip title="Logout">
                  <p className="text-2xl p-3 border-b-2 border-gray-300 cursor-pointer" onClick={logout}>LogOut</p>
                </Tooltip>
              </div>
            }
        </>
    )
}
