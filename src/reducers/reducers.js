const initialState = {
    user: null, 
    landing: true
};

export function userReducer(state, action){
    if (typeof state === "undefined"){
        return initialState;
    }
    switch(action.type){
        case SIGN_IN: 
            return {...state, user: action.userName};
        case SIGN_OUT: 
            return {...state, user: null};
        default: 
            return state;
    }
}

export function uiReducer(state, action){
    if (typeof state === "undefined"){
        return initialState;
    }
    switch(action.type){
        case LANDING: 
            return {...state, landing: true};
        case NOT_LANDING: 
            return {...state, landing: false};
        default: 
            return state;
    }
}

