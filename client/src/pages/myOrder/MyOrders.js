import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import LoadingSpinner from '../../components/spinner/Spinner'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { StatusContext } from '../../components/context/StatusContext';

import "./myorder.css"
import Status from '../../components/status/Status';
export default function MyOrders() {
    const [myOrders, setMyOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const statusTab = ["Waiting confirmation...", "cooking...", "On the way...", "Delivered"]
    const [delivered, setDelivered] = useState(0)
    const {sock} = useContext(StatusContext)
    console.log(sock)
    //Permet de montrer/cacher les éléments de la commande (nourriture) lors du clique
    const showHideFood = (e, id) => {
        e.preventDefault()
        document.getElementById(id).classList.toggle("show-hide")
    }

    // pour status faire un composant a part avec des props
    // faire un useeffect dans ce composant pour mettre à jour le status
    // ou 
    
    useEffect(()=> {
        const id = localStorage.getItem("userId")
        const getOrder = async()=> {
            await axios({
                method:"get",
                url:`${process.env.REACT_APP_API_URL}order/`+ id ,
                withCredentials: true, 
                headers: {
                    'Access-Control-Allow-Credentials': true,
                  }         
            })
            .then((res) => {             
                console.log(res.data.data)
                setMyOrders(res.data.data)
                setTimeout(() => setLoading(true),500)       
            })
            .catch((err) => {
                console.log(err)
            })
        }
      getOrder()
      
    },[delivered])

   

    if(loading === false) {
        return <LoadingSpinner />
    }
  return (
      
      <div className='container'>
          <Navbar />
    <div className='orders-container'>
        <div className="current-orders orders">
            <h1 className='title-order'>  <span className='span-color'>Current</span> Orders</h1>
            {myOrders.length === 0 ?  (<p>You don't have any current order </p>) : ( myOrders.map((order)=> {
                const date = new Date(order.createdAt)
            if(order.status !==3){
                return <div className='single-order'>
                    <p className='status-order-current'><span className='status'>Status : </span> <Status order={order} delivered={delivered} setDelivered={setDelivered}/></p>
                    <p className='date-order'>{date.toLocaleDateString("fr")}</p>
                    <p>Address : {order.address}</p>
                    <button className='show-food'  onClick={(e) => showHideFood(e, order._id)}>Show/hide food</button>
                    <ul className='food-list' id={order._id}>
                    
                        {order.orderItems.map((item)=> {
                           return <li> <img src={process.env.PUBLIC_URL + `/images/${item.name}.png`} alt="" width="40" height="40" /> <span>{item.name}</span> <span>${item.price}</span></li>
                        })}
                    </ul>
                    <p className='total-order-price'>Total : <span className='span-color'>$</span>{order.total}</p>

                </div>
            }
        })) }
      
        </div>
        <div className="old-orders orders">
        <h1 className='title-order'><span className='span-color'>Old</span> Orders</h1>
        {myOrders.map((order)=> {
            const date = new Date(order.createdAt)
            if(order.status ===3){
                return <div className='single-order'>
                    <p className='status-order-old'><span className='status'>Status :</span>  {statusTab[order.status]}</p>
                    <p className='date-order'>{date.toLocaleDateString("fr")}</p>
                    <p>Address : {order.address}</p>
                    <button  className='show-food' onClick={(e) => showHideFood(e, order._id)}>Show/hide food</button>
                    <ul className='food-list' id={order._id}>
                        
                        {order.orderItems.map((item)=> {
                           return <li> <img src={process.env.PUBLIC_URL + `/images/${item.name}.png`} alt="" width="40" height="40" /> <span>{item.name}</span> <span>${item.price}</span></li>
                        })}
                    </ul>
                    <p className='total-order-price'>Total : <span className='span-color'>$</span>{order.total}</p>

                </div>
            }
        })}
        </div>
    </div>
    </div>
  )
}
