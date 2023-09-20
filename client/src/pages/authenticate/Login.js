import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import BackToSite from './BackToSite'
import { StatusContext } from '../../components/context/StatusContext'

let socket 
const host = process.env.REACT_APP_API_URL

export default function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [_userId, set_userId] = useState()

  let {sock, userId} = useContext(StatusContext)

  const navigate = useNavigate()



  useEffect(() => {
    if (_userId) {
      sock.emit("join-order", _userId);
    }
  }, [sock, _userId]);


  const handleLogin = (e) => {
       
    e.preventDefault()
    axios({
        method:"post",
        url:`${process.env.REACT_APP_API_URL}user/login`,
        withCredentials:true,
        data: {
            email: email,
            password: password
        },
        headers : {
            'Access-Control-Allow-Credentials' : true,
           
            
        }
        
    })
    .then((res) => {
      console.log(res.data.user)
      set_userId(res.data.user._id)
      userId = res.data.user._id
      localStorage.setItem("userId", res.data.user._id)
      localStorage.setItem("userInfo", JSON.stringify(res.data.user))
      navigate("/")
        console.log(res)
       
    })

    .catch((err) => {
        console.log(err)
    })

}


  return (
    <>
    <BackToSite />
      <div className="login-page">

          <form className='login-form' onSubmit={handleLogin}>
              <h1 className="title-auth">Login</h1>
              <input type="text" name='email' id='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email}/>
              <input type="password" name='password' id='password' placeholder='Password...'onChange={(e) => setPassword(e.target.value)} value={password}/>
              <button type='submit'>Login</button>
              <p>Don't have an account ? <span onClick={() => navigate("/register")}> Create it !</span></p>
          </form>
      </div>
    </>
  )
}
