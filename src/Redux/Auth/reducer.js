import { loadData, saveData } from "../../utils/localStorage"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Auth/actionType"

const token = loadData("token")

const initState = {
    isAuth: token ? true: false,
    email: "",
    loginLoading: false,
    loginError: false,
    loginSuccessMessage: "",
    loginErrorMessage: "",
    loginSuccess: false,
    loginFailure: false,
    registerLoading: false,
    registerError: false,
    registerSuccessMessage: "",
    registerErrorMessage: "",
    registerSuccess: false,
    registerFailure: false
}

export const authReducer = (state = initState, {type, payload}) => {
    switch(type){
        case REGISTER_REQUEST:
            return {
                ...state,
                registerLoading: true,
                registerError: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccessMessage: "Register Successful",
                registerLoading: false,
                registerError: false,
                registerSuccess: true,
                registerFailure: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                registerLoading: false,
                registerError: true,
                registerErrorMessage: payload,
                registerSuccess: false,
                registerFailure: true
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginError: false
            }
        case LOGIN_SUCCESS:
            saveData("token", payload.uid)
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                isError: false,
                loginSuccessMessage: "Login Successfull",
                loginSuccess: true,
                loginFailure: false,
                email: payload.email
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                loginErrorMessage: payload,
                loginSuccess: false,
                loginFailure: true
            }
        default:
            return state
    }
}