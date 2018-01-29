import { combineReducers } from "redux"
import brand from "./brandReducer"
import store from "./storeReducer"
import user from "./userReducer"

export default combineReducers({
    brand,
    store,
    user
})
