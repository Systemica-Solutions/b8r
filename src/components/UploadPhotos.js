import React, { Component, useState } from "react";

import { Link } from "react-router-dom";
import UploadPhotoscss from "./UploadPhotos.css";
import axios from "axios";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

function UploadPhotos() {
  const [formData, setFormData] = useState({
    photos: "",
  });

  //API REQUEST
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(formData);


  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/addlandlord", formData, axiosConfig)
      .then((response) => {
        console.log(response.data);
        alert("Your data has been submitted");
        // do something with the response
        //redirect user to UploadPhotos
        window.location.href = "/UploadPhotos";
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
  };

  return (
    <div>
   
      <div className="button-container form" style={{ borderRadius: "16px"}} >
        
        {/* <button>Upload all photos</button> */}
        <br></br>
        <div className="photobtn">
        <h3>Upload Photos</h3>

        <Stack direction="row" alignItems="center">
          <Button className="myBtn" onSubmit={handleSubmit} variant="contained" component="label" style={{  fontWeight: "900", backgroundColor: "#3B413C", marginLeft: "20px" }}>
            Upload All Photos
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <IconButton
            color="secondary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            {/* <PhotoCamera /> */}
          </IconButton>
        </Stack>
        </div>

        {/* <Link to="/UploadPhoto2">
          {" "}
          <button>Next</button>
        </Link> */}
        <br></br>
      </div>
    </div>
  );
}
export default UploadPhotos;
