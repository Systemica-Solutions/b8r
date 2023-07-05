import React, { Component, useState } from "react";

import { Link } from "react-router-dom";
import UploadPhotoscss from "./UploadPhotos.css";
import axios from "axios";
import vector from "./vector.png"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import uploadImg from "./uploadImg.png";

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

import Footer from "./Footer";

function UploadPhotos() {
  const [formData, setFormData] = useState({
    photos: "",
  });

  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  //API REQUEST
  const token = localStorage.getItem("token");
  console.log(token);
  // console.log(formData);

    const getUploadParams = ({ meta }) => {
      const url = 'https://httpbin.org/post'
      return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    }
  
    const handleChangeStatus = ({ meta }, status) => {
      console.log(status)
      // console.log(meta.name);

    }
  
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))

      // console.log(f.meta.name);
      // files.map(f => f.meta
    axios
      .post("http://localhost:5000/backend/addlandlord", selectedFile, axiosConfig)
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


      allFiles.forEach(f => f.remove())


    }
  

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  // const changeHandler = (event) => {
  //   // console.log(event.target.files[0]);
  //   console.log(event.target.files[0].name);
	// 	setSelectedFile(event.target.files[0].name);

	// 	// setIsFilePicked(true);
	// };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log(selectedFile);
  
  //   axios
  //     .post("http://localhost:5000/backend/addlandlord", selectedFile, axiosConfig)
  //     .then((response) => {
  //       console.log(response.data);
  //       alert("Your data has been submitted");
  //       // do something with the response
  //       //redirect user to UploadPhotos
  //       window.location.href = "/UploadPhotos";
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // handle the error
  //     });
  // };

  return (
    <div>
   

        
   <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />

      <div className="button-container form" style={{ borderRadius: "16px"}} >


      <form className="login-form"  onSubmit={handleSubmit} enctype="multipart/form-data">
        
        {/* <button>Upload all photos</button> */}
        <br></br>
        <div className="photobtn">
        <h2 style={{color:" #52796F"}}>Upload Photos</h2>
        <div style={{borderRadius:"5px",border:"1px solid #DAF0EE",width:"344px",height:"711px",background:"linear-gradient(180deg, #DAF0EE 0%, rgba(245, 245, 245, 0) 100%)", borderRadius:"30px"}}>
        <h4 style={{color:"#52796F",textAlign:"left",marginLeft:"10px"}}>Upload from Gallery*</h4>
        <div style={{height:"292px",width:"301px",border:"1px dashed #000000",borderRadius:"30px",background:"rgba(217, 217, 217, 0.47)", marginLeft:"22px",marginTop:"50px"}}>
        <img src={uploadImg} alt="Icon description" style={{width:"40px",height:"40px",marginTop:"50px",marginLeft:"10px"}} /><br/>
          <label>Drop files here</label><br/>
          <label>or</label><br/>
          <label>Click below</label>
        <Stack direction="row" alignItems="center">
          <Button className="CommonnButton" onSubmit={handleSubmit} variant="contained" component="label"  style={{fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "65%" }}>
            Upload Photos
           
{/* 
            <input hidden accept="image/*" type="file" name="file" onChange={changeHandler} multiple/> */}

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
        <h5 style={{marginLeft:"19px",marginBottom:"60px"}}>Note: Only JPG, JPEG, and PNG. The larger image will be cropped.</h5>
        <button className="CommonnButton" style={{fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Save & Complete <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
        </div>
        
        </div>
        </form>
        
        <Footer/>
      </div>
     
    </div>
  );
}

{/* <ImageAudioVideo /> */}
export default UploadPhotos;
