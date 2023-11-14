import React, { useState, useEffect } from "react";
import styles from "./ViewTrainer.module.css";
import bg from "../assets/images/gym/bg2.jpg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import StarIcon from "@mui/icons-material/Star";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function ViewTrainer() {
  // const queryClient = useQueryClient();

  // // Invalidate every query in the cache
  // queryClient.invalidateQueries();
  // // Invalidate every query with a key that starts with `todos`
  // // queryClient.invalidateQueries({ queryKey: ["todos"] });

  //! Get trainer ID from Params if the logged in was user
  const trainerId = useParams().id;
  console.log("Trainer", trainerId);

  //TODO Write a function to query data base to retrieve the current trainer reviews and Display them
  //! Retrieve Review Details
  const reviewDataQuery = useQuery({
    queryKey: ["reviewData"],
    queryFn: async () => {
      let { data } = await axios.get(
        `http://localhost:4000/trainer/reviews/${trainerId}`
      );
      const reviewsData = data.allReviews;
      console.log("Reviews Data", reviewsData);
      return reviewsData;
    },
  });

  //? Reviews array of objects
  let reviews = reviewDataQuery.data;
  console.log("Reviews Outside", reviews);

  //? This is the token of the person logged in, Trainer or User
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;

  //? Get user Type
  const userType = localStorage.getItem("userType");
  console.log("TYPE: ", userType);
  //? Handlde Book now button click for guest and user
  const handleBookNowBtn = () => {
    if (!token) {
      toast.error(
        "Log in to start booking Trainers!"
        //, { description: "Monday" }
      );
    }
    if (userType === "trainer") {
      toast.error("Trainer accounts can't book other Trainers!");
    }
  };

  //! Retrieve User Details
  const userDataQuery = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/userData");
      console.log("USER DATA DESTRUCT: ", data);
      const userData = data.userData;
      console.log("USer Data", userData);
      return userData;
    },
  });

  console.log("USER DETAILS OUTSIDE: ", userDataQuery.data);

  //?Track server response message and status
  let [apiResponse, setApiResponse] = useState({ message: "", status: "" });
  //? Gather review data and send to the server to save in DB
  const { register, handleSubmit, control } = useForm();

  // //? Token For Authorization
  // const token = localStorage.getItem("token");
  // axios.defaults.headers.common["Authorization"] = token;
  const onSubmit = async (data) => {
    try {
      if (userType === "trainer") {
        toast.error("Trainer can't post reviews!");
      } else if (userType === "user") {
        console.log("Data", data);
        data.userToken = localStorage.getItem("token"); //User/ Reviewer Token (Logged in)
        data.trainerId = trainerId;
        data.reviewerFirstName = userDataQuery.data.firstName;
        data.reviewerLastName = userDataQuery.data.lastName;
        data.reviewerProfilePhoto = userDataQuery.data.picture;
        console.log("Data", data);

        //!Send review details to Reviews Collection in DB
        let response = await axios.post(
          "http://localhost:4000/reviews/new",
          data
        );
        console.log("Response", response.data.message);
        toast.success("Thank you for sharing your experience!");
      } else {
        toast.success("Please log in first!");
      }
    } catch (error) {
      let errorMsg = error.response.data.error.message;
      let errorStatus = error.response.status;
      //   setApiResponse({
      //     message: errorMsg,
      //     status: errorStatus,
      //   });
      //   console.log("Api Res: ".apiResponse);
    }
  };

  //? Navigate to trainer profile
  const navigate = useNavigate();

  //! Add to favorites
  // Initialize favorites from local storage or an empty array
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(initialFavorites);

  const toggleFavorite = (trainerId) => {
    // Check if the trainer is already in favorites
    if (favorites.includes(trainerId)) {
      // Remove trainer ID from favorites
      const updatedFavorites = favorites.filter((id) => id !== trainerId);
      setFavorites(updatedFavorites);
    } else {
      // Add trainer ID to favorites
      const updatedFavorites = [...favorites, trainerId];
      setFavorites(updatedFavorites);
    }
  };

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  //? Get Trainer ID from URL
  const { id } = useParams();
  console.log("ID: ", id);

  //! Retrieve Trainer Details
  const trainerDataQuery = useQuery({
    queryKey: ["trainerProfile", id],
    queryFn: async () => {
      console.log("ID TO PUT IN REQ", id);
      let { data } = await axios.get(`http://localhost:4000/trainerData/${id}`);
      console.log("Trainer Data", data);
      const trainerData = data.trainerData;
      console.log("Trainer Data");
      return trainerData;
    },
  });

  const trainer = trainerDataQuery.data;

  if (trainerDataQuery.isLoading) return <h1>Loading...</h1>;
  if (trainerDataQuery.isError)
    return <pre>{JSON.stringify(trainerDataQuery.error)}</pre>;

  return (
    <>
      <div
        className="row"
        style={{
          background: `url(${bg})`,
        }}
      >
        <div className="col-lg-2 col-md-6" style={{ margin: "10% 10% 0% 25%" }}>
          <div className="card team team-primary text-center bg-transparent border-0">
            <div className="card-body p-0">
              <div className="position-relative">
                <img
                  src={trainer.picture}
                  className="img-fluid rounded"
                  style={{ width: "30" }}
                />
                <div
                  className="position-absolute top-0 translate-middle mt-2"
                  style={{ marginLeft: "90%" }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="position-absolute mt-2 start-100 translate-middle"
                    style={{
                      color: favorites.includes(trainer._id)
                        ? "#ff0000"
                        : "#828282",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleFavorite(trainer._id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6" style={{ margin: "10% 0% 15% 5%" }}>
          <div className="content pt-3 pb-3">
            <h5 className="mb-3">
              <a href="#" className="name">
                {trainer.firstName} {trainer.lastName}
              </a>{" "}
              <br />
              <small className="designation text-muted">{trainer.title}</small>
            </h5>
            <p className="text-white"> {trainer.description}</p>
            <p className="text-white fw-bold">
              {" "}
              Price: <span className="text-success">{"$" + trainer.price}</span>
            </p>
            <p className="text-white fw-bold">
              {" "}
              Rating:{" "}
              <FontAwesomeIcon icon={faStar} style={{ color: "#f9be1a" }} />
              {trainer.rating}
            </p>
            <p className="text-white fw-bold">
              Trainees no.: {Math.random().toFixed(1) * 100}
            </p>
            <button className="btn btn-success" onClick={handleBookNowBtn}>
              Book now!
            </button>
          </div>
        </div>
        {token ? (
          <div className="row d-flex justify-content-center mb-5 mt-5">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="text-white mb-5">
                <p>Previous Reviews:</p>
                {reviews.length != 0
                  ? reviews.map((review, index) => (
                      <div
                        key={index}
                        className="tiny-slide wow animate__animated animate__fadeInUp"
                        data-wow-delay=".5s"
                      >
                        <div className="d-flex client-testi m-1">
                          <img
                            src={review.reviewerProfilePhoto}
                            className="avatar avatar-small client-image rounded shadow"
                            alt
                          />
                          <div className="card flex-1 content p-3 shadow rounded position-relative">
                            <ul className="list-unstyled mb-0 fw-bold">
                              {review.rating}
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "#f9be1a" }}
                              />
                            </ul>
                            <p className="text-muted mt-2">{review.comment}</p>
                            <h6 className="text-primary">
                              - {review.reviewerFirstName}{" "}
                              {review.reviewerLastName}
                            </h6>
                          </div>
                        </div>
                      </div>
                      // <div key={index}>
                      //   <p>Reviewer ID: {review.reviewerId}</p>
                      //   <p>Rating: {review.rating}</p>
                      //   <p>Comment: {review.comment}</p>
                      // </div>
                    ))
                  : "No reviews yet."}
              </div>
              {apiResponse.message == "jwt must be provided" ? (
                <div className="alert alert-danger p-1 text-center ">
                  <i className="fa fa-triangle-exclamation fa-bounce "></i>
                  &nbsp; Please Login to Review {trainer.firstName}'s Profile!"
                </div>
              ) : null}

              <div className="card">
                <div className="card-body p-4">
                  <div className="d-flex flex-start w-100">
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src={
                        userDataQuery?.data?.picture ||
                        trainer?.picture ||
                        "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png"
                      }
                      alt="avatar"
                      width={65}
                      height={65}
                    />
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h5>Add a Review</h5>
                      <Controller
                        control={control}
                        name="rating"
                        defaultValue={-1}
                        render={({ field: { onChange, value } }) => (
                          <Rating
                            name="rating"
                            onChange={onChange}
                            value={Number(value)}
                            icon={<StarIcon fontSize={"inherit"} />}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                        )}
                      />
                      <div className="form-outline">
                        <textarea
                          className="form-control"
                          id="textAreaExample"
                          rows={4}
                          cols={40}
                          defaultValue={""}
                          {...register("comment")}
                        />
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Button variant="contained" type="submit">
                          Submit Review
                        </Button>
                      </div>
                    </form>
                    {/* <div className="w-100">
                    <h5>Add a Review</h5>
                    <Controller
                      control={control}
                      name="rating"
                      defaultValue={-1}
                      render={({ field: { onChange, value } }) => (
                        <Rating
                          name="rating"
                          onChange={onChange}
                          value={Number(value)}
                          icon={<StarIcon fontSize={"inherit"} />}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                      )}
                    />

                    <div className="form-outline">
                      <textarea
                        className="form-control"
                        id="textAreaExample"
                        rows={4}
                        defaultValue={""}
                        {...register("comment")}
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Submit Review
                      </Button>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
