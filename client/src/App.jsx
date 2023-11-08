import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import UserSignup from "./components/UserSignup/UserSignup";
import UserLogin from "./components/UserLogin/UserLogin";
import UserProfile from "./components/UserProfile/UserProfile";
import UserSettings from "./components/UserSettings/UserSettings";
import TrainerSignup from "./components/TrainerSignup/TrainerSignup";
import TrainerLogin from "./components/TrainerLogin/TrainerLogin";
import TrainerProfile from "./components/TrainerProfile/TrainerProfile";
import TrainerSettings from "./components/TrainerSettings/TrainerSettings"
import Home from "./components/Home/Home"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Calories from "./components/Calories/Calories";
import Exercises from "./components/Exercises/Exercises"
import Recipes from "./components/Recipes/Recipes"
import "./components/assets/css/style.min.css";
import "./components/assets/css/bootstrap.min.css";
import "./components/assets/css/tiny-slider.css";
import "./components/assets/font/css/materialdesignicons.min.css";
import "./components/assets/unicons/css/line.css";
import "./components/assets/swiper/css/swiper.min.css";
import "./components/assets/sass/_topbar.scss";
import "./components/assets/js/app";
import "./components/assets/js/easy_background";
import "./components/assets/js/plugins.init";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [

        {
          path: "",
          index:true,
          element: <Home />,
        },
        {
          path: "user/calories",
          element: <Calories />,
        },
        {
          path: "user/exercises",
          element: <Exercises />,
        },
        {
          path: "user/recipes",
          element: <Recipes />,
        },
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
        { path: "user/settings", element: <UserSettings /> },
        {
          path: "trainer/profile",
          element: <TrainerProfile />,
        },
        { path: "trainer/settings", element: <TrainerSettings /> },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
