import React, { Component }  from 'react';

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


function fieldAgentHome2(){


    // const token = localStorage.getItem("token");
    // console.log(token);
    
    // const handleSubmit = event => {
	// event.preventDefault();
    //    localStorage.removeItem("token");
	// 		alert("You have been logged out.");
	//   };


    return(
        <>

       

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}>Agent Dashboard</h2>
        <div className="containered form" style={{height:"150px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                {/* for image */}
                <div>

                </div>
                {/* for title and text */}
                <label>Hey</label><br/>
                <h5>Welcome to one-stop<br/> place for all your listing</h5>
                <div>

                </div>
            </div>
            
        </div>
         {/* BODY */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                {/* left side */}
                <div style={{width:"150px",height:"360px",background:"#E8E7E7",borderRadius:"15px",marginTop:"-60px",marginBottom:"5px",marginRight:"40px",marginLeft:"13px"}}>

                <div style={{height:"60px",background:"#FFFFFF",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                
                <img src={rentedOut} alt={rentedOut} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Rented Out</h5>
                </div>
                </div>
                {/* 2 */}
                <div style={{height:"60px",background:"#FFFFFF",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={sharedOut} alt={sharedOut} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Shared Property</h5>
                </div>
                </div>
                {/* 3 */}
                <div style={{height:"60px",background:"#FFFFFF",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={shortListed} alt={shortListed} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Shortlisted</h5>
                </div>
                </div>
                {/* 4 */}
                <div style={{height:"60px",background:"#FFFFFF",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={yetShared} alt={yetShared} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Yet to share</h5>
                </div>
                </div>
                <img src={homeDown} alt={homeDown} height={31}/>
                </div>
                {/* right side */}
                <div style={{width:"150px",height:"360px",background:"#B1D7CD",borderRadius:"15px",marginTop:"-60px",marginBottom:"5px"}}>
                <div style={{height:"60px",background:"#F0FBF8",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={rentedOut} alt={rentedOut} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Rented Out</h5>
                </div>
                </div>
                {/* 2 */}
                <div style={{height:"60px",background:"#F0FBF8",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={sharedOut} alt={sharedOut} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Shared Property</h5>
                </div>
                </div>
                {/* 3 */}
                <div style={{height:"60px",background:"#F0FBF8",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={shortListed} alt={shortListed} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Shortlisted</h5>
                </div>
                </div>
                {/* 4 */}
                <div style={{height:"60px",background:"#F0FBF8",marginTop:"20px",marginLeft:"15px",marginRight:"15px",borderRadius:"15px"}}>
                <img src={yetShared} alt={yetShared} height={30} style={{ float: "left",marginLeft:"5px", marginRight: "10px", marginTop: "14px", marginBottom: "auto" }}/>
                <div style={{marginTop:"0px", marginBottom:"5px"}}>
                <h5 >Awating Sharing</h5>
                </div>
                </div>
                <img src={peopleDown} alt={peopleDown} height={30}/>
                </div>
            </div>

        <div class="buttonBackNext" style={{marginTop:"50px"}}>
        <button className="CommonnButton" style={{color:"black",  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%", marginRight:"20px" }}>All Properties<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
        <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>All Tenants<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
        </div>
        <div class="buttonBackNext" style={{marginTop:"100px"}}>
       <Link to="/propertyinfo"> <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal",height:"82px", width: "45%" }}>Add<br/> New <br/>Property<img className="vectorSignIn" src={vector} alt="fireSpot"/></button></Link>
        <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", height:"82px",width: "45%" }}>Add <br/> New <br/>Tenant<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
        </div>

            <Footer/>
        </div>
        </>
    );
}
export default fieldAgentHome2;