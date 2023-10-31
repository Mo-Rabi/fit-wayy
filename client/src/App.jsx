import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Calories from "./components/Calories/Calories";

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
        {
          path: "calories",
          element: <Calories />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
