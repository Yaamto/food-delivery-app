import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import "./cart.css"
export default function Cart({cart, removeFromCart, totalPrice, createOrder, order}) {


    
    const cartEnd = useRef()
    
  
    console.log(order)
    

  const scrollToBottom = () => {
    cartEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [cart]);

  return (
      
    <div className="cart" >
        
        <h1>Cart</h1>
        {cart.length === 0 ? "": ( cart.map((item, i) => {
            return <div className='cart-item' ref={cartEnd} key={i}>
                <img src={process.env.PUBLIC_URL + `/images/${item.name}.png`} alt="" width="50" height="50" />
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button className='remove' onClick={() => removeFromCart(item._id)}>X</button>
                
            </div>
        }))}
       
        <span className='total-price'>Total Price : ${totalPrice}</span>
        {totalPrice === 0 ? (<span>Add Something to cart !</span>) : <button className='order' onClick={() => createOrder()}>Order now </button>}
    </div>
  )
}
