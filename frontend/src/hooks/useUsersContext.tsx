import { UsersContext } from "../context/UsersContext";
import { ContextType, useContext } from "react";

export const useUsersContext = () =>{
    const context: any = useContext(UsersContext)

    if (!context){
        throw Error('useUsersContext outside context provider')
    }

    return context
}