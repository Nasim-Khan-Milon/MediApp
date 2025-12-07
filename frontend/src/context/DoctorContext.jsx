/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [doctor, setDoctor] = useState(null)
    const [appointments, setAppointments] = useState([]);


    const loginDoctor = async (email, password) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })

            if (data.success) {
                //console.log(data.dToken)
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

    const getDoctorData = async (email, password) => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/doctor-data')

            if (data.success) {
                setDoctor(data.doctor)
                //console.log(data.doctor)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDoctorAppointments = async () => {
        try {

            const dToken = localStorage.getItem("dToken");

            const { data } = await axios.get(
                backendUrl + "/api/doctor/appointments",
                {
                    headers: {
                        dToken: dToken
                    }
                }
            )

            if(data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error("Error fetching doctor appointments:", error);
            return { success: false, message: error.message };
        }
    }

    useEffect(() => {
        getDoctorData()
        //console.log(doctor)
    }, [])


    const value = {
        backendUrl,
        dToken, setDToken,
        loginDoctor,
        doctor, setDoctor,
        appointments, setAppointments,
        getDoctorAppointments
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider