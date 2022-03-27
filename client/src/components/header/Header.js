import React from 'react'
import "./header.css"
export default function Header() {
  return (
    <div className='header'>
       
        <div className="header-desc">
        <h1 className='title-header'>Choose your food and get fast delivery from home !</h1>
        <p>A lots of choice and tasty food</p>
        <a href="#menu"><button>Get started</button></a>
        </div>
        <img src={process.env.PUBLIC_URL + '/images/pngkey.png'} alt="" />
    </div>
  )
}
