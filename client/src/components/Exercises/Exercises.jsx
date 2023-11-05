import React, { useState } from "react";
import axios from "axios";
import styles from './Exercises.module.css'

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = () => {
    axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${searchTerm}`, {
      headers: { 'x-api-key': apiKey }
    })
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error(error);
        setExercises([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container text-light">
      <div className="row mt-5">
        <h4 className="mt-5">Enter the name of the muscle you want to exercise today </h4>
        <div className="col-md-6 mt-4">

          <div className="input-group mb-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter muscle name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              {isLoading ? <i className='fa fa-spin fa-spinner'></i> : <><i className='fa fa-search'></i> Search </>}
            </button>
          </div>
        </div>
        {exercises && exercises.length === 0 && !isLoading && (
          <p style={{ color: 'red' }}>No exercises found. Please search for a muscle.</p>
        )}
      </div>

      {exercises && exercises.length > 0 && (
        <div className="row text-light">
          <h5>Choose which exercise you want</h5>
          {
            exercises.map((exercise, index) => (
              <div className="col-4" key={index}>
                <button type="button" className="btn btn-dark text-light mb-3 w-100 shadow-md" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  {exercise.name.toUpperCase()}
                </button>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                    <div className="modal-content bg-dark">
                      <div className="modal-header">
                        <h6 className="modal-title fs-5 " id="staticBackdropLabel"><i className="fa-solid fa-person-running"></i> {exercise.name.toUpperCase()}</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p><i className="fa-solid fa-star"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}> Type:</span> {exercise.type}</p>
                        <p><i className="fa-solid fa-hand-fist"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Difficulty:</span> {exercise.difficulty}</p>
                        <p><i className="fa-solid fa-dumbbell"></i> <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Equipment needed:</span> {exercise.equipment}</p>
                        <p><span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Follow these instructions:</span> {exercise.instructions}</p>

                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      )}

    </div>

  );
}
