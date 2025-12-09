import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const { changeDoctorPassword } = useContext(DoctorContext)

  const [showModal, setShowModal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [reOldPassword, setReOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (oldPassword !== reOldPassword) {
      return toast.error("Old passwords do not match")
    }

    const success = await changeDoctorPassword(oldPassword, newPassword)

    if (success) {
      setShowModal(false)   // Close modal
      setOldPassword("")
      setReOldPassword("")
      setNewPassword("")
    }
  }

  return (
    <div className="container mx-auto py-5">
      <div className=" mx-auto">
        <div className="p-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={assets.doc1}
              alt="Doctor"
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

          {/* Change Password Button */}
          <div className="text-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </div>


          {/* ---------------------- MODAL START ---------------------- */}
          {showModal && (
            <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">

                <h3 className="text-lg font-semibold mb-4 text-center">
                  Change Password
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">

                  <input
                    type="password"
                    placeholder="Old Password"
                    className="border p-2 w-full rounded"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Re-enter Old Password"
                    className="border p-2 w-full rounded"
                    value={reOldPassword}
                    onChange={e => setReOldPassword(e.target.value)}
                    required
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    className="border p-2 w-full rounded"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Submit
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}
          {/* ---------------------- MODAL END ---------------------- */}

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
