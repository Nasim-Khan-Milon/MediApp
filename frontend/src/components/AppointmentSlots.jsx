import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { UserContext } from '../context/UserContext'
import { doctors } from '../assets/assets_frontend/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AppointmentSlots = () => {

    const { token, backendUrl } = useContext(UserContext)
    const navigate = useNavigate()

    const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const getAvailableSlots = async () => {
        let today = new Date();
        let slots = []; // temporary array for all 7 days

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date(today);
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            slots.push(timeSlots); // push the whole day's slots once
        }

        setDocSlots(slots); // update state only once after loop
    };

    const bookAppointment = async () => {

        if (!token) {
            toast.warn("Please Login to book appointment")
            return navigate('/login')
        }

        try {

            // take the selected day
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = `${year}-${month}-${day}`;
            // console.log("slotDate =", slotDate);

            const { data } = await axios.post(
                backendUrl + "/api/user/book-appointment",
                {slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                navigate("/user/my-appointments");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAvailableSlots();
    }, [])


    return (
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700" id='appointment'>
            <p>Booking Slots</p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                {docSlots.length &&
                    docSlots.map((item, index) => (
                        <div
                            onClick={() => setSlotIndex(index)}
                            key={index}
                            className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                                ? "bg-primary text-white"
                                : "border border-gray-200"
                                } `}
                        >
                            <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full overflow-x-auto  whitespace-nowrap mt-4">
                {docSlots[slotIndex]?.map((item, index) => (
                    <p
                        onClick={() => setSlotTime(item.time)}
                        key={index}
                        className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                            ? "bg-primary text-white"
                            : "text-gray-400 border border-gray-300"
                            }`}
                    >
                        {item.time.toLowerCase()}
                    </p>
                ))}
            </div>

            <button
                onClick={bookAppointment}
                className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
            >
                Book an appointment
            </button>
        </div>
    )
}

export default AppointmentSlots
