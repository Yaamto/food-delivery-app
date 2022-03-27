import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Menu from '../components/menu/Menu'
import Navbar from '../components/navbar/Navbar'
import Service from '../components/Service/Service'
import UpPage from '../components/upPage/UpPage'
import axios from "axios"
import "./Home.css"
import Cart from '../components/cart/Cart'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/spinner/Spinner'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Home() {
   const [cart, setCart] = useState([])
   const [totalPrice, setTotalPrice] = useState(0)
   const [order, setOrder] = useState([])
   const [user, setUser] = useState([])
   const [loading, setLoading] = useState(false)
   const [myOrders, setMyOrders] = useState([])
   const [isAwaiting, setIsWaiting] = useState(false)
   const customer = "patrick"
   const address = "12 rue francis de précensé"

   console.log(isAwaiting)
const navigate = useNavigate()

  // Pour récupérer les userInfo et mettre en place le loader
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")))
    setTimeout(() => setLoading(true),500)
  }, [])

  // Récupérer toute ses commandes et les stocker
  useEffect(() => {
    const id = localStorage.getItem("userId")
     axios({
      method:"get",
      url:`${process.env.REACT_APP_API_URL}order/`+ id ,
      withCredentials: true, 
      headers: {
          'Access-Control-Allow-Credentials': true,
        }         
  })
  .then((res) => {              
      setMyOrders(res.data.data)       
  })
  .catch((err) => {
      console.log(err)
  })
  }, [])

  // Pour savoir si il y a une commande en cours
  useEffect(() => {
    myOrders.map((item) => {
      if(item.status ===3){
        console.log(item.status)
      } else {
        console.log(item.status)
        return setIsWaiting(true)
      }
    })
  }, [cart])
  
  //Supprimer un élément du panier
   const removeFromCart = (id) => {
    const index = cart.findIndex(obj => obj._id === id)
    let newCart = [...cart]
   const minusPrice = newCart[index].price
    newCart.splice(index, 1)
    setCart(newCart)
    setTotalPrice(totalPrice - minusPrice)
   }

    //Ajouter un élément dans le panier
   const addCart = async(id) => {
    if(!user){
      const notyf = new Notyf({duration: 4000,
        position: {
          x: 'center',
          y: 'top',
        },
        types: [
          {
            type: 'info',
            background: 'orange',
            icon: false
          }
        ]});
       notyf.open({type:"info", message: "Log in to add in cart"});
      return navigate("/login")
    }
     await axios({
      method:"get",
      url:`${process.env.REACT_APP_API_URL}food/`+ id ,
  })
  .then((res) => {
    let newCart = [...cart]
    newCart.push(res.data[0])
    setCart(newCart)
    setTotalPrice(totalPrice + res.data[0].price)
  })
  .catch((err) => {
      console.log(err)
  })
   }

   const createOrder = async() => {
       console.log(isAwaiting)
        if(isAwaiting === false){
          await axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}order/create`,
            withCredentials:true,
            data: {
              customer_id: user._id,
              customer: user.username,
              address: user.address,
              total: totalPrice,
              status: 0,
              orderItems: cart,
         },
         headers : {
           'Access-Control-Allow-Credentials' : true,
           
          }  
        })
        .then((res) => {
          setOrder(res.data.data)
          const notyf = new Notyf({
            duration: 4000,
          position: {
            x: 'center',
            y: 'top',
          }
          });
        notyf.success('Order completed');
          navigate("/orders")
          
          
          
        })
        
        .catch((err) => {
          console.log(err)
        })
      }else {
        const notyf = new Notyf({duration: 4000,
          position: {
            x: 'center',
            y: 'top',
          },
          types: [
            {
              type: 'info',
              background: 'orange',
              icon: false
            }
          ]});
          navigate("/orders")
        return notyf.open({type: 'info',
        message: 'You have already a current order'});
      }
 }

 if(loading === false){
   return <LoadingSpinner />
 }
  
  return (
    <div className='container'>
      <Navbar cart={cart} setCart={setCart} setTotalPrice={setTotalPrice}/>
      <Header />
      <Service />
      <Menu cart={cart} addCart={addCart}/>
      <UpPage />
      <Cart cart={cart} removeFromCart={removeFromCart} totalPrice={totalPrice} createOrder={createOrder} order={order}/>
      

    </div>
  )
}

