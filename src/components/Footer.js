import React, { Component, useEffect, useState } from "react";
import "./UserLoginDetails.css";
import { Link } from "react-router-dom";
import logo from "./Logo.png";
import Footercss from "./Footer.css";


function Footer() {


  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  console.log(username);

  useEffect(() => {
    if(!token){
      setIsLogin(false);
      // console.log(isLogin);
    } else {
      setIsLogin(true);
      // console.log(isLogin);
    }
  });

  const handleLogout = event => {
    event.preventDefault();
    console.log("Value hit");
        localStorage.removeItem("token");
        alert("You have been logged out.");
        	//redirect user to UploadPhotos
		      window.location.href = '/FrontLogin'
      };




  return (
    <>
    {/* <logo /> */}
    
      <div style={{ marginTop: "25%"}}>
        
        <div className="MainLogo">
        <Link to="/dashboard"><img  src={logo} height={50} alt="fireSpot"/></Link>
        <p> A better way to manage better homes </p>
        </div>
        

      </div>

    </>
  );
}
export default Footer;
