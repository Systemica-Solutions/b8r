import React, { Component, useState, useEffect } from "react";
import ResetPasswordcss from "./ResetPassword.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/RegisterLoginUser/vector.png"

function ResetPassword() {
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    phone: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const phone = formData["phone"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData["phone"]);
    const phone = formData["phone"];
    // console.log(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`);
    try {
    axios
      .get(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`, formData)
      .then((response) => {
        console.log(response.data);
        // do something with the response
        // const token = response.data.token;
      
        const OTP_SESSION = response.data.Details;

        // //set JWT token to local
        // localStorage.setItem("token", token);
        // localStorage.setItem("username", username);

        //set token to axios common header
        //  setAuthToken(token);

        alert("OTP has been send!");
        //redirect user to Dashboard
        window.location.href = `/EnterOTP?sessionId=${OTP_SESSION}&phone=${phone}`;
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
    } catch (error) {
      console.log("ASYNC ERROR:". error);
    }
  };

  return (
    <>

<div className="login-page" >
        <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} 
        >
          
          <h4 style={{marginTop: "20%"}}>Reset Password Link</h4>

          <form onSubmit={handleSubmit} className="login-form">
           
           

            <label htmlFor="phone" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem",fontWeight: "300", float: "left", marginTop: "10%" }}>
            Enter Phone Number
            </label>

            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              
              required
            />
         
           
           
           
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "80%", marginBottom: "60%"}}>Send Password Reset Link<img className="vectorResetPassword" src={vector} alt="fireSpot"/></button>
            <Footer/>
          </form>
         

          <br />
        </div>
      </div>


    </>
  );
}
export default ResetPassword;
