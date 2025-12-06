import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_frontend/assets'

const MyAppointments = () => {

  const { appointments, token } = useContext(UserContext)
  const { formatSlotDate, formatSlotTime } = useContext(AppContext)


  return token && (
    <div className="bg-white shadow rounded-lg min-w-[80-vw] p-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-4 m-auto">
          Your Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-4 py-2 text-left">#</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Time</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{formatSlotDate(item.slot_date)}</td>
                    <td className="border px-4 py-2">{formatSlotTime(item.slot_time)}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">
                      {item.status === "Scheduled" && (
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => onCancel(item.id)}
                        >
                          Cancel
                        </button>
                      )}
                      {item.status !== "Scheduled" && (
                        <span className="text-gray-400">-</span>
                      )}
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

export default MyAppointments
