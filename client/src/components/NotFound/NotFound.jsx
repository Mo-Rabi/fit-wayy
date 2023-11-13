import React from "react";
import styles from './NotFound.module.css'

export default function NotFound() {
  return (

    <div className='container-fluid text-danger text-center h-100' style={{marginTop: '20%', marginBottom: '20%'}}>
      <h1><i className="fa fa-bug"></i> Error404!</h1>
      <h5>Sorry, the page you are looking for can not be found.</h5>
    </div>
  )
}
