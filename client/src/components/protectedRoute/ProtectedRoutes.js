import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


const ProtectedRoutes = ({children}) => {

  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    async function getAuth() {
        try {

            const res = await fetch('http://localhost:3000/jwtid', {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await res.json()
            console.log(data)
            if (data.user._id) {
                setIsAuth(true)
                localStorage.setItem("userId", data.user._id )
                
            } else {
                setIsAuth(false)
                
            }
        }catch(err){
            setIsAuth(false)
            console.log(err)
        }
    
    }

    getAuth()
  }, [])

  return isAuth ? children : <Navigate to='/login' />

}

export default ProtectedRoutes