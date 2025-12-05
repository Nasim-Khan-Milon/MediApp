/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")

    const loginDoctor = async (email, password) => {

        try {

            const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})

            if(data.success) {
                console.log(data.dToken)
                localStorage.setItem('dToken', data.dToken)
                setDToken(data.dToken)
                toast.success("Login successful!")
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const value = {
        backendUrl,
        dToken, setDToken,
        loginDoctor
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider