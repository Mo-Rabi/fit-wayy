import React, { useState, useRef } from "react";
import axios from "axios";
import bg from "../assets/images/gym/bg2.jpg";

const UploadForm = () => {
  console.log("Inside Cloudinary child component");
  const api_key = "691199169282346";
  const cloud_name = "dequqpbe8";
  const fileInput = useRef();
  const [progress, setProgress] = useState(0); // Initialize progress state

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Inside handle submit");
    const data = new FormData();
    data.append("file", fileInput.current.files[0]);
    data.append("api_key", api_key);
    data.append("upload_preset", "default-preset");
    console.log("Data", data);

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          const progressValue = (e.loaded / e.total) * 100;
          setProgress(progressValue.toFixed()); // Update progress state
          console.log(progressValue);
        },
      }
    );

    console.log("Cloudinary Response", cloudinaryResponse);

    const picture = cloudinaryResponse.data.secure_url;
    console.log("Photo", picture);

    const token = localStorage.getItem("token");
    axios.patch("http://localhost:4000/trainer/edit", { picture, token });
  };

  return (
    <div className="row" style={{ background: `url(${bg})` }}>
      <div className="container align-items-center">
        <form
          id="upload-form"
          className="p-5 mt-5 w-50"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            id="file-field"
            ref={fileInput}
            accept="image/*"
            required
            className="btn btn-outline-primary mt-2 ms-2"
          />
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary mt-2 ms-2"
          />
          <div className="progress mt-2">
            <div
              className="progress-bar position-relative bg-primary"
              style={{ width: `${progress}%` }}
            >
              <div className="progress-value d-block text-dark h6 mt-2">
                {progress == 100 ? "Upload Successful" : `${progress}%`}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
