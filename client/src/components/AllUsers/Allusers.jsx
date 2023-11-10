// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import './Allusers.css';
// import bg1 from '../../components/assets/images/gym/bg2.jpg';
// import bg2 from "../../components/assets/images/gym/09.jpg"

// export default function Allusers() {
//   const [Users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUserEmail, setSelectedUserEmail] = useState('');

//   const [email, setEmail] = useState(""); // Added email state
//   const [userName, setUserName] = useState("");
//   const [day, setDay] = useState("");
//   const [name, setName] = useState("");
//   const [type, setType] = useState("");
//   const [muscle, setMuscle] = useState("");
//   const [equipment, setEquipment] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [instructions, setInstructions] = useState("");

//   async function addProduct() {
//     const data = {
//       email: selectedUserEmail,
//       userName,
//       day,
//       name,
//       type,
//       muscle,
//       equipment,
//       difficulty,
//       instructions,
//     };

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     };

//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:4000/addExer', requestOptions);
//       if (response.ok) {
//         const resData = await response.json();
//         setIsLoading(false);
//         alert(resData.message);
//         // Clear input fields after successfully adding an exercise
//         setEmail("");
//         setUserName("");
//         setDay("");
//         setName("");
//         setType("");
//         setMuscle("");
//         setEquipment("");
//         setDifficulty("");
//         setInstructions("");
//         closeModal(); // Optionally, close the modal
//       } else {
//         const responseData = await response.json();
//         setIsLoading(false);
//         alert(`Error: ${responseData.message}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get('http://localhost:4000/users/allUsers');
//         setUsers(response.data.getAllUsers);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const openModal = (userEmail) => {
//     setSelectedUserEmail(userEmail);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedUserEmail('');
//     setShowModal(false);
//   };

//   return (
//     <div style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', minHeight: '100vh' }}>
//       {isLoading ? (
//         <div className='fa fa-spinner fa-spin' id='sp'></div>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {Users.map((ele) => (
//             <div className="col-md-4" key={ele.id}>
//               <div className="card h-100 border">
//                 <img src={bg2} className="card-img-top" alt="..." />
//                 <div className="card-body">
//                   <h5 className="card-title">{ele.firstName} {ele.lastName}</h5>
//                   <p className="card-text">{ele.email}</p>
//                   <Button onClick={() => openModal(ele.email)}>Add Exercise</Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <Modal show={showModal} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Exercise</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Control type="email" placeholder="Email" value={selectedUserEmail} readOnly /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type="text" placeholder="Day" onChange={(e) => setDay(e.target.value)} /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type="text" placeholder="Type" onChange={(e) => setType(e.target.value)} /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type="text" placeholder="Muscle" onChange={(e) => setMuscle(e.target.value)} /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type="text" placeholder="Equipment" onChange={(e) => setEquipment(e.target.value)} /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type="text" placeholder="Difficulty" onChange={(e) => setDifficulty(e.target.value)} /><br/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Instructions</Form.Label>
//               <Form.Control as="textarea" rows={4} placeholder="Instructions" onChange={(e) => setInstructions(e.target.value)} /><br/>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={addProduct}>
//             Submit Exercise
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import './Allusers.css';
import bg1 from '../../components/assets/images/gym/bg2.jpg';
import bg2 from "../../components/assets/images/gym/09.jpg"

export default function Allusers() {
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');

  const [email, setEmail] = useState(""); // Added email state
  const [userName, setUserName] = useState("");
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");

  async function addProduct() {
    const data = {
      email: selectedUserEmail,
      userName,
      day,
      name,
      type,
      muscle,
      equipment,
      difficulty,
      instructions,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/addExer', requestOptions);
      if (response.ok) {
        const resData = await response.json();
        setIsLoading(false);
        alert(resData.message);
        setEmail("");
        setUserName("");
        setDay("");
        setName("");
        setType("");
        setMuscle("");
        setEquipment("");
        setDifficulty("");
        setInstructions("");
        closeModal();
      } else {
        const responseData = await response.json();
        setIsLoading(false);
        alert(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:4000/users/allUsers');
        setUsers(response.data.getAllUsers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (userEmail) => {
    setSelectedUserEmail(userEmail);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUserEmail('');
    setShowModal(false);
  };

  return (
    <div style={{ backgroundImage: `url(${bg1})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      {isLoading ? (
        <div className='fa fa-spinner fa-spin' id='sp'></div>
      ) : (
        <Container id='cont'>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {Users.map((ele) => (
            <div className="col-md-4" key={ele.id}>
              <div className="card h-100 border">
                <img src={bg2} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{ele.firstName} {ele.lastName}</h5>
                  <p className="card-text">{ele.email}</p>
                  <Button onClick={() => openModal(ele.email)}>Add Exercise</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </Container>
      )}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control type="email" placeholder="Email" value={selectedUserEmail} readOnly /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Day" onChange={(e) => setDay(e.target.value)} /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Type" onChange={(e) => setType(e.target.value)} /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Muscle" onChange={(e) => setMuscle(e.target.value)} /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Equipment" onChange={(e) => setEquipment(e.target.value)} /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" placeholder="Difficulty" onChange={(e) => setDifficulty(e.target.value)} /><br/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Instructions</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Instructions" onChange={(e) => setInstructions(e.target.value)} /><br/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Submit Exercise
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
