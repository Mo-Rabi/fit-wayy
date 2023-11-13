import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoutes(props) {
  if(localStorage.getItem('token')) {
    return props.children
  }else {
    return <Navigate to={"/users/login"}/>
  }
}
