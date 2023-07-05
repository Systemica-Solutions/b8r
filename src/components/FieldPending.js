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
import check from "./check.png";

function FieldPending(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}>Pending Pipeline</h2>

        <h5 style={{marginLeft:"-290px"}}>Hey Yash,</h5>
        <h5>Properties show here are pending for verfification and photo submission.</h5>
        {/* design for pending */}
        <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        {/* left white side */}
        <div style={{marginTop:"-110px"}}>
        <div className="containered form" style={{height:"70px",width:"240px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", marginLeft:"20px"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"left"}}>
               
                {/* for title and text */}
                <div style={{marginTop:"-15px",textAlign:"left"}}>
                <h5 style={{fontSize:"10px"}}>Fuji 802, Pavillion SJR</h5>
                </div>
                {/* two buttons */}
                <div style={{display:"flex",flexDirection:"row",alignItems:"centre",marginTop:"-0px"}}>
                    <div style={{height:"20px",width:"140px",background:"#FCECEF",borderRadius:"10px",marginRight:"10px"}}>
                        <h6 style={{fontSize:"8px",color:"#AA223C",marginTop:"5px"}}>Information Validation</h6>
                    </div>
                    <div style={{height:"20px",width:"140px",background:"#F0FBF8",borderRadius:"10px",marginRight:"20px"}}>
                    <h6 style={{fontSize:"8px",color:"#52796F",marginTop:"5px"}}>Photos Capture</h6>
                    </div>
                </div>
                
                
            </div>
            <div style={{marginTop:"-3px"}}>
                <h5 style={{fontSize:"10px",textAlign:"left"}}>Address:</h5>
                <h6 style={{fontSize:"10px",marginTop:"-18px",textAlign:"left"}}> House/Flat Number, Society, Area, Pincode</h6>

                </div>
            
        </div>
        {/* down extention */}
        <div style={{width:"262px",height:"40px",background:"#DAF0EE",marginTop:"-100px",marginLeft:"22px",borderBottomLeftRadius:"25px",borderBottomRightRadius:"25px"}}>
            <h6 style={{marginTop:"2px"}}>Assigned on:</h6>
            <h6 style={{marginTop:"-20px"}}>24 May (7 days before)</h6>
        </div>

        </div>
       
        {/* for check button */}
        <div style={{width:"45px",height:"150px",background:"#E8E7E7",borderRadius:"10px",marginBottom:"90px",marginLeft:"10px"}}>
            <img src={check} style={{height:"20px",marginTop:"50px"}}/>
            <h6 style={{marginTop:"-2px",color:"#5D6560"}}>Check</h6>

        </div>
       
        </div>
        
         {/* BODY */}

         <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        {/* left white side */}
        <div style={{marginTop:"-110px"}}>
        <div className="containered form" style={{height:"70px",width:"240px", borderRadius:"15px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", marginLeft:"20px"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"left"}}>
               
                {/* for title and text */}
                <div style={{marginTop:"-15px",textAlign:"left"}}>
                <h5 style={{fontSize:"10px"}}>Fuji 802, Pavillion SJR</h5>
                </div>
                {/* two buttons */}
                <div style={{display:"flex",flexDirection:"row",alignItems:"centre",marginTop:"-0px"}}>
                    <div style={{height:"20px",width:"140px",background:"#FCECEF",borderRadius:"10px",marginRight:"10px"}}>
                        <h6 style={{fontSize:"8px",color:"#AA223C",marginTop:"5px"}}>Information Validation</h6>
                    </div>
                    <div style={{height:"20px",width:"140px",background:"#F0FBF8",borderRadius:"10px",marginRight:"20px"}}>
                    <h6 style={{fontSize:"8px",color:"#52796F",marginTop:"5px"}}>Photos Capture</h6>
                    </div>
                </div>
                
                
            </div>
            <div style={{marginTop:"-3px"}}>
                <h5 style={{fontSize:"10px",textAlign:"left"}}>Address:</h5>
                <h6 style={{fontSize:"10px",marginTop:"-18px",textAlign:"left"}}> House/Flat Number, Society, Area, Pincode</h6>

                </div>
            
        </div>
        {/* down extention */}
        <div style={{width:"262px",height:"40px",background:"#DAF0EE",marginTop:"-100px",marginLeft:"22px",borderBottomLeftRadius:"25px",borderBottomRightRadius:"25px"}}>
            <h6 style={{marginTop:"2px"}}>Assigned on:</h6>
            <h6 style={{marginTop:"-20px"}}>24 May (7 days before)</h6>
        </div>

        </div>
       
        {/* for check button */}
        <div style={{width:"45px",height:"150px",background:"#E8E7E7",borderRadius:"10px",marginBottom:"90px",marginLeft:"10px"}}>
            <img src={check} style={{height:"20px",marginTop:"50px"}}/>
            <h6 style={{marginTop:"-2px",color:"#5D6560"}}>Check</h6>

        </div>
       
        </div>
      

        

            <Footer/>
        </div>
        </>
    );
}
export default FieldPending;