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
    const [dashboard, setDashboard] = useState({
        totalPatients: 0,
        totalAppointments: 0,
        todaysAppointments: 0
    });


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

            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error("Error fetching doctor appointments:", error);
            return { success: false, message: error.message };
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/cancel-appointment",
                { appointmentId },
                { headers: { dToken } }
            )

            if (data.success) {
                toast.success(data.message)
                getDoctorAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/complete-appointment",
                { appointmentId },
                { headers: { dToken } }
            )

            if (data.success) {
                toast.success(data.message)
                getDoctorAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getDoctorDashboard = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', {
                headers: { dToken }
            })

            if (data.success) {
                setDashboard(data.dashboard)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getDoctorData()
        //console.log(doctor)
    }, [])

    useEffect(() => {
        if (dToken) {
            getDoctorDashboard()
        }
    })


    const value = {
        backendUrl,
        dToken, setDToken,
        loginDoctor,
        doctor, setDoctor,
        appointments, setAppointments,
        getDoctorAppointments,
        cancelAppointment,
        completeAppointment,
        dashboard
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider