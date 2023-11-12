import React, { useState } from "react";
import styles from "./UserLogin.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "@fortawesome/fontawesome-free/css/all.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function UserLogin() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [apiResponse, setAPIResponse] = useState({ message: "", status: "" });
  //let { setToken } = useContext(TokenContext);

  //? Track error messages
  const [error, setError] = useState(null);
  async function login(values) {
    try {
      console.log(values);
      setIsLoading(true);
      let response = await axios.post(
        "http://localhost:4000/users/login",
        values
      );
      setIsLoading(false);
      let { token } = response.data;
      console.log("Token: " + token);
      //TODO Migrate from local storage to fully rely on httpOnly cookies //TODO
      //! set the httpOnly token in local storage temporarily
      localStorage.setItem("token", token);
      let { id } = jwtDecode(token);
      console.log("ID: ", id);
      //setAPIResponse({ message: data.message, status: "success" });
      //localStorage.setItem("userToken", data.token);
      //setToken(data.token);
      if (response.data.message === "User logged in successfully") {
        navigate("/gymn");
      } else if (response.data.message === "Trainer logged in successfully") {
        navigate("/trainer/profile");
      }
    } catch (error) {
      //console.log("Error: " + err);
      // console.log(err.response.data.error);
      setIsLoading(false);
      console.log(error);
      let errorMsg = error.response.data.message;
      console.log(errorMsg);
      // Set the error message in state or a variable that can be accessed in the JSX
      setError(errorMsg);
      // setAPIResponse({ message: err.response.data.error, status: "error" });
    }
  }
  //?Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z]/, "Password should start with an uppercase letter")
      .matches(/^.{4,}$/, "Password should be more than 3 characters")
      .required("Password is required"),
  });
  //?Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className="container my-5">
      <div className="user my-3">
        <h4 className="text-center">
          <i className="far fa-edit user-icon" />
          &nbsp; Login to read your whispers
        </h4>
        {error ? (
          <div className="alert alert-danger p-1">
            <i className="fa fa-triangle-exclamation text-danger "></i> &nbsp;
            {error}
          </div>
        ) : null}

        {apiResponse.status === "success" ? (
          <div className="alert alert-success text-center fw-bold">
            <i
              className="fa-solid fa-check fa-bounce"
              style={{ color: "#5ac115" }}
            ></i>
            &nbsp;
            {apiResponse.message}
          </div>
        ) : apiResponse.status === "error" ? (
          <div className="alert alert-danger text-center fw-bold">
            <i
              className="fa-solid fa-xmark fa-bounce"
              style={{ color: "#df210c" }}
            ></i>
            &nbsp;
            <i
              className="fa-light fa-circle-exclamation"
              style="color: #ff0000;"
            ></i>
            {apiResponse.message}
          </div>
        ) : null}
      </div>
      <div className="card p-5 w-50 m-auto">
        <form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="mb-2"
          >
            <label htmlFor="email"></label>
            <Form.Control
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-2 mt-4"
          >
            <label htmlFor="password"></label>
            <Form.Control
              placeholder="Enter your Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FloatingLabel>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          <button
            type="submit"
            className="btn btn-outline-dark my-4 w-100 rounded"
          >
            {isLoading ? (
              <Spinner animation="border" variant="secondary" />
            ) : (
              "Login"
            )}
          </button>
          {/* Login With Google */}
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const decodedData = jwtDecode(credentialResponse.credential);
              let { name, email, picture } = decodedData;
              console.log(decodedData);
              //console.log(name, email, picture);
              let response = await axios.post(
                "https://zen-task.onrender.com/profile",
                decodedData
              );
              console.log(response.data);
              console.log(localStorage.setItem("token", response.data.token));
              navigate("/profile");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
          {/* <button
            className="btn btn-outline-secondary text-black rounded-pill col-12 mb-5"
            //onClick={() => auth()}
          >
            <img
              src="https://www.svgrepo.com/show/448227/google.svg"
              width={25}
            />
            <p className="d-inline pt-0 ms-1" />
            Continue with Google
          </button> */}
          <h6 className="text-center">
            Don't have an account?
            <Link to={"/users/register"} className="link-dark fw-bold">
              Register
            </Link>
          </h6>
        </form>
      </div>
    </div>
  );
}
