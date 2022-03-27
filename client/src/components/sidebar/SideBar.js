import React from 'react'
import { NavLink } from 'react-router-dom'
import "./sidebar.css"
export default function SideBar() {
  return (
    <div className='sidebar'>
        <NavLink exact to="/" className="back-site">Back to site</NavLink>
            <div className="sidebar-items">
            <NavLink exact to="/admin/products">Products</NavLink>
            <NavLink exact to="/admin/orders">Orders</NavLink>
            </div>
    </div>
  )
}
