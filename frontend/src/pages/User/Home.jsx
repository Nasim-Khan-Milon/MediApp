import React, { useContext, useEffect, useState } from 'react'
import { assets, doctors } from '../../assets/assets_frontend/assets'
import { DoctorContext } from '../../context/DoctorContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { dToken } = useContext(DoctorContext)
  const { token } = useContext(UserContext)

  const navigate = useNavigate()

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    let today = new Date();
    let slots = []; // <-- temporary array

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
            docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots); // <-- push once per day
    }

    setDocSlots(slots); // <-- update state once only
  };

  useEffect(() => {
    getAvailableSlots()
  }, [])



  return (
    <div className='p-10'>
      {/* Header */}
      <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* ----------Left Side----------- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white front-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br />With Trusted Doctor
          </p>
          <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive list of trusted doctor,<br className='hidden sm:block' />
              schedule your appointment hassle-free.</p>
          </div>
          <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'
            href="#appointment">
            Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
          </a>
        </div>

        {/* --------Right Side------------ */}
        <div className='md:w-1/2 relative'>
          <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
      </div>


      {/* ----------Doctor Details---------- */}
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


      {/* ----------Booking Slots----------- */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700" id='appointment'>
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index
                  ? "bg-primary text-white"
                  : "border border-gray-200"
                  } `}
              >
                <p>{item[0] && daysofWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-auto flex-nowrap whitespace-nowrap mt-4">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime
                ? "bg-primary text-white"
                : "text-gray-400 border border-gray-300"
                }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button

          className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>


      {/* Banner */}
      <div className='flex bg-primary rounded-lg  px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        {/* ----------Left Side----------- */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointment</p>
            <p className='mt-4'>With The Trusted Doctor</p>
          </div>
          {
            !token && <button onClick={() => { navigate('/login') }} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>
              Create Account
            </button>
          }
        </div>
        {/* ----------Right Side---------- */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
          <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
      </div>

    </div>
  )
}

export default Home
