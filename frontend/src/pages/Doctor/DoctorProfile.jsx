import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'

const DoctorProfile = () => {
  return (
    <div className="container mx-auto py-5">
      <div className=" mx-auto">
        <div className="p-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={assets.doc1}
              alt="Dr. Md. Sirajur Rahman Sarwar"
              className="rounded-full w-32 h-32 mb-3 object-cover"
            />
            <h2 className="text-blue-800 font-bold text-center text-xl">
              Dr. Md. Sirajur Rahman Sarwar
            </h2>
            <p className="text-gray-500 text-center text-sm mb-0">
              MBBS (DMC), BCS (Health), MD (Cardiology), FCPS (Final)
            </p>
          </div>

          {/* Profile Info */}
          <div className="mb-4 space-y-3">
            <div>
              <h5 className="font-semibold mb-1">Training</h5>
              <p className="text-gray-500 text-sm mb-0">
                Trained on Cardiology in Malaysia, Singapore, Thailand & India
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">Specialist</h5>
              <p className="text-red-600 font-bold text-sm mb-0">
                Cardiology & Medicine Specialist
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">Designation</h5>
              <p className="text-sm mb-0">Assistant Professor, Cardiology</p>
            </div>
            <div>
              <h5 className="font-semibold mb-1">Institute</h5>
              <p className="text-gray-500 text-sm mb-0">
                Sylhet MAG Osmani Medical College & Hospital
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="text-center">
            <a
              href="/edit-doctor-profile"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
