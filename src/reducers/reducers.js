const initialUserState = {
    auth: false, 
    username: ""
};
const initialUiState = {
    current: "landing"
};

export function userReducer(state, action){
    if (typeof state === "undefined"){
        return initialUserState;
    }
    switch(action.type){
        case "SIGN_IN": 
            return {...state, auth: true, userName: action.username};
        case "SIGN_OUT": 
            return {...state, auth: false, username: ""};
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
            return {...state, current: "landing"};
        case "MATCHMAKING": 
            return {...state, current: "matchmaking"};
        case "GAMES": 
            return {...state, current: "games"};
        case "FRIENDS": 
            return {...state, currrent: "friends"};
        case "HOWTOPLAY": 
            return {...state, current: "howtoplay"};
        case "ACCOUNT": 
            return {...state, current: "account"};
        default: 
            return state;
    }
}

