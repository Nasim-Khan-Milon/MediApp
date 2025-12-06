import React, { useContext } from 'react'
import { NavLink } from "react-router-dom"
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets_admin/assets'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)



  return (
    <div className="min-h-screen bg-white border-r">
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to={"/doctor/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            to={"/doctor/appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            to={"/doctor/availability"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Availability</p>
          </NavLink>

          <NavLink
            to={"/doctor/profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
