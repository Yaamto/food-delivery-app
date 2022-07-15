import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


const ProtectedRoutes = ({children}) => {

  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {
    async function getAuth() {
        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}jwtid`, {
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
                console.log(isAuth)
            } else {
                setIsAuth(false)
                
            }
        }catch(err){
            setIsAuth(false)
            console.log(err)
        }
        console.log(isAuth)
    }

    getAuth()
  }, [])
  console.log(isAuth)
  return isAuth ? children : <Navigate to='/login' />

}

export default ProtectedRoutes