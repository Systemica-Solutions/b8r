import React, { Component }  from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Footer';
import axios from "axios";
import vector from "../vector.png"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";


function UploadPhotos3(){
    return(
       <div className="button-container form" style={{height:"1000px",width:"350px",background:"#FFFFFF", marginLeft:"350px",borderRadius:"16px"}}>
         <h2 style={{color:" #52796F"}}>Upload Photos</h2>
         <div style={{borderRadius:"5px",border:"1px solid #DAF0EE",width:"344px",height:"711px",background:"linear-gradient(180deg, #DAF0EE 0%, rgba(245, 245, 245, 0) 100%)", borderRadius:"30px"}}>
         <h4 style={{color:"#52796F",textAlign:"left",marginLeft:"10px"}}>Upload from Gallery*</h4>
         <div style={{height:"292px",width:"301px",border:"1px dashed #000000",borderRadius:"30px",background:"rgba(217, 217, 217, 0.47)", marginLeft:"22px",marginTop:"50px"}}>

         </div>
         <h5 style={{marginLeft:"19px",marginBottom:"60px"}}>Note: Only JPG, JPEG, and PNG. The larger image will be cropped.</h5>
         <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
         <Link to="/uploadphotos"><button className="CommonnButton" style={{fontWeight: "1000" , textAlign: "left", width: "35%",height:"12%"}}>Add<br/> More<br/> Photos<img className="vectorSignIn" src={vector} alt="fireSpot"/></button></Link>
        <button className="CommonnButton" style={{fontWeight: "1000" , textAlign: "centre", width: "35%",marginTop:"20px"}}>Submit<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
         </div>
        
         </div>
       
   
      
        
        <Footer/>
        </div>
     
    );
}
export default UploadPhotos3;