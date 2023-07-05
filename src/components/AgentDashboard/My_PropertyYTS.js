import React, { Component }  from 'react';
import Dashboardcss from '../Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/AgentDashboard/homeDown.png";
import peopleDown from "../Assets/Images/AgentDashboard/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Images/AgentDashboard/vector.png"
import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import rentedOut from "../Assets/Images/AgentDashboard/rentedOut.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortListed from "../Assets/Images/AgentDashboard/shortListed.png";
import yetShared from "../Assets/Images/AgentDashboard/yetShared.png";
import PVbackground from "../Assets/Images/AgentDashboard/Pvbackground.png";
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import noImg from "../Assets/Images/AgentDashboard/noImg.png";


function My_PropertyYTS(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${PVbackground})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}>My Properties</h2>
        

            
            {/* -------------------------------button---------------------------------------------- */}
        <div class="buttonBackNext" style={{marginTop:"50px"}}>
        <button className="CommonnButtonNew" style={{color:"black",  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", width: "55%", marginRight:"20px",height:"20px",fontSize:"5px" }}>Pending Verification</button>
        <button className="CommonnButton" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", width: "55%", height:"20px",color:" #D2D7D6" }}>Yet To Share</button>
        </div>
        <div class="buttonBackNext" style={{marginTop:"10px"}}>
        <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal",height:"10px", width: "55%",marginRight:"25px",color:" #D2D7D6" }}>Shortlisted</button>
        <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"12px",width: "55%" ,color:" #D2D7D6"}}>Shared, No Action</button>
        </div>
        {/* -------------------------------button---------------------------------------------- */}
       
         {/* BODY */}
         <div style={{textAlign:"left",marginTop:"40px"}}>
            <text>
                Hey Yash,<br/>Properties shown here are ready to be shared but are not yet shared.
            </text>
         </div>
         {/* --------------------------------------first tab-------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginTop:"10px"}}>
                {/* left side */}
            <div style={{height:"78px",width:"302px",background:"#FFFFFF",border:"1px solid #DAF0EE",borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", display:"flex"}}>
                    {/* img */}
                    <div>
                            <img src={imgOne} alt="imgOne" style={{marginLeft:"10px", marginTop:"10px"}}/>
                    </div>
                    <div style={{marginTop:"10px"}}>
                            <text style={{fontSize:"13px"}}>904, Central Park Homes</text>

                            <div style={{width:"150px",height:"25px",background:"#FFEEDB",borderRadius:"10px",marginTop:"20px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#BA7B28",marginLeft:"-50px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}>Incorrect Info</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Check</text>
                
            </div>
               

               
               
        </div>
        {/* --------------------------------------first tab-------------------------------------------- */}
         {/* --------------------------------------first tab copy-------------------------------------------- */}
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginTop:"10px"}}>
                {/* left side */}
            <div style={{height:"78px",width:"302px",background:"#FFFFFF",border:"1px solid #DAF0EE",borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", display:"flex"}}>
                    {/* img */}
                    <div>
                            <img src={imgOne} alt="imgOne" style={{marginLeft:"10px", marginTop:"10px"}}/>
                    </div>
                    <div style={{marginTop:"10px"}}>
                            <text style={{fontSize:"13px"}}>904, Central Park Homes</text>

                            <div style={{width:"150px",height:"25px",background:"#FFF8B7",borderRadius:"10px",marginTop:"20px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#BA7B28",marginLeft:"-20px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}>Pending Information</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Check</text>
                
            </div>
               

               
               
        </div>
        {/* --------------------------------------first tab copy-------------------------------------------- */}
         {/* --------------------------------------Second tab-------------------------------------------- */}
         <h4 style={{marginBottom:"-5px",marginLeft:"-15px"}}>Pending Photos from Field Agent</h4>
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginTop:"10px"}}>
                {/* left side */}
            <div style={{height:"78px",width:"302px",background:"#FFFFFF",border:"1px solid #DAF0EE",borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", display:"flex"}}>
                    {/* img */}
                    <div>
                            <img src={noImg} alt="imgOne" style={{marginLeft:"10px", marginTop:"10px"}}/>
                    </div>
                    <div style={{marginTop:"10px"}}>
                            <text style={{fontSize:"13px"}}>904, Central Park Homes</text>

                            <div style={{width:"150px",height:"25px",background:"#FCECEF",borderRadius:"10px",marginTop:"20px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#AA223C",marginLeft:"-40px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}>Awaiting Photos</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Email</text>
                
            </div>
               

               
               
        </div>


         {/* --------------------------------------Second tab-------------------------------------------- */}
         {/* --------------------------------------Third tab-------------------------------------------- */}
         <h4 style={{marginBottom:"-5px",marginLeft:"-15px"}}>Pending Verification by Internal Team</h4>
         <div style={{ display: "flex", flexDirection: "row", alignItems: "center" ,marginTop:"10px"}}>
                {/* left side */}
            <div style={{height:"78px",width:"302px",background:"#FFFFFF",border:"1px solid #DAF0EE",borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", display:"flex"}}>
                    {/* img */}
                    <div>
                            <img src={imgOne} alt="imgOne" style={{marginLeft:"10px", marginTop:"10px"}}/>
                    </div>
                    <div style={{marginTop:"10px"}}>
                            <text style={{fontSize:"13px"}}>904, Central Park Homes</text>

                            <div style={{width:"150px",height:"25px",background:"#E8ECEC",borderRadius:"10px",marginTop:"20px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#5D6560",marginLeft:"-50px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}>Under Review</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Email</text>
                
            </div>
               

               
               
        </div>
         {/* --------------------------------------Second tab-------------------------------------------- */}
        

            <Footer/>
        </div>
        </>
    );
}
export default My_PropertyYTS;