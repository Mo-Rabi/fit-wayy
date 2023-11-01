import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import UserSignup from "./components/UserSignup/UserSignup";
import UserLogin from "./components/UserLogin/UserLogin";
import UserProfile from "./components/UserProfile/UserProfile";
import TrainerSignup from './components/TrainerSignup/TrainerSignup'
import TrainerLogin from './components/TrainerLogin/TrainerLogin'
import TrainerProfile from "./components/TrainerProfile/TrainerProfile";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "trainers/register",
          element: <TrainerSignup />,
        },
        {
          path: "trainers/login",
          element: <TrainerLogin />,
        },
        {
          path: "users/register",
          element: <UserSignup />,
        },
        {
          path: "users/login",
          element: <UserLogin />,
        },
        {
          path: "user/profile",
          element: <UserProfile />,
        },
        {
          path: "trainer/profile",
          element: <TrainerProfile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
