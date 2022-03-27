import React from 'react'
import "./service.css"
export default function Service() {
  return (
      <>
      <div className="service-title" id="service">
          <p className='our-service'>Our service</p>
          <p className='subtitle-service'>Let's see about our delivery</p>
      </div>
      
      
    <div className='service'>
        <div className="single-service">
            <img src={process.env.PUBLIC_URL + "/images/burger1.png"} alt="" height="150" width="auto"/>
            <p className='title-single-service'>Choose your food</p>
            <p className='desc-single-service'>Easy to order what you want</p>
        </div>
        <div className="single-service">
            <img src={process.env.PUBLIC_URL + "/images/scooter.png"} alt="" height="150" width="auto"/>
            <p className='title-single-service'>Fast delivery</p>
            <p className='desc-single-service'>Get your food fastest</p>
        </div>
        <div className="single-service">
            <img src={process.env.PUBLIC_URL + "/images/good.png"} alt="" height="150" width="auto"/>
            <p className='title-single-service'>Recieve it</p>
            <p className='desc-single-service'>Eat and enjoy</p>
        </div>
    </div>
    </>
  )
}

