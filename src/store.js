import {createStore} from "redux";
import reducer from "./reducers/main";

export const store = createStore(reducer);
