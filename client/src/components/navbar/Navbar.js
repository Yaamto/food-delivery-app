import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import "./navbar.css"
export default function Navbar({cart, setCart, setTotalPrice}) {

    const [userId, setUserId] = useState(null)
    const [user, setUser] = useState([])
    const [admin, setAdmin] = useState(false)
  
    useEffect(() => {
      async function getAuthAdmin() {
          try {
  
              const res = await fetch('http://localhost:3000/jwtid/admin', {
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include'
              })
              const data = await res.json()
              console.log(data)
              if (data.user._id && data.user.isAdmin===true) {
                setAdmin(true)
                  
              }else {
                setAdmin(false)
              }
          }catch(err){
             setAdmin(false)
            console.log(err)
      }
    }
  
      getAuthAdmin()
    }, [])
   
    const navigate = useNavigate()
    const getLogin = () => {
        navigate("/login")
    }

    const handleLogout = async(e) => {
      e.preventDefault()
      axios({
        method:"post",
        url:`${process.env.REACT_APP_API_URL}user/logout`,
        withCredentials:true,
        headers : {
            'Access-Control-Allow-Credentials' : true,
           
            
        }
        
    })
    .then((res) => {
      localStorage.removeItem("userId")
      localStorage.removeItem("userInfo")
      
     
      navigate("/login")
      setUser(null)
      
        
       
    })

    .catch((err) => {
        console.log(err)
    })


    }

    useEffect(()=> {
       let userId = localStorage.getItem("userId")
       let user = localStorage.getItem("userInfo")
       setUser(user)
        setUserId(userId)
    }, [])
  return (
    <>
    <div className="nav">
       <p className='logo'><NavLink exact to="/">FOODIES</NavLink> </p>
       
           <ul className='navList'>
               <li><a href="#service">Service</a> </li>
               <li><a href="#menu">Menu</a></li>
               <li><a href="#">Contact</a></li>
             {userId === null ? "" : (<li><NavLink exact to="/orders">My orders</NavLink></li>)}  
             {admin === true ? (<li><NavLink exact to="/admin/products">Admin</NavLink></li>): ""}
            
           </ul>
      {userId === null ? ( <button onClick={getLogin}>Login</button>): ( <button onClick={(e) => handleLogout(e)}>Logout</button>)}
   

      
      
    </div>
    
    
    </>
  )
}
