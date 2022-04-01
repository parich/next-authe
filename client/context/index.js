import { useReducer, createContext } from "react";

//initial state
const intialState = {
    user: null
};

//createContext
const Context = createContext();

//root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state;
    }
}


//context provider
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(
        rootReducer,
        intialState
    );
}
