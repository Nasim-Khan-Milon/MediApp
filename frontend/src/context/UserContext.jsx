/* eslint-disable react-refresh/only-export-components */

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useEffect } from "react";


export const UserContext = createContext()

const UserContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "")
    const [appointments, setAppointments] = useState([])
    const [userData, setUserData] = useState({})

    const loginUser = async (phone, password) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/login', { phone, password })

            if (data.success) {
                console.log(data.token)
                localStorage.setItem('token', data.token)
                setToken(data.token)
                toast.success("Login successful!")
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const registerUser = async (name, phone, password) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/register', { name, phone, password })

            if (data.success) {
                console.log(data.token)
                localStorage.setItem('token', data.token)
                setToken(data.token)
                toast.success("Sign up successful!")
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/my-appointments', { headers: { token } })

            if (data.success) {
                setAppointments(data.appointments.reverse())
                // console.log(data.appointments)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/cancel-appointment",
                { appointmentId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/my-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const changeUserPassword = async (oldPassword, newPassword) => {

        try {

            const {data} = await axios.post( backendUrl + '/api/user/change-password',
                { oldPassword, newPassword },
                { headers: { token } }
            )

            if(data.success) {
                toast.success(data.message)
                return true
            } else {
                toast.error(data.message)
                return false
            }

        } catch (error) {
            console.log(error)
            return { success: false, message: error.response?.data?.message || "Something went wrong" }
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])


    const value = {
        backendUrl,
        token, setToken,
        loginUser, registerUser,
        appointments, setAppointments,
        getUserAppointments,
        cancelAppointment,
        loadUserProfileData, 
        userData, setUserData,
        changeUserPassword
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider