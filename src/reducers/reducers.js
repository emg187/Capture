const initialUserState = {
    auth: false, 
    userName: ""
};
const initialUiState = {
    landing: true
};

export function userReducer(state, action){
    if (typeof state === "undefined"){
        return initialUserState;
    }
    switch(action.type){
        case "SIGN_IN": 
            return {...state, auth: true, userName: action.userName};
        case "SIGN_OUT": 
            return {...state, auth: false, userName: ""};
        default: 
            return state;
    }
}

export function uiReducer(state, action){
    if (typeof state === "undefined"){
        return initialUiState;
    }
    switch(action.type){
        case "LANDING": 
            return {...state, landing: true};
        case "NOT_LANDING": 
            return {...state, landing: false};
        default: 
            return state;
    }
}

