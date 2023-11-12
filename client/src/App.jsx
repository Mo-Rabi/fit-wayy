
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Trainers from "./components/Trainers/Trainers";
import UserSignup from "./components/UserSignup/UserSignup";
import UserLogin from "./components/UserLogin/UserLogin";
import UserProfile from "./components/UserProfile/UserProfile";
import UserSettings from "./components/UserSettings/UserSettings";
import TrainerSignup from "./components/TrainerSignup/TrainerSignup";
import TrainerLogin from "./components/TrainerLogin/TrainerLogin";
import TrainerProfile from "./components/TrainerProfile/TrainerProfile";
import TrainerSettings from "./components/TrainerSettings/TrainerSettings";
import ViewTrainer from "./components/ViewTrainer/ViewTrainer";
import Home from "./components/Home/Home";
//import Cloudinary from "./components/Cloudinary/Cloudinary";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import Allusers from "./components/AllUsers/Allusers";
import Gymnastics from "./components/Gymnastics/Gymnastics";
import BMI from "./components/BMI/BMI";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          index: true,
          element: <Home />,
        },
        // {
        //   path: "cloudinary",
        //   element: <Cloudinary />,
        // },
        {
          path: "trainers",
          element: <Trainers />,
        },
        {
          path: "trainers/login",
          element: <TrainerLogin />,
        },
        {
          path: "trainer/profile",
          element: <TrainerProfile />,
        },
        {
          path: "trainer/profile/:id",
          element: <ViewTrainer />,
        },
        {
          path: "trainer/settings",
          element: <TrainerSettings />,
        },

        {
          path: "users/register",
          element: <UserSignup />,
        },
        {
          path: "trainers/register",
          element: <TrainerSignup />,
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

        { path: "trainer/settings", element: <TrainerSettings /> },
        {path: "/all", element: <Allusers/>},
        {path: "/gymn", element:<Gymnastics/>},
        {path:"/bmi", element: <BMI/>}
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;


