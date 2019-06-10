import {userReducer, uiReducer} from "./reducers";
import {combineReducers} from "redux";

export default combineReducers({
    user: userReducer, 
    landing: uiReducer
});

