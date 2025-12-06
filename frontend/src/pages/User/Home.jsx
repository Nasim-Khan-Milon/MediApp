import React, { useContext, useEffect, useState } from 'react'
import { assets, doctors } from '../../assets/assets_frontend/assets'
import { DoctorContext } from '../../context/DoctorContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import DoctorDetails from '../../components/DoctorDetails';
import AppointmentSlots from '../../components/AppointmentSlots';
import Banner from '../../components/Banner';

const Home = () => {


  return (
    <div className='p-10'>
      <Header />
      <DoctorDetails />
      <AppointmentSlots />
      <Banner />
    </div>
  )
}

export default Home
