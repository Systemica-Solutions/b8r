import React, { Component, useState, useEffect } from "react";
import Signp from "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import vector from "../Assets/Images/RegisterLoginUser/vector.png"
import bgm from "../Assets/Images/RegisterLoginUser/bg_img.png";
import background from "../Assets/Images/RegisterLoginUser/main_bg.png";

import Footer from "../Footer";


function SignUp() {
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
    c_password: "",
    icode: "",
    phone: "",
    status: "true",
   
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    // phone: ""
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

  //Validation
    
    let inputError = {
      email: "",
      password: "",
      c_password: "",
      phone: "",
    };

    if (!formData.email && !formData.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      });
      return
    }

    if (!formData.email) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return
    }

    if (formData.c_password !== formData.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formData.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return
    }

    setFormError(inputError);

    console.log("Submit Clicked");

    
    axios
      .post("http://localhost:5000/backend/posts/", formData)
      .then((response) => {
        console.log(response.data);
        // do something with the response
        const token = response.data.token;
        const username = response.data.name;

        //set JWT token to local
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        //set token to axios common header
        //  setAuthToken(token);

        alert("You're Registerd!");
        //redirect user to Dashboard
        window.location.href = "/FrontLogin";
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
  };

  return (
    <>

<div className="startPage ">




  

     
      <div className="" >
        <div
          className="form"
          style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} 
        >
          {/* <h2>Agent Sign-up</h2> */}

          <form onSubmit={handleSubmit} className="login-form">
          
            
            <div className="header" >
            <img  src={bgm} height={163} alt="headImage"/>
            
            </div>

            <div className="SignInContainer" style={{ backgroundColor: "#f0fbf7", marginTop:"10%" }}>

              <p className="para" >Already a member?</p>
              <Link to="/FrontLogin"><button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "100%",  fontWeight: "#517970" , textAlign: "left" }}>Sign In<img className="vector" src={vector} alt="fireSpot"/>
              </button></Link>
      
              </div>

            <Link to="/FrontLogin">
            {" "}
            <p class="message">
              New Here? <a href="#"> Create new account</a>
            </p>{" "}
          </Link>

          {/* <form onSubmit={handleSubmit} > */}
            <label htmlFor="email" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem",fontWeight: "300", float: "left" }}>
            Enter email-ID
            </label>

            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              // placeholder="ema"
              required
            />
            <p className="error-message">{formError.email}</p>


            {/* Password */}
            {/* <label for="password">Password</label> */}
           
            {/* First Name */}
            {/* <label for="name">First Name</label> */}
            <label htmlFor="full_name" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Enter your full name
            </label>
            <input
              type="text"
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              name="full_name"
              // placeholder="full name"
              required
            />
             <label htmlFor="password" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Enter password
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
            <p className="error-message">{formError.password}</p>

            {/* Last Name */}
            {/* <label for="name">Last Name</label> */}
            {/* <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              name="last_name"
              placeholder="last name"
            /> */}

            {/* Phone Number */}
            {/* <label for="phone">Contact Number</label> */}
            <label htmlFor="c_password" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Confirm password
            </label>
             <input
              type="password"
              id="c_password"
              value={formData.c_password}
              onChange={handleChange}
              name="c_password"
              // placeholder="password"
              required
            ></input>
            <p className="error-message">{formError.c_password}</p>

            <label htmlFor="icode" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem", fontWeight: "300" }}>
            Invitation Code
            </label>

            <input
              type="text"
              id="icode"
              value={formData.registration_number}
              onChange={handleChange}
              name="icode"
              // placeholder="invitation code"
            />

            <label htmlFor="phone" style={{ textAlign:"left", display: "block", marginBottom: "0.5rem",fontWeight: "300" }}>
            Enter mobile number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              // placeholder="contact number"
              required
            />
           
           

            {/* Submit */}
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Create Account <img className="vectorSignUp" src={vector} alt="fireSpot"/></button>
            
            <Footer/>
          </form>

          <br />
        </div>
      

      </div>
      </div>

      {/* </div> */}
    </>
  );
}
export default SignUp;
