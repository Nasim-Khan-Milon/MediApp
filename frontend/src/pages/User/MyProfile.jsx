import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets_frontend/assets';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData, changeUserPassword } = useContext(UserContext);

  const [isEdit, setIsEdit] = useState(false);

  const [showModal, setShowModal] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [reOldPassword, setReOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

  useEffect(() => {
    if (token && !userData) {
      loadUserProfileData();
    }
  }, [token]);

  const updateUserProfileData = async () => {
    try {
      const { name, email, phone, gender, dob } = userData
      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        { name, email, phone, gender, dob },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (oldPassword !== reOldPassword) {
        return toast.error("Old passwords do not match")
      }
  
      const success = await changeUserPassword(oldPassword, newPassword)
  
      if (success) {
        setShowModal(false)   /
        setOldPassword("")
        setReOldPassword("")
        setNewPassword("")
      }
    }

  return userData && (
    <div className="max-w-lg flex flex-col gap-4 text-sm pt-5">
      <img className='w-36 rounded' src={assets.upload_area} alt="" />
      {/* Name */}
      <div>
        <p className="font-medium text-3xl text-[#262626]">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border px-2 py-1 text-2xl rounded"
            />
          ) : (
            userData.name
          )}
        </p>
      </div>

      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      {/* Contact Info */}
      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email:</p>
          {isEdit ? (
            <input
              type="email"
              value={userData.email || ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border px-2 py-1 rounded"
            />
          ) : (
            <p className="text-blue-500">{userData.email || 'Not Provided'}</p>
          )}

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone || ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border px-2 py-1 rounded"
            />
          ) : (
            <p className="text-blue-500">{userData.phone || 'Not Provided'}</p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className="text-gray-600 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="border px-2 py-1 rounded"
            >
              <option value="Not Provided">Not Provided</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob ? userData.dob.split('T')[0] : ''}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="border px-2 py-1 rounded"
            />
          ) : (
            <p className="text-gray-500">
              {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not Provided'}
            </p>
          )}
        </div>
      </div>

      {/* Edit / Save Buttons */}
      <div className="mt-5 flex gap-14 justify-between items-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        ) : (
          <>
            <button
            onClick={() => setIsEdit(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Change Password
          </button>
          </>
        )}
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
  );
};

export default MyProfile;
