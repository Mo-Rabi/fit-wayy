
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg2 from '../../components/assets/images/gym/bg2.jpg';
import { Link } from 'react-router-dom';
import "./Gymnastics.css"

export default function Gymnastics() {
  const [data, setData] = useState([]);
  const [completedExercises, setCompletedExercises] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const localStorageKey = 'completedExercises';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCompletedExercises = JSON.parse(localStorage.getItem(localStorageKey)) || {};
        const response = await axios.get('http://localhost:4000/getAll', {
          headers: {
            token: localStorage.getItem("token")
          }
        });
        setData(response.data.exercises);
        setIsLoading(false);
        setCompletedExercises(storedCompletedExercises);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const markExerciseAsCompleted = async (exerciseId) => {
    try {
      const response = await axios.post(`http://localhost:4000/markCorrect/${exerciseId}`);
      alert(response.data.message);
      setCompletedExercises((prevCompletedExercises) => ({
        ...prevCompletedExercises,
        [exerciseId]: true,
      }));
      localStorage.setItem(localStorageKey, JSON.stringify({ ...completedExercises, [exerciseId]: true }));
    } catch (err) {
      console.error('Failed to mark exercise as completed:', err);
    }
  };

  const handleDelete = async (exerId) => {
    const confirmDelete = window.confirm('Are you sure, that you did the exercise?');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:4000/delete/${exerId}`);
        if (response.status === 200) {
          setData((prevData) => prevData.filter((exercise) => exercise._id !== exerId));
        }
      } catch (error) {
        console.error('Error deleting exercise:', error);
      }
    }
  };

  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card bg-dark text-white">
      <img src={bg2} className="card-img" alt="Background" />
      <div className="card-img-overlay">
        <div className='d-flex justify-content-center mt-4'>
          <Link className='btn btn-outline-info d-flex mx-auto justify-content-center mt-5' to={'/bmi'} id='bm'>Check your BMI</Link>
          <Link className='btn btn-outline-warning d-flex mx-auto justify-content-center mt-5' to={'/user/profile'}>Profile</Link>
        </div>
        <div className="container mt-1">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <div className="fa fa-spinner fa-spin text-center" id="sp"></div>
            </div>
          ) : (
            <div className="row">
              {data.map((exercise, index) => (
                <div key={index} className="col-md-4">
                  <div className="card">
                    <div className="card-body" style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'cover', color: 'white' }}>
                      <h5 className="card-title"></h5>
                      <p className="card-text">
                        <strong>Day:</strong> {exercise.day}
                        <br />
                        <strong>Name:</strong> {exercise.name}
                        <br/>
                        <strong>Type:</strong> {exercise.type}
                        <br />
                        <strong>Muscle:</strong> {exercise.muscle}
                        <br />
                        <strong>Equipment:</strong> {exercise.equipment}
                        <br />
                        <button
                          className="btn btn-primary mr-2 mt-3"
                          onClick={() => openModal(exercise)}
                        >
                          View Instructions
                        </button>
                      </p>
                      <br />
                      {completedExercises[exercise._id] ? (
                        <span className="text-success checkmark mx-2" id='do'>✓ Done</span>
                      ) : (
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => markExerciseAsCompleted(exercise._id)}
                        >
                          Done
                        </button>
                      )} <br/>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleDelete(exercise._id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedExercise?.instructions}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
