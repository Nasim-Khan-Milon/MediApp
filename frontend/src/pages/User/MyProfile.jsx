import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { assets } from '../../assets/assets_frontend/assets'
import { useEffect } from 'react'

const MyProfile = () => {

  const {token, userData} = useContext(UserContext)



  return token && (
    <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
      <img className='w-36 rounded' src={assets.upload_area} alt="" />
      
        <div>
          <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
          <hr className='bg-[#ADADAD] h-[1px] border-none' />

          <div>
            <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[2fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
              <p className='font-medium'>Email id: </p>
              <p className='text-blue-500'>{userData.email || "Not Provided"}</p>

              <p className='font-medium'>Phone:</p>
              <p className='text-blue-500'>{userData.phone || "Not Provided"}</p>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default MyProfile
