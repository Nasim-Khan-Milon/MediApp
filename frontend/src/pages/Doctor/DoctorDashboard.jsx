import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorDashboard = () => {

  const {dToken, dashboard } = useContext(DoctorContext)


  return dToken && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold">{dashboard.totalPatients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold">{dashboard.totalAppointments}</p>
            <p className="text-gray-500">Total Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="" />
          <div>
            <p className="text-xl font-semibold">{dashboard.todaysScheduled}</p>
            <p className="text-gray-500">Today's Appointments</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
