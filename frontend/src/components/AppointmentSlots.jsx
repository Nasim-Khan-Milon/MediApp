import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentSlots = () => {
    const { token, backendUrl } = useContext(UserContext);
    const { doctor } = useContext(DoctorContext);
    const navigate = useNavigate();

    const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    // Generate available slots
    const getAvailableSlots = () => {
        if (!doctor) return;

        const booked = doctor.slots_booked || {};
        let today = new Date();
        let slots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date(today);
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0);

            // Set start time
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                const formattedTime =
                    currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

                const slotDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
                const slotTime = formattedTime;

                // const isSlotAvailable = booked[slotDate]?.includes(formattedTime) ? false : true;
                const isSlotAvailable = doctor.slots_booked[slotDate] && doctor.slots_booked[slotDate].includes(slotTime) ? false : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            slots.push(timeSlots);
        }

        setDocSlots(slots);
    };

    // Book appointment API
    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Please Login to book appointment');
            return navigate('/login');
        }

        if (!docSlots[slotIndex]?.length || !slotTime) {
            toast.error('Please select a valid slot');
            return;
        }

        try {
            const date = docSlots[slotIndex][0].datetime;
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const slotDate = `${year}-${month}-${day}`;

            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getAvailableSlots(); // refresh slots after booking
                setSlotTime('');
                navigate('/user/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        if (doctor) getAvailableSlots();
    }, [doctor]);

    return (
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700" id="appointment">
            <p className="text-lg font-semibold mb-2">Booking Slots</p>

            {/* Day selector */}
            <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
                {docSlots.map((daySlots, index) => (
                    <div
                        onClick={() => setSlotIndex(index)}
                        key={index}
                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                            }`}
                    >
                        <p>{daySlots[0] && daysofWeek[daySlots[0].datetime.getDay()]}</p>
                        <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
                    </div>
                ))}
            </div>

            {/* Time slots */}
            <div className="flex flex-wrap gap-3 items-center w-full overflow-x-auto whitespace-nowrap mt-4">
                {docSlots[slotIndex]?.map((item, index) => (
                    <p
                        onClick={() => setSlotTime(item.time)}
                        key={index}
                        className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
                            }`}
                    >
                        {item.time}
                    </p>
                ))}
            </div>

            {/* Book button */}
            <button
                onClick={bookAppointment}
                className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
            >
                Book an appointment
            </button>
        </div>
    );
};

export default AppointmentSlots;
