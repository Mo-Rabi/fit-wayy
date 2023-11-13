import React, { useState,useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import style from './paypal.module.css'
import axios from 'axios';

export default function Paypal({price}) {
    const [orderID, setOrderID] = useState("");
    const [onApproveMessage, setOnApproveMessage] = useState("");
    const [onErrorMessage, setOnErrorMessage] = useState("");
  
    const createOrder = (data, actions) => {
      const amount = document.getElementById("amount").value;
      console.log("Creating order for amount", amount);
  
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: price
              }
            }
          ]
        })
        .then((orderID) => {
          setOrderID(orderID);
          return orderID;
        });
    };
  
    const onApprove = (data, actions) => {
      return actions.order.capture().then((details) => {
        setOnApproveMessage(`Transaction completed by ${details.payer.name.given_name}!`);
      });
    };
  
    const onError = (err) => {
      setOnErrorMessage(err.toString());
    };
  
    const onClick = () => {
      const amount = document.getElementById("amount").value;
      console.log("When clicked, amount was", amount);
    };

   async function getData(){
        let { data } = await axios.get("http://localhost:4000/trainers");
        console.log(data)
    }
    useEffect(()=>{
       getData();
  
    },[])
  
    return (
        <div className="py-5">
            <div className="container py-5 mt-5 text-align-center">
             <div style={{ minHeight: "300px" }}>
        <table className="table" style={{ maxWidth: "400px", margin:"auto" }}>
          <tbody>
            <tr>
              <th>
                <label htmlFor="amount">Order Amount: </label>
              </th>
              <td>
                <select name="amount" id="amount">
                  <option value="2.00">$2.00</option>
                  <option value="4.00">$4.00</option>
                  <option value="6.00">$6.00</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>client ID:</th>
              <td>{orderID ? orderID : "unknown"}</td>
            </tr>
            <tr>
              <th>On Approve Message: </th>
              <td data-testid="message">{onApproveMessage}</td>
            </tr>
            <tr>
              <th>On Error Message: </th>
              <td data-testid="error">{onErrorMessage}</td>
            </tr>
          </tbody>
        </table>
        <PayPalScriptProvider options={{ "client-id": "AbhJO1mTvJs_QoYtCBHwGu1C6wGhJu2FONENLw9nmUVp_YUOYIjk0gFAHetkgUmPLu2SYL60y4XegAdE" }}>
          <PayPalButtons className='w-75 mx-auto'
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onClick={onClick}
          />
        </PayPalScriptProvider>
      </div>
        </div>
        </div>
     
    );
  };
  
 



