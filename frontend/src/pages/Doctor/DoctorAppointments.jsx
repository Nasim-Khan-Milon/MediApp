import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointments = () => {

  const { appointments, getDoctorAppointments, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { formatSlotDate, formatSlotTime } = useContext(AppContext)

  // Function to calculate age from dob
  const calculateAge = (dob) => {
    if (!dob) return '-'
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  useEffect(() => {
    getDoctorAppointments()
    console.log(appointments)
  }, [dToken])

  return dToken && (
    <div className="bg-white shadow rounded-lg min-w-[80-vw] mt-10">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-4 m-auto">
          Your Appointments
        </h2>

        <div className="overflow-x-auto border border-gray-300">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border-r border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border-r border-gray-300 px-4 py-2 text-left">Patient Name</th>
                <th className="border-r border-gray-300 px-4 py-2 text-left">Patient Age</th>
                <th className="border-r border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border-r border-gray-300 px-4 py-2 text-left">Time</th>
                <th className="border-r border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="flex justify-center items-center px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border-t border-r border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border-t border-r border-gray-300 px-4 py-2">{item.patient_name}</td>
                    <td className="border-t border-r border-gray-300 px-4 py-2">{calculateAge(item.patient_dob)}</td>
                    <td className="border-t border-r border-gray-300 px-4 py-2">{formatSlotDate(item.slot_date)}</td>
                    <td className="border-t border-r border-gray-300 px-4 py-2">{formatSlotTime(item.slot_time)}</td>
                    <td className="border-t border-r border-gray-300 px-4 py-2">{item.status}</td>
                    <td className="border-t px-4 py-2 border-gray-300 flex gap-5 ">
                      {
                        item.status === "Scheduled" ? (
                          <div className='flex flex-wrap justify-between gap-5'>
                            <button
                              className="text-white  bg-red-500 px-4 py-1.5 rounded-full"
                              onClick={() => cancelAppointment(item.id)}
                            >
                              Cancel
                            </button>

                            <button
                              className="text-white  bg-primary px-4 py-1.5 rounded-full"
                              onClick={() => completeAppointment(item.id)}
                            >
                              Complete
                            </button>
                          </div>
                        ) : (
                          ""
                        )
                      }
                      
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
