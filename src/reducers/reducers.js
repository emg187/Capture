const initialUserState = {
    auth: false, 
    userName: ""
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
            return {...state, current: "landing"};
        case "MATCHMAKING": 
            return {...state, current: "matchmaking"};
        case "GAMES": 
            return {...state, current: "games"};
        case "FRIENDS": 
            return {...state, currrent: "friends"};
        case "HOWTOPLAY": 
            return {...state, current: "howtoplay"};
        default: 
            return state;
    }
}

