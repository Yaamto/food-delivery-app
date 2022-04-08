import React, {createContext, useState, useEffect} from 'react'
import io from "socket.io-client"
let socket 
const host = process.env.REACT_APP_API_URL
export const StatusContext = createContext()

const StatusContextProvider = (props) => {

    const [sock, setSock] = useState();
  
 
    useEffect(() => {
        const currentUser = localStorage.getItem("userId")
        socket = io(host);
        setSock(socket)
        
        if(currentUser){
            socket.emit("join-order", currentUser);

        }
        
      }, []);
      
    return (
        <StatusContext.Provider value={{sock}}>
            {props.children}
        </StatusContext.Provider>
    )
}

export default StatusContextProvider