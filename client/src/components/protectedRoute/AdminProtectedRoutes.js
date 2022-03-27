import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


const AdminProtectedRoutes = ({children}) => {

  const [isAuth, setIsAuth] = useState(true)

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
                setIsAuth(true)
                console.log(data)
                localStorage.setItem("userId", data.user._id )
                
            }else {
                setIsAuth(false)
                localStorage.removeItem("userId")
                localStorage.removeItem("userInfo")
                console.log(data)
            }
        }catch(err){
            setIsAuth(false)
            localStorage.removeItem("userId")
                localStorage.removeItem("userInfo")
            console.log(err)
        }
    
    }
    console.log(isAuth)

    getAuthAdmin()
  }, [])

  return isAuth ? children : <Navigate to='/login' />

}

export default AdminProtectedRoutes