import React, { Component, useState, useEffect } from "react";
import FronLogin from "./FrontLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/RegisterLoginUser/vector.png"


function FrontLogin() {
  //States
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [data, setData] = useState(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    if (emailRegex.test(formData.email)) {
      // alert('Valid email address');
    } else {
      alert('Invalid email address');
    }
  };


  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	  };
	
	  const handleSubmit = event => {
		event.preventDefault();
		axios.post('http://localhost:5000/backend/login', formData)
		  .then(response => {
			console.log(response.data);
      setData(response.data);

      const token  =  response.data.token;
      const name  =  response.data.name;
 
       //set JWT token to local
       localStorage.setItem("token", token);
       localStorage.setItem("username", name);
 
       //set token to axios common header
       //  setAuthToken(token);


			alert("You're Logged In");
      //redirect user to Dashboard
      window.location.href = '/dashboard'
	
		  })
		  .catch(error => {
			console.log(error);
      alert(error.response.data.error);
			// handle the error
		  });
	  };

    console.log(data);

     
      // const styles = {
      //   backgroundColor:"white",
      //   padding: "10px",
      //   borderRadius: "5px",
      //   border: "1px solid grey",
      //   boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
      // };
    
     
   
    

  return (
    <>
      <div className="login-page" >
        <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} 
        >
          
          <h3>Agent Sign In</h3>
          
          <form onSubmit={handleSubmit} className="login-form">
            <label for="email"  style={{ textAlign:"left", display: "block", marginBottom: "0.5rem",fontWeight: "300", float: "left" }}>Enter Email ID</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              // placeholder="username"
              onBlur={validateEmail}
              style={{  backgroundColor:"white",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #52796F",
              boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
              }}
            />

            {/* phone */}
            <label for="phone"  style={{ textAlign:"left", display: "block", marginBottom: "0.5rem",fontWeight: "300", float: "left" }}>Mobile Number</label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              style={{  backgroundColor:"white",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #52796F",
              boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)" }}
            ></input>

            {/* Password */}
            <label for="password"  style={{ textAlign:"left", display: "block", marginBottom: "0.5rem",fontWeight: "300"}}>Enter Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              // placeholder="password"
              style={{  backgroundColor:"white",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #52796F",
              boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)" }}
              
            ></input>

 {/* Submit */}
 
            

            <Link to="/Resetpassword">
              {" "}
              <p class="message">
                Forgot password? <u style={{ color: "#52796F" }}>Click here</u>
              </p>{" "}
            </Link>

            
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "35%" }}>Sign In <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>

            
            <Footer/>
          </form>
          <br />
          
        </div>
      </div>
    </>
  );
}
export default FrontLogin;
