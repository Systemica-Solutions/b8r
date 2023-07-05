import React, { Component }  from 'react';
// import Dashboardcss from '../Dashboard.css';
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import UserLoginDetails from "../UserLoginDetails";
// import homeDown from "./homeDown.png";
// import peopleDown from "./peopleDown.png";
import Footer from "../Footer";
import vector from "../vector.png"
import backgroundSecond from "../other_bg.png";
// import rentedOut from "./rentedOut.png";
// import sharedOut from "../Assets/Images/FieldAgent/sharedOut.png";
// import shortListed from "../Assets/Images/FieldAgent/shortListed.png";
// import yetShared from "../Assets/Images/FieldAgent/yetShared.png";
// import YashImg from "./Yash.png";
import House from "../Assets/Images/FieldAgent/House.png";


function FieldAgentHomeN(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}> Field Agent Home</h2>
        <div className="containered form" style={{height:"150px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                {/* for image */}
                <div>
                    {/* <img src={YashImg} alt="Yash img" style={{height:"100px",marginTop:"20px"}}/> */}
                </div>
                {/* for title and text */}
                <div>

                
                <label>Hey Yash,</label><br/>
                <h5>Please Complete all<br/> the properties at the earliest</h5>
                </div>
                <div>

                </div>
            </div>
            
        </div>
         {/* BODY */}
                    {/* for icon */}
                    <div>
                        <img  src={House} style={{height:"50px",borderRadius:"25px 25px 25px 25px"}}/>
                    </div>
                {/* for div one */}
                {/* <div style={{width:"213px",height:"251px",background:"#FFFFF"}}>

                </div> */}
                {/* for button */}
                <div>
                <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "60%" }}>Check & Complete <img className="vectorSignIn" src={vector} style={{marginTop:"-22px"}} alt="fireSpot"/></button>
                </div>

                {/* for div two */}
                <div>

                </div>
                

            

        

            <Footer/>
        </div>
        </>
    );
}
export default FieldAgentHomeN;