import React, {createContext, useState, useEffect} from 'react'
import io from "socket.io-client"

let socket 
const host = process.env.REACT_APP_API_URL
const context = {
    sock : null,
    userId: null
}
export const StatusContext = createContext(context)

const StatusContextProvider = (props) => {
    socket = io(host)
    context.sock = socket
      
    return (
        <StatusContext.Provider value={context}>
            {props.children}
        </StatusContext.Provider>
    )
}

export default StatusContextProvider