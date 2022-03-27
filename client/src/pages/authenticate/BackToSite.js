import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./backtosite.css"
export default function BackToSite() {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/")
    }
  return (
    <div className='back'>
        <button className='back-to-site' onClick={handleHome}>Back on site</button>
    </div>
  )
}
