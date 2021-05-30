import thunk from "redux-thunk"
import { applyMiddleware, combineReducers, compose, createStore} from "redux"
import { authReducer } from "./Auth/reducer";

const rootReducer = combineReducers({
    auth: authReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)

export const store = createStore(
    rootReducer,
    enhancer
)