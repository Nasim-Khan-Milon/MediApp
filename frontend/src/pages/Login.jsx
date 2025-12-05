import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'

const Login = () => {

    const [role, setRole] = useState('User')
    const [state, setState] = useState('Login') //Sign Up
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { token, setToken, loginUser, registerUser } = useContext(UserContext)
    const { dToken, setDToken, loginDoctor } = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            if(state === 'Sign Up' && role === 'User') {
                registerUser(name, phone, password)
            } else if(state === 'Login' && role === 'User') {
                loginUser(phone, password)
            } else if(state === 'Login' && role === 'Doctor') {
                loginDoctor(email, password)
            } else {
                toast.error("Something went wrong!")
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto mt-20 items-start p-8 min-w-[340px] sm:min-w-96 border  border-gray-300 rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{role}</span> {state}
                </p>
                {
                    state === 'Sign Up' && role === 'User' && <div className='w-full'>
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                    </div>
                }
                {
                    role === 'User'
                        ? <div className='w-full'>
                            <p>Phone</p>
                            <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                        </div>
                        : <div className='w-full'>
                            <p>Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                        </div>
                }

                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required className='border border-[#DADADA] rounded w-full p-2 mt-1' />
                </div>
                {
                    state === 'Login' ? (
                        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                    ) : (
                        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Sign Up</button>
                    )
                }
                

                {
                    state === 'Login' ? (
                        role === 'Doctor' ? (
                            <p>Patient Login <span onClick={() => {setRole('User'); setState('Login');}} className='text-primary underline cursor-pointer'>Click Here</span></p>
                        ) : (
                            <>
                                <p>
                                    Doctor Login <span onClick={() => {setRole('Doctor'); setState('Login');}} className='text-primary underline cursor-pointer'>Click Here</span>
                                </p>
                                <p>
                                    Create an new account? <span onClick={() => {setState('Sign Up'); setRole('User');}} className='text-primary underline cursor-pointer'>Click Here</span>
                                </p>
                            </>

                        )
                    ) : (
                        <p>
                            Already have an account? <span onClick={() => {setState('Login'); setRole('User');}} className='text-primary underline cursor-pointer'>Login Here</span>
                        </p>
                    )
                }
            </div>
        </form>
    )
}

export default Login
