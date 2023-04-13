import React, { Component, useState, useEffect  }  from 'react';
import Signp from "./SignUp.css";
import {  Link } from "react-router-dom";
import axios from 'axios';


function SignUp(){
  

  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    status: 'true',
    agent_type: '',
    registration_number: ''
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log()
    axios.post('http://localhost:5000/posts/', formData)
      .then(response => {
        console.log(response.data);
        // do something with the response
        const token  =  response.data.token;
        const username  =  response.data.token;
   
         //set JWT token to local
         localStorage.setItem("token", token);
         localStorage.setItem("username", username);
   
         //set token to axios common header
         //  setAuthToken(token);
  
  
        alert("You're Registerd!");
        //redirect user to Dashboard
        window.location.href = '/dashboard'
      })
      .catch(error => {
        console.log(error);
        // handle the error
      });
  };
  

  


    return(
        <>

          
      <div>
      {/* {data.map(item => (
        <div key={item.id}>{item.name}</div>
        ))} */}
        </div>
    <div className="login-page">
  <div className="form" style={{ borderRadius: "16px", marginTop: "10%" }}>
  <h2>Agent Sign-up</h2>

    <form onSubmit = { handleSubmit } className="login-form" >
    {/* <label for="name">User Name</label> */}
                <input type="text" id="username" value={formData.username} onChange={handleChange} name="username" placeholder="username" required />
                {/* Email */}
                {/* <label for="name">Email</label> */}
                <input type="email" id="email" value={formData.email} onChange={handleChange} name="email" placeholder="email" required />
                {/* Password */}
                {/* <label for="password">Password</label> */}
                <input type="password" id="password" value={formData.password} onChange={handleChange} name="password" placeholder="password" required></input>
                {/* First Name */}
                {/* <label for="name">First Name</label> */}
                <input type="text" id="first_name" value={formData.first_name} onChange={handleChange} name="first_name" placeholder="first name" required />
                {/* Last Name */}
                {/* <label for="name">Last Name</label> */}
                <input type="text" id="last_name" value={formData.last_name} onChange={handleChange} name="last_name" placeholder="last name" />
            
                {/* Phone Number */}
                {/* <label for="phone">Contact Number</label> */}
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="contact number" required/>
                {/* Agent Type */}
                {/* <label for="agent-type">Agent Type</label> */}
                <select id="agent_type" value={formData.agent_type} onChange={handleChange} name="agent_type" required>
                
                <option value="">Select agent type</option>
                <option value="independent">Independent Agent</option>
                <option value="brokerage">Brokerage Firm</option>
                </select>
                {/* Registration Number */}

                {/* <label for="registration-number">Registration Number</label> */}
                <input type="text" id="registration_number"  value={formData.registration_number} onChange={handleChange} name="registration_number" placeholder="registration number" />

                {/* Submit */}
                <button style={{  fontWeight: "900" }}>Register</button> 
    </form>
    <Link to="/FrontLogin">  <p class="message">Already registered? <a href="#"> Sign In</a></p>  </Link>

    <br/>

  </div>
</div>
           
        </>

        

    )
}
export default SignUp;