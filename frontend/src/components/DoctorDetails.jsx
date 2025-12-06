import React from 'react'
import { assets, doctors } from '../assets/assets_frontend/assets'

const DoctorDetails = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div>
                <img
                    className="bg-primary w-full sm:max-w-72 rounded-lg"
                    src={doctors.image}
                    alt=""
                />
            </div>

            <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                {/* ---------Doc Info: name, degree, exprience----------- */}
                <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                    {doctors.name}
                    <img className="w-5" src={assets.verified_icon} alt="" />
                </p>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <p>
                        {doctors.degree} - {doctors.speciality}
                    </p>
                    <button className="py-0.5 px-2 border text-xs rounded-full">
                        {doctors.experience}
                    </button>
                </div>

                {/* -------Doctor About---------- */}
                <div>
                    <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
                        "About" <img className="w-3" src={assets.info_icon} alt="" />
                    </p>
                    <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                        {doctors.about}
                    </p>
                </div>
                <p className="text-gray-600 font-medium mt-4">
                    Appointment fee:{" "}
                    <span className="text-gray-800">
                        {/* {currencySymbol} */}
                        {doctors.fees}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default DoctorDetails
