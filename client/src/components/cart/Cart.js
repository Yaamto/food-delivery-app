import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import "./cart.css"
export default function Cart({cart, removeFromCart, totalPrice, createOrder, order}) {


    const [cartShow, setCartShow] = useState(false)
    const [cartState, setCartState] = useState()
    const cartEnd = useRef()
    
  // const 
    

  const scrollToBottom = () => {
    cartEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleHideShowCart = (e) => {
    e.preventDefault()
    cartState.classList.toggle("hidden-cart")
    if(cartState.classList.contains("hidden-cart")){
      setCartShow(true)
    }else{
      setCartShow(false)
    }
  }
  useEffect(() => {
    setCartState(document.querySelector(".cart"))
    
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [cart]);

  return (
      
    <div className="all-cart">
      <span className='hide-show-cart' onClick={(e) => handleHideShowCart(e)}> <img src={cartShow ? (process.env.PUBLIC_URL + "/images/chevron-en-haut.png") : (process.env.PUBLIC_URL + "/images/chevron-en-bas.png")} alt="" height={22}/> </span>
      <h2 className='cart-title'>Cart {cart.length != 0 ? (<span> : <span className='cart-digits'>{cart.length}</span></span>) : ("")} </h2>
    <div className="cart" >
        
        
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
    </div>
  )
}
