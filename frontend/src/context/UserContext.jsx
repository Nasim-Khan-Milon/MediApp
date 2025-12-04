import { createContext } from "react";


export const UserContext = createContext()

const UserContextProvider = (props) => {

    const backendUrl = import.meta.VITE_BACKEND_URL


    const value = {
        backendUrl
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider