import React, { Component }  from 'react';
import Dashboardcss from './Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from ".//UserLoginDetails";
import homeDown from "./homeDown.png";
import peopleDown from "./peopleDown.png";
import Footer from "./Footer";
import vector from "./vector.png"
import backgroundSecond from "./other_bg.png";
import rentedOut from "./rentedOut.png";
import sharedOut from "./sharedOut.png";
import shortListed from "./shortListed.png";
import yetShared from "./yetShared.png";
import tenantimg from "./tenantimg.png";
import imgdown from "./imgdown.png";


function Dashboard(){


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
            <h2 style={{color:"#52796F"}}>Welcome</h2>
            <h3 style={{textAlign:"left"}}>Hey, Prashant</h3>
            <h5 style={{textAlign:"left"}}>Your agent, Mr. Rohit, has shared 4  awesome 
            <br/>properties  with you!<br/>
               
            Check them out and pick which you like.</h5>
        <div className="containered form" style={{height:"300px", borderRadius:"5px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",background:"#DAF0EE"}}>
            <img src={tenantimg} />
            <img src={imgdown} styles={{height:"40px"}}/>
            <div>
                <h5></h5>
            </div>
            
        </div>
         {/* BODY */}
      
        

            <Footer/>
        </div>
        </>
    );
}
export default Dashboard;