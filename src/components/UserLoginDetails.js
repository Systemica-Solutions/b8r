import React, { Component, useEffect, useState } from "react";
import "./UserLoginDetails.css";
import { Link } from "react-router-dom";
import logo from "./Logo.png"


function UserLoginDetails() {


  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  console.log(username);

  useEffect(() => {
    if(!token){
      setIsLogin(false);
      console.log(isLogin);
    } else {
      setIsLogin(true);
      console.log(isLogin);
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
    
      <div className="UserLoggedIn">
        
        <div className="MainLogo">
        <Link to="/dashboard"><img  src={logo} height={50} alt="fireSpot"/></Link>
        </div>
        
        <div>

        <h3>

      <img style={{ marginBottom: '-24px' }}
         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZNJREFUaEPtmA1uwyAMhd2TrTtZt5O1PdmqpwUJTQH/PGeECqSoSAXiz34GnItM3i6T2y8LYHQEj4jAVUTwfGxw6H9v/YeI4Elr2QBfInJTrAMMxqW0LAB4GYbj19o+M6KRBfBjtboaBykBgmoZABbZtIyk5cQCQDJ3yoW/UQgnNgvAeL9wU1E4AwCVCyxAJHn/Km4oAPTv2Tpb6RJ2ZHjiZkkGwPQ5MBRg+m0USmK2Usr7eDmbAyUpo7lAv59eoLoye05kbJ3wfvgELp7LAijrWeREy6bei7MBsHYpaNDHFbt4+bn1aa8fDUDe7XzTj4iAzwJy9AIgHUhPZyOw9wXCYlRaYkcBIkW8BhbaXr0ARxheg7khPAAZFzctCuV/c51sBfhP410QVoCM0tHq" />

        
          {isLogin? (
            <button className="logbtn" onClick={handleLogout}>{username}, Logout</button>
          )
          : 
          <Link to ="/FrontLogin"><button className="logbtn" style={{  fontWeight: "900" }}> Login </button></Link> }
           
        </h3>
        </div>

      </div>

    </>
  );
}
export default UserLoginDetails;
