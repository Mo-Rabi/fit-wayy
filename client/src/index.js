import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-bootstrap";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  QueryDevtools,
  ReactQueryDevtools,
} from "@tanstack/react-query-devtools";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";


const queryClient = new QueryClient();

const googleAuthClientID = process.env.REACT_APP_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PayPalScriptProvider 
  options={{"client-id":"AbhJO1mTvJs_QoYtCBHwGu1C6wGhJu2FONENLw9nmUVp_YUOYIjk0gFAHetkgUmPLu2SYL60y4XegAdE"}}
>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleAuthClientID}>
        <App />
      </GoogleOAuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
