import React from "react";
import styles from "./Trainers.module.css";
import team1 from "../assets/images/gym/team1.jpg";
import team2 from "../assets/images/gym/team2.jpg";
import team3 from "../assets/images/gym/team3.jpg";
import team4 from "../assets/images/gym/team4.jpg";
import bg from "../assets/images/gym/bg2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Trainers() {
  //! Retrieve Trainer Details
  const allTrainerDataQuery = useQuery({
    queryKey: ["allTrainersData"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/trainers");
      const trainers = data.viewAllTrainers;
      return trainers;
    },
  });
  if (allTrainerDataQuery.isLoading) return <h1>Loading...</h1>;
  if (allTrainerDataQuery.isError)
    return <pre>{JSON.stringify(allTrainerDataQuery.error)}</pre>;

  return (
    <div
      className="row p-5"
      style={{
        background: `url(${bg})`,
      }}
    >
      {allTrainerDataQuery.data.map((trainer, index) => (
        console.log(trainer),
        <div key={index} className="col-lg-3 col-md-6 px-4 mt-5 mt-5">
          <div className="card team team-primary text-center bg-transparent border-0">
            <div className="card-body p-0">
              <div className="">
                <div className="position-relative">
                 <img src={trainer.picture} className="img-fluid rounded" />
                 <div
                   className="position-absolute top-0 translate-middle mt-2"
                   style={{ marginLeft: "92%" }}
                 >
                   <FontAwesomeIcon
                     className="position-absolute mt-4 start-100 translate-middle"
                     icon={faHeart}
                     style={{ color: "#ffffff" }}
                   />
                   <FontAwesomeIcon
                     className="position-absolute mt-2 start-100 translate-middle"
                     icon={faHeart}
                     style={{ color: "#ff0000" }}
                   />
                 </div>
                </div>
                <div className=" mb-0 team-icon text-white">
                 <p> {trainer.description}</p>
                 <button className="btn btn-primary">View profile</button>
                </div>
              </div>
              <div className="content pt-3 pb-3">
                <h5 className="mb-0">
                 <a href="javascript:void(0)" className="name">
                   {trainer.firstName} {trainer.lastName}
                 </a>
                </h5>
                <small className="designation text-muted">{trainer.title}</small>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/*end col*/}
    </div>
  );
 }
