import React, {useState, useEffect, useContext} from 'react'
import {StatusContext} from '../context/StatusContext'
export default function Status({order, delivered, setDelivered}) {
    const [status, setStatus] = useState(order.status);
    
    const statusTab = ["Waiting confirmation...", "cooking...", "On the way...", "Delivered"]

    const {sock} = useContext(StatusContext)
 
  

 

  return (
    <>{statusTab[status]}</>
  )
}
