import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./register.css"
import BackToSite from './BackToSite'

export default function Register() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()
  const [address, setAddress] = useState()

  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault()

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}user/register`,
      withCredentials: true,
      data: {
        username: username,
        email: email,
        password: password,
        address: address
      },
      headers: {
        'Access-Control-Allow-Credentials': true,


      }

    })
      .then((res) => {
        navigate("/login")
        console.log(res)

      })

      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <>
    <BackToSite />
    <div className="register-page">

        <form className='register-form' onSubmit={handleRegister}>
            <h1 className="title-auth">Register</h1>
            <input type="text" name='username' id='username' placeholder='Username...' onChange={(e) => setUsername(e.target.value)} value={username}/>
            <input type="text" name='email' id='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="text" name='address' id='address' placeholder='Address...' onChange={(e) => setAddress(e.target.value)} value={address}/>
            <input type="password" name='password' id='password' placeholder='Password...'onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button type='submit'>Register</button>
            <p>Already have an account ? <span onClick={() => navigate("/login")}> Login here !</span></p>
        </form>
    </div>
  </>
  )
}
