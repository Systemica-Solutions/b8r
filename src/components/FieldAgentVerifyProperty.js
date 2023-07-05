import React, { Component }  from 'react';

import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "./UserLoginDetails";
import homeDown from "./homeDown.png";
import peopleDown from "./peopleDown.png";
import Footer from "./Footer";
import vector from "./vector.png"




function FieldAgentVerifyProperty(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat', backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}>Verification</h2>

            <h3 style={{marginBottom:"-10px",fontSize:"30px"}}>Fuji 802, Pavillion SJR</h3>

        <div className="containered form" style={{height:"570px", borderRadius:"30px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",background:"linear-gradient(180deg, #F5F5F5 0%, rgba(245, 245, 245, 0) 100%)"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                {/* for image */}
                <div>
                <label for="map" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Select Map Location</label>
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

            {/* house configuration */}
            <label for="house_conf" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>What is the house configuration? </label>
            <select
              id="house_conf"
              name="house_conf"
              placeholder="Select from the drop down"
            //   value={formData.house_conf}
            //   onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #52796F",
               
              }}
            ></select>
             <label for="house_num" style={{textAlign: "left",display: "block" ,marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>
              House Number/ Flat Number/ Name
            </label>
            <input
              type=""
              id="house_num"
            //   value={formData.house_num}
            //   onChange={handleChange}
              name="house_num"
              placeholder="Text Input (Do not Enter Block Number"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #52796F",
                
              }}
            ></input>


<label for="society_type" style={{textAlign: "left",display: "block" ,marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>
              What is the Society?
            </label>
            <input
              type=""
              id="society_type"
            //   value={formData.society_type}
            //   onChange={handleChange}
              name="society_type"
              placeholder="for eg(Oceanus Triton or Sushant Estate)"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #52796F",
                
              }}
            ></input>

            <label for="address" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Area/Locality</label>
            <input
              type="text"
              id="area"
              name="area"
            //   value={formData.area}
            //   onChange={handleChange}
              placeholder="Area/Locality"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #52796F",
                
              }}
            ></input>
                </div>
                {/* for title and text */}
               
                <div>

                </div>
            </div>
            
        </div>
         {/* BODY */}
        

        <div class="buttonBackNext" style={{marginTop:"50px"}}>
        <button className="CommonnButton" style={{color:"black",  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%", marginRight:"20px" }}>Back<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
        <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Next<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
        </div>
       

            <Footer/>
        </div>
        </>
    );
}
export default FieldAgentVerifyProperty;