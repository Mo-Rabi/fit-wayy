import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
