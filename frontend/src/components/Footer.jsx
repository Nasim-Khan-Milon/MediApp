import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-0 text-sm'>

                {/* -------Left Section--------- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error mollitia ipsam eos fugiat, laboriosam deserunt, aperiam quas id nobis, laudantium excepturi. Illum itaque perferendis nihil dolorum consectetur velit asperiores laudantium.
                    </p>
                </div>

                {/* --------Center Section--------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* ---------Right Section-------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+0-000-000-000</li>
                        <li>greatstackdev@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* ----------Copyright Text----------- */}
            <div>
                <hr className='border-gray-300' />
                <p className='py-5 text-sm text-center'>Copyright 2024 @ MediApp.dev - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer