import { createContext, ReactNode, useReducer } from "react";
import { User } from "../types/User.type";

export const UsersContext = createContext({});

export const usersReducer = (state: {users:[]}, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'ADD_USER':
            return {
                users: [action.payload, ...state.users]
            }
        case 'PATCH_USER':
            return {
                users: action.payload
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(usersReducer, {
        users: []
    })


    return (
        <UsersContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UsersContext.Provider>
    )
}