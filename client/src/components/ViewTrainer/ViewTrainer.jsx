import React, { useState, useEffect } from "react";
import styles from "./ViewTrainer.module.css";
import bg from "../assets/images/gym/bg2.jpg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function ViewTrainer() {
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
      let { data } = await axios.get(`http://localhost:4000/trainerData/${id}`);
      const trainerData = data.trainerData;
      return trainerData;
    },
  });

  const trainer = trainerDataQuery.data;

  if (trainerDataQuery.isLoading) return <h1>Loading...</h1>;
  if (trainerDataQuery.isError)
    return <pre>{JSON.stringify(trainerDataQuery.error)}</pre>;

  return (
    <div
      className="row"
      style={{
        background: `url(${bg})`,
      }}
    >
      <div className="col-lg-2 col-md-6" style={{ margin: "10% 10% 15% 20%" }}>
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

      <div className="col-lg-4 col-md-6" style={{ margin: "10% 0% 30% 5%" }}>
        <div className="content pt-3 pb-3">
          <h5 className="mb-3">
            <a href="#" className="name">
              {trainer.firstName} {trainer.lastName}
            </a>
          </h5>
          <small className="designation text-muted">{trainer.title}</small>
          <p className="text-white"> {trainer.description}</p>
          <button className="btn btn-success">Book now!</button>
        </div>
      </div>
    </div>

    // <div className="container mt-100 mt-60 p-5">
    //   <div className="row align-items-center">
    //     <div className="col-lg-5 col-md-6 mt-4 pt-2">
    //       <img src={trainerDataQuery.data.picture} width={300} />
    //     </div>
    //     {/*end col*/}
    //     <div className="col-lg-7 col-md-6 mt-4 pt-2">
    //       <div className="section-title ms-lg-5">
    //         <h4 className="title mb-4">
    //           {trainerDataQuery.data.firstName + " "}
    //           {trainerDataQuery.data.lastName}
    //           <small className="d-block text-muted">
    //             {" "}
    //             {trainerDataQuery.data.title}
    //           </small>
    //         </h4>
    //         <p className="text-muted">{trainerDataQuery.data.description}</p>
    //         <ul className="list-unstyled text-muted">
    //           <li className="mb-1">
    //             <span className="text-primary h5 me-2">
    //               <i className="uil uil-check-circle align-middle" />
    //             </span>
    //             Digital Marketing Solutions for Tomorrow
    //           </li>
    //           <li className="mb-1">
    //             <span className="text-primary h5 me-2">
    //               <i className="uil uil-check-circle align-middle" />
    //             </span>
    //             Our Talented &amp; Experienced Marketing Agency
    //           </li>
    //           <li className="mb-1">
    //             <span className="text-primary h5 me-2">
    //               <i className="uil uil-check-circle align-middle" />
    //             </span>
    //             Create your own skin to match your brand
    //           </li>
    //         </ul>
    //         <div className="mt-4">
    //           <a href="javascript:void(0)" className="btn btn-primary">
    //             Book now <i className="uil uil-angle-right-b align-middle" />
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
