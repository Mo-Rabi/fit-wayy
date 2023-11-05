import React, { useState } from "react";
import styles from "./UserSettings.module.css";
import bg from "../assets/account/bg.png";
import clientPhoto from "../assets/client/01.jpg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightScale,
  faRulerVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  UserPlus,
  Users,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  GitHub,
  Youtube,
  Mail,
  Bookmark,
  Italic,
  Globe,
  Gift,
  MapPin,
  Phone,
  Gitlab,
  User,
  UserCheck,
  MessageCircle,
  Key,
  Type,
} from "react-feather";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

export default function UserSettings() {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  //Invalidate queries to update automatically
  queryClient.invalidateQueries({ queryKey: ["userSettings"] });

  //Track error message
  let [apiResponse, setApiResponse] = useState({ message: "", status: "" });
  //Get Token from local storage and set it to be sent with every axios request
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  //! Retrieve User Settings
  //let firstName;
  const userSettingsQuery = useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/userData");
      const userData = data.userData;
      //console.log("User firstName: ", userData.firstName);
      //firstName = userData.firstName;
      return userData;
    },
  });
  let firstName, lastName, email, title, description, phone, height, weight;
  //country,
  //city;
  if (userSettingsQuery.isSuccess) {
    firstName = userSettingsQuery.data.firstName;
    lastName = userSettingsQuery.data.lastName;
    email = userSettingsQuery.data.email;
    title = userSettingsQuery.data.title;
    description = userSettingsQuery.data.description;
    phone = userSettingsQuery.data.phone;
    height = userSettingsQuery.data.height;
    weight = userSettingsQuery.data.weight;
    //country = userSettingsQuery.data.country;
    // city = userSettingsQuery.data.city;
    //    return (firstName, lastName, email,title,description)
  }

  // //! Retrieve User Details
  // let firstName;
  // const userDataQuery = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: async () => {
  //     console.log("inside query function");
  //     let { data } = await axios.get("http://localhost:4000/userData");
  //     const userData = data.userData;
  //     firstName = userData.firstName
  //     console.log(userData);
  //     return userData;
  //   },
  // });

  // console.log("User Data: ", userDataQuery.data.firstName);

  // console.log("Loadgin?", userDataQuery.isLoading);
  // console.log("Error?", userDataQuery.isError);
  // console.log("Sccess?", userDataQuery.isSuccess);

  //  const isLoading = userDataQuery.isLoading;
  // const isError = userDataQuery.isError;
  // return (
  //   <>
  //     {isLoading && <h1>Loading...</h1>}
  //     {isError && <pre>{JSON.stringify(userDataQuery.error)}</pre>}
  //     {/* Rest of your component */}
  //   </> )

  //   if (userDataQuery.isLoading) return <h1>Loading...</h1>;
  // if (userDataQuery.isError)
  //  return <pre>{JSON.stringify(userDataQuery.error)}</pre>;

  //! Update User details
  const personalDataSchema = yup.object({
    firstName: yup
      .string()
      //.min(2, "Min 2 characters")
      .max(50, "Max number of characters is 50"),
    lastName: yup
      .string()
      //.min(2, "Min 2 characters")
      .max(50, "Max number of characters is 10"),
    email: yup.string().email(),
    //.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
    title: yup.string().max(25, "Max number of characters is 25"),
    description: yup.string().max(200, "Max number of characters is 200"),
  });

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
      title: "",
      description: "",
      // password: "",
      // confirmPassword: "",
      // phone: "",
      // gender: "",
      // age: 0,
      // height: 0,
      // weight: 0,
    },
    mode: "onTouched",
    resolver: yupResolver(personalDataSchema),
  });

  //
  const onSubmit = async (data) => {
    // async request which may result error
    try {
      console.log("Data", data);
      let response = await axios.patch("http://localhost:4000/user/edit", data);
      console.log("Response", response);
      setApiResponse(response.data.message);
    } catch (error) {
      console.log("Error", error);
      //let errorMsg = error.response.data.message;
      //setApiResponse(errorMsg);
    }
  };

  if (userSettingsQuery.isLoading) return <h1>Loading...</h1>;
  if (userSettingsQuery.isError)
    return <pre>{JSON.stringify(userSettingsQuery.error)}</pre>;

  // const queryClient = useQueryClient();
  // const token = localStorage.getItem("token");
  // console.log("Token", token);
  // axios.defaults.headers.common["Authorization"] = token;

  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: fetchTodoList,
  // })

  // //! Retrieve User Details
  // let firstName;
  // const userDataQuery = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: async () => {
  //     console.log("inside query function");
  //     let { data } = await axios.get("http://localhost:4000/userData");
  //     const userData = data.userData;
  //     firstName = userData.firstName
  //     console.log(userData);
  //     return userData;
  //   },
  // });

  // console.log("User Data: ", userDataQuery.data.firstName);

  // console.log("Loadgin?", userDataQuery.isLoading);
  // console.log("Error?", userDataQuery.isError);
  // console.log("Sccess?", userDataQuery.isSuccess);

  //  const isLoading = userDataQuery.isLoading;
  // const isError = userDataQuery.isError;
  // return (
  //   <>
  //     {isLoading && <h1>Loading...</h1>}
  //     {isError && <pre>{JSON.stringify(userDataQuery.error)}</pre>}
  //     {/* Rest of your component */}
  //   </> )

  //   if (userDataQuery.isLoading) return <h1>Loading...</h1>;
  // if (userDataQuery.isError)
  //  return <pre>{JSON.stringify(userDataQuery.error)}</pre>;

  // //! Update User details
  // const personalDataSchema = yup.object({
  //   firstName: yup
  //     .string()
  //     .min(2, "Min 2 characters")
  //     .max(50, "Max number of characters is 50"),
  //   lastName: yup
  //     .string()
  //     .min(2, "Min 2 characters")
  //     .max(50, "Max number of characters is 10"),
  //   email: yup
  //     .string()
  //     .email()
  //     .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"),
  //   title: yup.string().max(25, "Max number of characters is 25"),
  //   description: yup.string().max(250, "Max number of characters is 250"),
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, touchedFields, dirtyFields, isDirty, isValid },
  //   control,
  //   trigger,
  // } = useForm({
  //   defaultValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     title: "",
  //     description: "",
  //     // password: "",
  //     // confirmPassword: "",
  //     // phone: "",
  //     // gender: "",
  //     // age: 0,
  //     // height: 0,
  //     // weight: 0,
  //   },
  //   mode: "onTouched",
  //   resolver: yupResolver(personalDataSchema),
  // });
  // password: yup
  //   .string()
  //   .matches(
  //     /^[A-Z][a-z0-9]{3,8}$/,
  //     "Password must start with an Uppercase letter and 4-8 char long"
  //   )
  //   .required("Required"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),
  // phone: yup
  //   .string()
  //   .required("Required")
  //   .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  // age: yup
  //   .number()
  //   .typeError("Must provide a number")
  //   .required("Required")
  //   .min(18, "Must be 18+")
  //   .max(100, "Must be less than 100")
  //   .integer(),
  // height: yup
  //   .number()
  //   .typeError("Must be a number")
  //   .required("Required")
  //   .positive("Positive number only")
  //   .min(50, "Must be more than 50cm")
  //   .max(250, "Must be less than 250cm")
  //   .integer(),
  // weight: yup
  //   .number()
  //   .typeError("Must be a number")

  //   .required("Required")
  //   .positive("Positive number only")
  //   .min(5, "Must be more than 5kg")
  //   .max(650, "Must be less than 635kg")
  //   .integer(),
  // picture: yup.string(),
  // });

  // const onSubmit = async (data) => {
  //   console.log("Data", data);
  //   // async request which may result error
  //   try {
  //     let response = await axios.post(
  //       "http://localhost:4000/users/register",
  //       data
  //     );
  //     console.log(response);
  //     //setApiResponse(response.data.message);
  //   } catch (error) {
  //     let errorMsg = error.response.data.message;
  //     //setApiResponse(errorMsg);
  //   }
  // };
  // console.log(touchedFields, dirtyFields);

  // const { onChange, onBlur, name, ref } = register("firstName");

  // if (userDataQuery.isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (userDataQuery.isError) {
  //   return <pre>{JSON.stringify(userDataQuery.error)}</pre>;
  // }

  // if (userDataQuery.isSuccess) {
  //   console.log("User Data: ", userDataQuery.data.firstName);
  return (
    <>
      <div>
        {/* Hero Start */}
        <section
          className="bg-profile d-table w-100 bg-primary"
          style={{ background: `url(${bg})` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="card public-profile border-0 rounded shadow"
                  style={{ zIndex: 1 }}
                >
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-lg-2 col-md-3 text-md-start text-center">
                        <img
                          src={clientPhoto}
                          className="avatar avatar-large rounded-circle shadow d-block mx-auto"
                        />
                      </div>
                      {/*end col*/}
                      <div className="col-lg-10 col-md-9">
                        <div className="row align-items-end">
                          <div className="col-md-7 text-md-start text-center mt-4 mt-sm-0">
                            <h3 className="title mb-0">
                              {firstName + " "}
                              {lastName}
                            </h3>
                            <small className="text-muted h6 me-2">
                              {title}
                            </small>
                            <ul className="list-inline mb-0 mt-3">
                              <li className="list-inline-item me-4">
                                <a
                                  href=""
                                  className="text-muted"
                                  title="Instagram"
                                >
                                  <Instagram className="me-2 mb-1" />
                                  {firstName}_{lastName}
                                </a>
                              </li>
                              <li className="list-inline-item ms-2">
                                <a
                                  href=""
                                  className="text-muted"
                                  title="Linkedin"
                                >
                                  <Linkedin className="me-2 mb-2" />
                                  {firstName}-{lastName}
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/*end col*/}
                          <div className="col-md-5 text-md-end text-center">
                            <ul className="list-unstyled social-icon social mb-0 mt-4">
                              <li className="list-inline-item">
                                <a
                                  href=""
                                  className="rounded me-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Add Friend"
                                >
                                  <i className="uil uil-user-plus align-middle " />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href=""
                                  className="rounded me-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Messages"
                                >
                                  <i className="uil uil-comment align-middle" />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href=""
                                  className="rounded me-1"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Notifications"
                                >
                                  <i className="uil uil-bell align-middle" />
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a
                                  href="account-setting.html"
                                  className="rounded"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="Settings"
                                >
                                  <i className="uil uil-cog align-middle" />
                                </a>
                              </li>
                            </ul>
                            {/*end icon*/}
                          </div>
                          {/*end col*/}
                        </div>
                        {/*end row*/}
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*ed container*/}
        </section>
        {/*end section*/}
        {/* Hero End */}
        {/* Profile Start */}
        <section className="section mt-60">
          <div className="container mt-lg-3">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                <div className="sidebar sticky-bar p-4 rounded shadow">
                  <div className="widget">
                    <h5 className="widget-title">Stats :</h5>
                    <div className="row mt-4">
                      <div className="col-6 text-center">
                        <UserPlus className="text-primary" />
                        <h5 className="mb-0">2588</h5>
                        <p className="text-muted mb-0">Points</p>
                      </div>
                      {/*end col*/}
                      <div className="col-6 text-center">
                        <Users className="text-primary" />
                        <h5 className="mb-0">454</h5>
                        <p className="text-muted mb-0">Workouts</p>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                  <div className="widget mt-4 pt-2">
                    <h5 className="widget-title">Progress :</h5>
                    <div className="progress-box mt-4">
                      <h6 className="title text-muted">Progress</h6>
                      <div className="progress">
                        <div
                          className="progress-bar position-relative bg-primary"
                          style={{ width: "50%" }}
                        >
                          <div className="progress-value d-block text-muted h6">
                            24 / 48
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*end process box*/}
                  </div>
                  <div className="widget mt-4">
                    <ul
                      className="list-unstyled sidebar-nav mb-0"
                      id="navmenu-nav"
                    >
                      <li className="navbar-item account-menu px-0">
                        <Link
                          to={"/user/profile"}
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-dashboard" />
                          </span>
                          <h6 className="mb-0 ms-2">Profile</h6>
                        </Link>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="account-members.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-users-alt" />
                          </span>
                          <h6 className="mb-0 ms-2">Members</h6>
                        </a>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="account-works.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-file" />
                          </span>
                          <h6 className="mb-0 ms-2">Portfolio</h6>
                        </a>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="account-chat.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-comment" />
                          </span>
                          <h6 className="mb-0 ms-2">Chat</h6>
                        </a>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="account-messages.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-envelope-star" />
                          </span>
                          <h6 className="mb-0 ms-2">Messages</h6>
                        </a>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="account-payments.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-transaction" />
                          </span>
                          <h6 className="mb-0 ms-2">Payments</h6>
                        </a>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <Link
                          to={"/user/settings"}
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-setting" />
                          </span>
                          <h6 className="mb-0 ms-2">Settings</h6>
                        </Link>
                      </li>
                      <li className="navbar-item account-menu px-0 mt-2">
                        <a
                          href="auth-login-three.html"
                          className="navbar-link d-flex rounded shadow align-items-center py-2 px-4"
                        >
                          <span className="h4 mb-0">
                            <i className="uil uil-dashboard" />
                          </span>
                          <h6 className="mb-0 ms-2">Logout</h6>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="widget mt-4 pt-2">
                    <h5 className="widget-title">Follow me :</h5>
                    <ul className="list-unstyled social-icon social mb-0 mt-4">
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Facebook />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Instagram />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Twitter />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Linkedin />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <GitHub />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded me-1">
                          <Youtube />
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="" className="rounded">
                          <Gitlab />
                        </a>
                      </li>
                    </ul>
                    {/*end icon*/}
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-8 col-12">
                <div className="card border-0 rounded shadow">
                  <div className="card-body">
                    <h5 className="text-md-start text-center">
                      Personal Detail :
                    </h5>
                    <div className="mt-3 text-md-start text-center d-sm-flex">
                      <img
                        src={clientPhoto}
                        className="avatar float-md-left avatar-medium rounded-circle shadow me-md-4"
                      />
                      <div className="mt-md-4 mt-3 mt-sm-0">
                        <a href="" className="btn btn-primary mt-2">
                          Change Picture
                        </a>
                        <a
                          href=""
                          className="btn btn-outline-primary mt-2 ms-2"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                    {/* Personal information form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                            <div className="form-icon position-relative">
                              <User className="position-absolute mt-2 ms-2" />
                              <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control ps-5"
                                placeholder={firstName}
                                {...register("firstName")}
                              />
                              {touchedFields.firstName &&
                              errors.firstName?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.firstName?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="lastName">
                              Last Name
                            </label>
                            <div className="form-icon position-relative">
                              <UserCheck className="position-absolute mt-2 ms-2" />
                              <input
                                name="lastName"
                                id="lastName"
                                type="text"
                                className="form-control ps-5"
                                placeholder={lastName}
                                {...register("lastName")}
                              />
                              {touchedFields.lastName &&
                              errors.lastName?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.lastName?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                            <div className="form-icon position-relative">
                              <Mail className="position-absolute mt-2 ms-2" />
                              <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control ps-5"
                                placeholder={email}
                                {...register("email")}
                              />
                              {touchedFields.email && errors.email?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.email?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="title">
                              Title
                            </label>
                            <div className="form-icon position-relative">
                              <Type className="position-absolute mt-2 ms-2" />
                              <input
                                name="title"
                                id="title"
                                type="text"
                                className="form-control ps-5"
                                placeholder={title}
                                {...register("title")}
                              />
                              {touchedFields.title && errors.title?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.title?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        {/*end col*/}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="description">
                              Description
                            </label>
                            <div className="form-icon position-relative">
                              <MessageCircle className="position-absolute mt-2 ms-2" />

                              <textarea
                                name="description"
                                id="description"
                                rows={4}
                                className="form-control ps-5"
                                placeholder={description}
                                {...register("description")}
                              />
                              {touchedFields.description &&
                              errors.description?.message ? (
                                <div className="alert alert-danger p-1 mt-2">
                                  {errors.description?.message}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*end row*/}
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            type="submit"
                            id="submit"
                            name="send"
                            className="btn btn-primary"
                            //alue="Save Changes"
                          />
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                    </form>
                    {/*end form*/}
                    <div className="row">
                      <div className="col-md-6 mt-4 pt-2">
                        <h5>Contact Info :</h5>
                        <form>
                          <div className="row mt-4">
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Phone No. :
                                </label>
                                <div className="form-icon position-relative">
                                  <Phone className="position-absolute mt-2 ms-2" />

                                  <input
                                    name="number"
                                    id="number"
                                    type="number"
                                    className="form-control ps-5"
                                    placeholder={phone}
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">Website :</label>
                                <div className="form-icon position-relative">
                                  <Globe className="position-absolute mt-2 ms-2" />
                                  <input
                                    name="url"
                                    id="url"
                                    type="url"
                                    className="form-control ps-5"
                                    placeholder="Url :"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">Weight :</label>
                                <div className="form-icon position-relative">
                                  <FontAwesomeIcon
                                    className="position-absolute mt-2 ms-2"
                                    icon={faWeightScale}
                                  />
                                  <input
                                    name="url"
                                    id="url"
                                    type="number"
                                    className="form-control ps-5"
                                    placeholder={weight}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">Height :</label>
                                <div className="form-icon position-relative">
                                  <FontAwesomeIcon
                                    icon={faRulerVertical}
                                    className="position-absolute mt-2 ms-2"
                                  />
                                  <input
                                    name="url"
                                    id="url"
                                    type="number"
                                    className="form-control ps-5"
                                    placeholder={height}
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12 mt-2 mb-0">
                              <button className="btn btn-primary">Add</button>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </form>
                      </div>
                      {/*end col*/}
                      <div className="col-md-6 mt-4 pt-2">
                        <h5>Change password :</h5>
                        <form>
                          <div className="row mt-4">
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Old password :
                                </label>
                                <div className="form-icon position-relative">
                                  <Key className="position-absolute mt-2 ms-2" />
                                  <input
                                    type="password"
                                    className="form-control ps-5"
                                    placeholder="Old password"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  New password :
                                </label>
                                <div className="form-icon position-relative">
                                  <Key className="position-absolute mt-2 ms-2" />

                                  <input
                                    type="password"
                                    className="form-control ps-5"
                                    placeholder="New password"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label className="form-label">
                                  Re-type New password :
                                </label>
                                <div className="form-icon position-relative">
                                  <Key className="position-absolute mt-2 ms-2" />

                                  <input
                                    type="password"
                                    className="form-control ps-5"
                                    placeholder="Re-type New password"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            {/*end col*/}
                            <div className="col-lg-12 mt-2 mb-0">
                              <button className="btn btn-primary">
                                Save password
                              </button>
                            </div>
                            {/*end col*/}
                          </div>
                          {/*end row*/}
                        </form>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </div>
                </div>
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0">Account Notifications :</h5>
                  </div>
                  <div className="p-4">
                    <div className="d-flex justify-content-between pb-4">
                      <h6 className="mb-0">When someone mentions me</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //defaultValue
                          id="noti1"
                        />
                        <label className="form-check-label" htmlFor="noti1" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">When someone follows me</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          defaultChecked="true"
                          id="noti2"
                        />
                        <label className="form-check-label" htmlFor="noti2" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">When shares my activity</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          id="noti3"
                        />
                        <label className="form-check-label" htmlFor="noti3" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">When someone messages me</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //  defaultValue
                          id="noti4"
                        />
                        <label className="form-check-label" htmlFor="noti4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0">Marketing Notifications :</h5>
                  </div>
                  <div className="p-4">
                    <div className="d-flex justify-content-between pb-4">
                      <h6 className="mb-0">There is a sale or promotion</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //defaultValue
                          id="noti5"
                        />
                        <label className="form-check-label" htmlFor="noti5" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">Company news</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          //defaultValue
                          id="noti6"
                        />
                        <label className="form-check-label" htmlFor="noti6" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">Weekly jobs</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          defaultChecked="true"
                          id="noti7"
                        />
                        <label className="form-check-label" htmlFor="noti7" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between py-4 border-top">
                      <h6 className="mb-0">Unsubscribe News</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // defaultValue
                          defaultChecked="true"
                          id="noti8"
                        />
                        <label className="form-check-label" htmlFor="noti8" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded shadow mt-4">
                  <div className="p-4 border-bottom">
                    <h5 className="mb-0 text-danger">Delete Account :</h5>
                  </div>
                  <div className="p-4">
                    <h6 className="mb-0">
                      Do you want to delete the account? Please press below
                      "Delete" button
                    </h6>
                    <div className="mt-4">
                      <button className="btn btn-danger">Delete Account</button>
                    </div>
                    {/*end col*/}
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </section>
        {/*end section*/}
        {/* Profile End */}
      </div>
    </>
  );
}
