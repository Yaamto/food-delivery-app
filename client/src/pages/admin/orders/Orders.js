import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import {StatusContext} from '../../../components/context/StatusContext'
import SideBar from '../../../components/sidebar/SideBar'
import LoadingSpinner from '../../../components/spinner/Spinner'
import "./orders.css"
export default function Orders() {
  const [loading, setLoading] = useState(false)
  const [allOrders, setAllOrders] = useState([])
  const status = ["Waiting confirmation...", "cooking...", "On the way...", "Delivered"]

  const {sock} = useContext(StatusContext)
  console.log(sock)

  const showHideFood = (e, id) => {
    e.preventDefault()
    document.getElementById(id).classList.toggle("show-hide")
}



    useEffect(() => {
      
      const getOrder = async()=> {
        await axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}order/allorder` ,
            withCredentials: true, 
            headers: {
                'Access-Control-Allow-Credentials': true,
              }         
        })
        .then((res) => {             
            
          console.log(res)

            setTimeout(() => setLoading(true),300)    
            setAllOrders(res.data.data)   
        })
        .catch((err) => {
            console.log(err)
        })
    }
  getOrder()
  const t = setInterval(getOrder, 15000);

  return () => clearInterval(t);
      
    }, [])

    const editStatus = async(id, index) =>{
    
      await axios({
        method:"put",
        url:`${process.env.REACT_APP_API_URL}order/edit/`+id ,
        withCredentials: true, 
        headers: {
            'Access-Control-Allow-Credentials': true,
          }         
    })
    .then((res) => {             
      
      sock.emit('send-status', res.data)
      const newArr = [...allOrders]
      newArr.splice(index, 1, res.data)
      setAllOrders(newArr)
      
    })
    .catch((err) => {
        console.log(err)
    })
}


    
    

    if(loading === false) {
      return <LoadingSpinner />
  }
  return (
    <div>
        <SideBar />
        <div className="all-orders">

      
        
        <div className="current-orders orders">
            <h1 className='title-order'>  <span className='span-color'>Current</span> Orders</h1>
            { allOrders.map((order, index)=> {
                const date = new Date(order.createdAt)
            if(order.status <3){
                return <div className="single-order" key={index}>
                <div className="order-header">
                    <p className='date-order'>{date.toLocaleDateString("fr")}</p>
                    <p>{order._id}</p>
                    <p>{order.customer}</p>
                </div>
                <div className="order-body">
                  <p>Total : ${order.total}</p>
                  <button className='show-food'  onClick={(e) => showHideFood(e, order._id)}>Show/hide food</button>
                 
                  <p className='status-order-current'>{status[order.status]}</p>
                  <button className='next-step' onClick={() => editStatus(order._id, index) }>Next step</button>
                </div>
                <div className="order-footer">
                <ul className='food-list' id={order._id}>
                  
                  {order.orderItems.map((item)=> {
                     return <li> <img src={process.env.PUBLIC_URL + `/images/${item.name}.png`} alt="" width="40" height="40" /> <span>{item.name}</span> <span>${item.price}</span></li>
                  })}
              </ul>
                </div>
          </div>
            }
        }) }
        </div>
        <div className="old-orders">
          
        <h1 className='title-order'>  <span className='span-color'>Old</span> Orders</h1>
          {allOrders.map((order) => {
            const date = new Date(order.createdAt)
            
            if(order.status >=3){
              return <div className="single-order">
              <div className="order-header">
                  <p className='date-order'>{date.toLocaleDateString("fr")}</p>
                  <p>{order._id}</p>
                  <p>{order.customer}</p>
              </div>
              <div className="order-body">
                <p>Total : ${order.total}</p>
                <button className='show-food'  onClick={(e) => showHideFood(e, order._id)}>Show/hide food</button>
               
                <p className='status-order-old'>{status[order.status]}</p>
                
              </div>
                <div className="order-footer">
                  <ul className='food-list' id={order._id}>

                    {order.orderItems.map((item) => {
                      return <li> <img src={process.env.PUBLIC_URL + `/images/${item.name}.png`} alt="" width="40" height="40" /> <span>{item.name}</span> <span>${item.price}</span></li>
                    })}
                  </ul>
                </div>
        </div>
          }
          })}
        </div>
        </div>
    </div>
  )
}
