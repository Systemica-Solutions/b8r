import React, { Component }  from 'react';
import Dashboardcss from './Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "./UserLoginDetails";
import homeDown from "./homeDown.png";
import peopleDown from "./peopleDown.png";
import Footer from "./Footer";
import vector from "./vector.png"
import backgroundSecond from "./other_bg.png";
import rentedOut from "./rentedOut.png";
import sharedOut from "./sharedOut.png";
import shortListed from "./shortListed.png";
import yetShared from "./yetShared.png";
import PVbackground from "./Pvbackground.png";
import imgOne from "./imgOne.png";
import checkP from "./CheckP.png";
import noImg from "./noImg.png";
import like from "./Like.png";


function My_PropertyS(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${PVbackground})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%',height:"950px"}}>
            <h2 style={{color:"#52796F"}}>My Properties</h2>
        

            
            {/* -------------------------------button---------------------------------------------- */}
        <div class="buttonBackNext" style={{marginTop:"50px"}}>
        <button className="CommonnButtonNew" style={{color:"black",  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", width: "55%", marginRight:"20px",height:"20px",fontSize:"5px" }}>Pending Verification</button>
        <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", width: "55%", height:"20px",color:" #D2D7D6" }}>Yet To Share</button>
        </div>
        <div class="buttonBackNext" style={{marginTop:"10px"}}>
        <button className="CommonnButton" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal",height:"10px", width: "55%",marginRight:"25px",color:" #D2D7D6" }}>Shortlisted</button>
        <button className="CommonnButtonNew" style={{  fontWeight: "bold" , textAlign: "left", fontStyle: "normal", height:"12px",width: "55%" ,color:" #D2D7D6"}}>Shared, No Action</button>
        </div>
        {/* -------------------------------button---------------------------------------------- */}
       
         {/* BODY */}
         <div style={{textAlign:"left",marginTop:"40px"}}>
            <text>
                Hey Yash,<br/>Awesome news, 2 Properties are shortlisted.
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
                    <div style={{marginTop:"5px"}}>
                        <div style={{textAlign:"left",marginLeft:"10px"}}>
                            <text style={{fontSize:"9px",textAlign:"left"}}>1018, Tower 1,<br/> <text style={{maringTop:"-15px"}}>Prestige Shantiniketan</text></text>
                        </div>
                            <div style={{width:"150px",height:"25px",background:"#FFFFFF",borderRadius:"10px",marginTop:"5px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#000000",marginLeft:"-50px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}><img src={like}/>4 Tenants</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Detail</text>
                
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

                            <div style={{width:"150px",height:"25px",background:"#FFFFF",borderRadius:"10px",marginTop:"20px",marginLeft:"10px"}}>
                                    <text style={{fontSize:"12px",color:"#00000",marginLeft:"-20px",fontFamily:"Inter",fontStyle:"normal",fontWeight:"bold"}}><img src={like}/>2 Tenants</text>
                            </div>

                    </div>
            </div>
            {/* right side */}
            <div style={{height:"75px",width:"52px",background:"#E8E7E7",borderRadius:"10px",marginLeft:"10px"}}> 

            <img src={checkP} style={{height:"27px",marginTop:"20px",marginBottom:"-8px"}}/>
            <text style={{fontSize:"12px",color:"#5D6560",fontWeight:"bold"}}>Detail</text>
                
            </div>
               

               
               
        </div>
        {/* --------------------------------------first tab copy-------------------------------------------- */}
        <div style={{marginTop:"310px"}}></div>

            <Footer/>
        </div>
        </>
    );
}
export default My_PropertyS;