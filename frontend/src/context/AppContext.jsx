/* eslint-disable react-refresh/only-export-components */

import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formatSlotDate = (slotDate) => {
        const dateObj = new Date(slotDate); 

        const day = dateObj.getDate();
        const month = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        return `${day} ${month} ${year}`;
    };

    const formatSlotTime = (slotTime) => {
        const [h, m] = slotTime.split(":");
        let hour = Number(h);
        const ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12; // convert 0 → 12
        return `${hour}:${m} ${ampm}`;
    };




    const value = {
        backendUrl,
        formatSlotDate,
        formatSlotTime
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider