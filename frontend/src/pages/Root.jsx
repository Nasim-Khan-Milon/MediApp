import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Root = () => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/user/home')
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default Root
