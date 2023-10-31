import React, { useState } from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const schema = yup.object({
    firstName: yup
      .string()
      .required("Required")
      .min(2, "Min 2 characters")
      .max(50, "Max number of characters is 50"),
    lastName: yup
      .string()
      .required("Required")
      .min(2, "Min 2 characters")
      .max(50, "Max number of characters is 10"),
    email: yup
      .string()
      .email()
      .required("Required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
    password: yup
      .string()
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "Password must start with an Uppercase letter and 4-8 char long"
      )
      .required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: yup
      .string()
      .required("Required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    age: yup
      .number("Must be a number")
      .required("Required")
      .positive("Positive number only")
      .integer(),
    gender: yup.string().required("Required"),
    height: yup
      .number("Must be a number")
      .required("Required")
      .positive("Positive number only")
      .integer(),
    weight: yup
      .number("Must be a number")
      .required("Required")
      .positive("Positive number only")
      .integer(),
    picture: yup.string(),
  });
  //? Track error messages
  const [ApiResponse, setApiResponse] = useState(null);

  //! Show/ hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields, isDirty, isValid },
    control,
    trigger,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      gender: "",
      age: 0,
      height: 0,
      weight: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // async request which may result error
    try {
      console.log(data);
      // await fetch()
      let response = await axios.post(
        "http://localhost:4000/users/register",
        data
      );
      console.log("Response: ", response);
      setApiResponse(response.data.message);
    } catch (error) {
      // handle your error
      console.log("Error: ", error);
      //let errorMsg = error.response.data.message;
      //console.log("ErrorMsg: ", errorMsg);
      // Set the error message in state or a variable that can be accessed in the JSX
      //setApiResponse(errorMsg);
    }
  };
  // console.log(touchedFields, dirtyFields);

  const { onChange, onBlur, name, ref } = register("firstName");

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-5">
          {ApiResponse === "SignUp successful, please check your email" ? (
            <div className="alert alert-success p-1 text-center">
              <i className="fa fa-triangle-exclamation text-success "></i>{" "}
              &nbsp;
              {ApiResponse}
            </div>
          ) : ApiResponse === "Email already exists" ? (
            <div className="alert alert-danger p-1 text-center">
              <i className="fa fa-triangle-exclamation text-danger "></i>
              &nbsp;
              {ApiResponse}
            </div>
          ) : null}
          <div className="card">
            <div>
              <a href="/">
                <img
                  className="rounded mx-auto d-block mt-3 mb-3"
                  src="https://www.svgrepo.com/show/475554/gym.svg"
                  width="10%"
                  alt="logo"
                />
              </a>
            </div>
            <h4 className="card-title mt-4 fw-bold text-center text-body-tertiary">
              Sign up for your account
            </h4>
            <div className="card-body mt-3 form-control">
              {/*! Floating form Beginning */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                //method="post"
                //action="/user/signUp"
                //id="floatingForm"
                noValidate
              >
                {/*! First Name */}
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    {...register("firstName")}

                    //setError('firstName',  {'custom', 'custom message'} )
                  />
                  {touchedFields.firstName && errors.firstName?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.firstName?.message}
                    </div>
                  ) : null}

                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                </div>

                {/*! Last Name */}
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  {touchedFields.lastName && errors.lastName?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.lastName?.message}
                    </div>
                  ) : null}

                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                </div>

                {/*! Email with validation */}
                <div className="mb-3 form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Please enter your Email",
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {touchedFields.email && errors.email?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.email?.message}
                    </div>
                  ) : null}

                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                </div>

                {/*! Password with validation */}
                <div className="mb-3 form-floating">
                  <span
                    className="position-absolute mt-3"
                    style={{ marginLeft: "87%" }}
                  >
                    <a
                      className="link link-dark icon-link-hover-0 border-0"
                      type="button"
                      id="togglePassword"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className="fa fa-eye fa-lg"
                        style={{ color: "#666666" }}
                      />
                    </a>
                  </span>
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Please enter your password",
                      pattern: {
                        value: /^[A-Z][a-z0-9]{3,8}$/,
                        message:
                          "Password must start with an Uppercase letter and 4-8 char long",
                      },
                    })}
                  />

                  {touchedFields.password && errors.password?.message ? (
                    <div className="alert alert-danger p-1 mt-2 mb-2">
                      {errors.password?.message}
                    </div>
                  ) : null}
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                </div>

                {/*! Confirm password with validation */}
                <div className="mb-3 form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                    })}
                  />

                  {touchedFields.confirmPassword &&
                  errors.confirmPassword?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.confirmPassword?.message}
                    </div>
                  ) : null}

                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                </div>

                {/*! Phone Name */}
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    {...register("phone")}
                  />
                  {touchedFields.phone && errors.phone?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.phone?.message}
                    </div>
                  ) : null}

                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                </div>

                {/*! Gender */}
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    {...register("gender")}
                  />
                  {touchedFields.gender && errors.gender?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.gender?.message}
                    </div>
                  ) : null}

                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                </div>
                {/*! Age  */}
                <div className="mb-3 form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    placeholder="Age"
                    {...register("age")}
                  />
                  {touchedFields.age && errors.age?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.age?.message}
                    </div>
                  ) : null}

                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                </div>
                {/*! Height  */}
                <div className="mb-3 form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    name="height"
                    placeholder="Height"
                    {...register("height")}
                  />
                  {touchedFields.height && errors.height?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.height?.message}
                    </div>
                  ) : null}

                  <label htmlFor="height" className="form-label">
                    Height
                  </label>
                </div>
                {/*! Weight  */}
                <div className="mb-3 form-floating">
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    placeholder="Weight"
                    {...register("weight")}
                  />
                  {touchedFields.weight && errors.weight?.message ? (
                    <div className="alert alert-danger p-1 mt-2">
                      {errors.weight?.message}
                    </div>
                  ) : null}

                  <label htmlFor="gender" className="form-label">
                    Weight
                  </label>
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn text-white col-12"
                    style={{ backgroundColor: "#36b37e", fontWeight: 700 }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <DevTool control={control} />
              <p className="text-center">
                Already have an account? <a href="/login"> Log In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
