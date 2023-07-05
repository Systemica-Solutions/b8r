import React, { Component, useState, useEffect } from "react";
import "./UserLoginDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";
import vector from "./vector.png"
import Footer from "./Footer";
import backgroundthird from "./other_bg.png";

function EnterOTP( props ) {

  const queryParameters = new URLSearchParams(window.location.search)
  const OTP_SESSION = queryParameters.get("sessionId")
  const phone = queryParameters.get("phone")

  // const url = props.location.search; // returns the URL query String
  // const params = new URLSearchParams(url.search); 

  // const OTP_SESSION = params.get('sessionId');
  console.log(phone);
  // const OTP_SESSION = "123456";

  // const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    enter_otp: "",
    password: "",
    c_password: "",
    phone : phone
   
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));


  };
 

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData["enter_otp"]);
    const enter_otp = formData["enter_otp"];

    console.log(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OTP_SESSION}/${enter_otp}`);
    try {
    axios
      .get(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OTP_SESSION}/${enter_otp}`, formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        // do something with the response
        // const token = response.data.token;
        // const username = response.data.name;

        const OTP_CHECK = response.data.Details;
          alert(OTP_CHECK);
          console.log(OTP_CHECK);
        //set JWT token to local
        // localStorage.setItem("token", token);
        // localStorage.setItem("username", username);

        //set token to axios common header
        //  setAuthToken(token);



        axios
        .put('http://localhost:5000/backend/updatepassword', formData)
        .then((response) => {
          console.log(response.data);
          alert(response.data);

          alert("Your Password has been Updated!");

        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
        //redirect user to Dashboard
        window.location.href = "/FrontLogin";
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
    } catch (error) {
      console.log("ASYNC ERROR:".error);
    }


  };

  return (
    <>

<div className="startPage login-page" 
style={{ 
      backgroundImage: `url("")` 
    }} >


 

     
      <div className="login-page">
        <div
          className="form"
          style={{ borderRadius: "16px", marginTop: "40%",borderRadius: "16px", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundthird})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}
        >
          {/* <h2>Agent Sign-up</h2> */}

          <form onSubmit={handleSubmit} className="login-form">
           

           
            <h3>Reset Password</h3>


            <label htmlFor="enter_otp" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Enter OTP (Check Phone)
            </label>
            <input
              type="text"
              id="enter_otp"
              value={formData.enter_otp}
              onChange={handleChange}
              name="enter_otp"
              // placeholder="full name"
              required
            />
             <label htmlFor="password" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Enter New password
            </label>
             <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              // placeholder="password"
              required
            ></input>
            

            
            <label htmlFor="c_password" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Confirm New password
            </label>
             <input
              type="c_password"
              id="c_password"
              value={formData.c_password}
              onChange={handleChange}
              name="c_password"
              // placeholder="password"
              required
            ></input>
            

        

            {/* Submit */}
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Set Password <img className="vectorSignUp" src={vector} alt="fireSpot"/></button>
            <Footer/>
          </form>
         

          <br />
        </div>
      </div>

      </div>
    </>
  );
}
export default EnterOTP;
