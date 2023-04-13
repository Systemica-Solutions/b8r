import React, { Component, useState, useEffect } from "react";
import FronLogin from "./FrontLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";


function FrontLogin() {
  //States
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [data, setData] = useState(null);

  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	  };
	
	  const handleSubmit = event => {
		event.preventDefault();
		axios.post('http://localhost:5000/login', formData)
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
    <div className="fulldiv">
      <div className="login-page" >
        <div class="form" style={{ borderRadius: "16px" }}>
          <form onSubmit={handleSubmit} className="login-form">
            {/* <label for="name">User Name</label> */}
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              placeholder="username"
              style={{  backgroundColor:"white",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid grey",
              boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
              }}
            />

            {/* Password */}
            {/* <label for="password">Password</label> */}
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="password"
              style={{  backgroundColor:"white",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid grey",
              boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)" }}
              
            ></input>

            <button style={{  fontWeight: "900" }}>login</button>
            <Link to="/SignUp">
              {" "}
              <p class="message">
                Not registered? <a href="#"> Create an account</a>
              </p>{" "}
            </Link>
          </form>
          <br />
          <div className="GoogleSignIn"></div>
        </div>
      </div>
    </div>
  );
}
export default FrontLogin;
