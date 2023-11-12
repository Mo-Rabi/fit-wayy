import React from "react";
import styles from './Chat.module.css'

export default function Chat() {
  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`container mt-5 ${styles.chatContainer}`}>
        <div className="row">
          <div className="col-lg-3">
          <h1 className="text-light">Chat</h1>
          </div>
          <div className="col-lg-9">
          <h1 className="text-light">Chat</h1>
          </div>
        </div>
        
      </div>
    </div>
  )
}
