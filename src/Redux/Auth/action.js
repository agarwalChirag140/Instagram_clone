import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Auth/actionType"
import { auth} from "../../firebase"

export const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
}

export const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload
    }
}

export const registerFailure = (payload) => {
    return {
        type: REGISTER_FAILURE,
        payload
    }
}

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const loginFailure = (payload) => {
    return {
        type: LOGIN_FAILURE,
        payload
    }
}

export const registerUser = (payload) => (dispatch) => {

    dispatch(registerRequest())
    console.log(payload)

    auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then((authUser) => {
        // console.log(authUser)
        auth.onAuthStateChanged((authUser) => {
            authUser.updateProfile({
                displayName: payload.name,
                photoURL: payload.imageUrl,
            })
        })
        console.log(authUser)
        dispatch(registerSuccess())
    })
    .catch((err) => {
        console.log(err.message)
        dispatch(registerFailure(err.message))
    })
}

export const loginUser = (payload) => (dispatch) => {
    dispatch(loginRequest())

    auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then((user) => {
        console.log(user)
        dispatch(loginSuccess(user.user))
    })
    .catch((err) => {
        dispatch(loginFailure(err.message))
    })

}