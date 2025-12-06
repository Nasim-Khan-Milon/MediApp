import React, { useState } from "react";

const DoctorAvailability = () => {

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className="container mx-auto my-8 px-4">

            {/* Add Availability */}
            <div className="bg-white shadow rounded-lg mb-6">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-blue-600 mb-4">
                        Add New Availability Slot
                    </h2>

                    <form onSubmit={onSubmitHandler} className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* Date */}
                        <div>
                            <p className="block mb-1 font-medium">Date</p>
                            <input
                                onChange={(e) => setDate(e.targer.value)}
                                value={date}
                                type="date"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <p className="block mb-1 font-medium">Time</p>
                            <input
                                onChange={(e) => setTime(e.target.value)}
                                value={time}
                                type="time"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>

                        {/* Button */}
                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                Add Slot
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Existing Availability */}
            <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-blue-600 mb-4">
                        Your Available Slots
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 text-sm">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Date</th>
                                    <th className="border px-4 py-2 text-left">Time</th>
                                    <th className="border px-4 py-2 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">2025-07-27</td>
                                    <td className="border px-4 py-2">10:00 AM</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-blue-600 hover:underline mr-3">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">2025-07-28</td>
                                    <td className="border px-4 py-2">02:00 PM</td>
                                    <td className="border px-4 py-2">
                                        <button className="text-blue-600 hover:underline mr-3">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                                {/* More rows dynamically */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DoctorAvailability;
