import React, { Component }  from 'react';
import Dashboardcss from './Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "./UserLoginDetails";
import homeDown from "./homeDown.png";
import peopleDown from "./peopleDown.png";
import Footer from "./Footer";
import vector from "./vector.png"
import backgroundSecond from "./other_bg.png";
import rentedOut from "./rentedOut.png";
import sharedOut from "./sharedOut.png";
import shortListed from "./shortListed.png";
import yetShared from "./yetShared.png";
import PVbackground from "./Pvbackground.png";
import newImg from "./newImg.png";


function ChangeStatus(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${PVbackground})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}>Change Status</h2>
        <div className="containered form" style={{height:"110px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",border:"1px solid #DAF0EE"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                {/* for image */}
                <div>
                <img src={newImg}/>
                </div>
                {/* for title and text */}
                
                <div style={{marginTop:"-5px",margintLeft:"10px",marginBottom:"-5px"}}>
                <h5 style={{marginLeft:"10px"}} >Hexxx_1, Tower Y </h5><br/>
                <h5 style={{marginTop:"-40px"}}>Society ZZZZZZ</h5>

                </div>
            </div>
            
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}
        <div className="containered form" style={{height:"350px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                {/* for image */}
                <div>
                    <h4>Select recent status of the Home</h4>
                </div>
                {/* for title and text */}

                
                <div>
                <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"32px",width: "180px" }}>Vacant</button>
                <button className="CommonnButton" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"32px",width: "180px",marginTop:"10px" }}>Rented Out</button>
                <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"32px",width: "180px",marginTop:"10px"  }}>Delist (Owner Denied)</button>
                <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"32px",width: "180px",marginTop:"10px"  }}>Rented outside</button>

                </div>
            </div>
            
        </div>

{/* -----------------------------------------------2nd div----------------------------------------------------- */}

{/* -----------------------------------------------3rd div----------------------------------------------------- */}
        <div className="containered form" style={{height:"400px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                {/* for image */}
                <div>
                Select recent status of the Home
                </div>
                {/* for title and text */}
               
                <div style={{marginTop:"20px"}}>
                <label for="map" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Select Tenanat Name</label>
            <input
              type="text"
              id="map"
              name="map"
            //   value={formData.map}
            //   onChange={handleChange}
              placeholder="Google Maps Plug-in"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10pxpx",
                border: "1px solid #52796F",
                
              }}
            />

<label for="map" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Select Rent Amaount (Rent + Maintenance)</label>
            <input
              type="text"
              id="map"
              name="map"
            //   value={formData.map}
            //   onChange={handleChange}
              placeholder="Google Maps Plug-in"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10pxpx",
                border: "1px solid #52796F",
                
              }}
            />

<label for="map" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Enter Tenant Contact Number</label>
            <input
              type="text"
              id="map"
              name="map"
            //   value={formData.map}
            //   onChange={handleChange}
              placeholder="Google Maps Plug-in"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10pxpx",
                border: "1px solid #52796F",
                
              }}
            />

            <label for="map" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Agreement For</label>
            <input
              type="text"
              id="map"
              name="map"
            //   value={formData.map}
            //   onChange={handleChange}
              placeholder="Google Maps Plug-in"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10pxpx",
                border: "1px solid #52796F",
                
              }}
            />
                </div>
                <button className="CommonnButton" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"32px",width: "100px",marginTop:"10px" }}>Save<img className="vectorSignIn" src={vector} style={{marginTop:"-30px"}} alt="fireSpot"/></button>
            </div>
            
        </div>
        {/* -----------------------------------------------3rd div----------------------------------------------------- */}
         {/* BODY */}
         <h4>OR</h4>
         <button className="CommonnButton" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"32px",width: "220px",marginTop:"10px" }}>Edit Property Details<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>

        

        

            <Footer/>
        </div>
        </>
    );
}
export default ChangeStatus;