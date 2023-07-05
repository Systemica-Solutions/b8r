import React, { Component,useState }  from 'react';
import ReactSwitch from 'react-switch';
import Dashboardcss from './Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "./UserLoginDetails";

import Footer from "./Footer";
import vector from "./vector.png"

import LiftLobby from "./LiftLobby.png";
import Door from "./Door.png";
import LivingRoom from "./LivingRoom.png";
import TVarea from "./TVarea.png";
import Kitchen from "./Kitchen.png";
import UtilityArea from "./UtilityArea.png";
import Backyard from "./Backyard.png";
import CommonWashroom from "./CommonWashroom.png";
import Balcony from "./Balcony.png";

function PhotosCapture(){

    const queryParameters = new URLSearchParams(window.location.search)
	const propertyid = queryParameters.get("propertyid");
	const isContinue = queryParameters.get("continue")
	console.log(propertyid);


    const [formData, setFormData] = useState({
	lift_lobby: true,
	entry_door : true,
    home_entry : true,
    living_room : true,
    tv_area: true,
    kitchen : true,
    utility_area : true,
    backyard: '',
    Common_Washroom: '',
    Living_Room_bal: ''
   


	  });

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
        <h2 style={{color:"#52796F"}}>Photo Capture</h2>
        <div style={{textAlign:"left",marginLeft:"10px"}}>
            <text style={{fontFamily:"Inter",fontStyle:"normal",fontSize:"20px" }}>
            Please make sure to capture all the places inside the House as well as the <br/>Society<br/>

            Make sure following is set-up<br/>

            1. Keep all the <b>windows open</b><br/>
            2. Make sure the <b>curtains are wide open</b><br/>
            3. The <b>house is clean, tidy & well arranged</b><br/>
            4. Shoes & Footwear is locked inside<br/>
            5. Bedsheets are well laid out and no open blankets<br/>
            6. Pillow are well set<br/>
            7. No random things on floor <br/>  
            </text>
            </div>
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "85%",marginTop:"40px" }}>Yes all things are arranged<img className="vectorSignUp" src={vector} style={{marginTop:"-25px"}} alt="fireSpot"/></button>
            <div style={{textAlign:"left"}}>
            <h3 style={{textAlign:"left",marginTop:"40px"}}><u>Basic Home Photos</u></h3>
            <text style={{fontFamily:"Inter",fontStyle:"normal",fontSize:"20px"}}>Select <b>Yes</b> after clicking and checking the photo on the Camera.
             <br/>
            
             If it is not relevant or the space does not exist, select no</text>
            </div>
         {/* BODY */}
            <div style={{marginTop:"50px"}}>
                {/* //First row */}
                <div style={{display:"flex",width:"700px"}}>
                    {/* --------------lift Lobby----------------- */}
                    <div style={{width:"90px"}}>
                <img src={LiftLobby} style={{fontSize:"10px"}} alt="LiftLobby" />
                        <h5 style={{marginTop:"10px"}}>Lift Lobby</h5>
                        <ReactSwitch
                        checked={formData.entry_door}
                        onChange={() =>  setFormData({
                          ...formData,
                          lift_lobby: !formData.lift_lobby,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                         {/* --------------lift Lobby----------------- */}
                         {/* --------------Entry Door---------------------- */}
                         <div style={{width:"90px"}}>
                         <img src={Door} style={{fontSize:"10px"}} alt="Door" />
                        <h5 style={{marginTop:"10px"}}>Door</h5>
                        <ReactSwitch
                        checked={formData.entry_door}
                        onChange={() =>  setFormData({
                          ...formData,
                          entry_door: !formData.entry_door,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                        {/* --------------Entry Door---------------------- */}
                        {/* --------------Home Entry---------------------- */}
                        <div style={{width:"90px"}}>
                        <img src={LiftLobby} style={{fontSize:"10px"}} alt="LiftLobby" />
                        <h5 style={{marginTop:"10px"}}>Home Entry</h5>
                        <ReactSwitch
                        checked={formData.home_entry}
                        onChange={() =>  setFormData({
                          ...formData,
                          home_entry: !formData.home_entry,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                        {/* --------------Home Entry---------------------- */}
                        {/* --------------Living Room---------------------- */}
                        <div style={{width:"100px",marginTop:"-14px"}}>
                        <img src={LivingRoom} style={{height:"70px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}></h5>
                        <ReactSwitch
                        checked={formData.living_room}
                        onChange={() =>  setFormData({
                          ...formData,
                          living_room: !formData.living_room,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        
                       
                        />
                        </div>
                         {/* --------------Living Room---------------------- */}


                </div>
                 {/* //Second row */}
                <div style={{display:"flex",marginTop:"20px"}}>
                    {/* -------------------------------TV Area------------------------- */}
                    <div style={{width:"90px"}}>
                    <img src={TVarea} style={{height:"50px"}} alt="TVarea" />
                        <h5 style={{marginTop:"10px"}}></h5>
                        <ReactSwitch
                        checked={formData.tv_area}
                        onChange={() =>  setFormData({
                          ...formData,
                          tv_area: !formData.tv_area,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                    {/* -------------------------------TV Area------------------------- */}
                     {/* -------------------------------Kitchen------------------------- */}
                        <div style={{width:"90px"}}>
                    <img src={Kitchen} style={{height:"50px"}} alt="Kitchen" />
                        <h5 style={{marginTop:"10px"}}></h5>
                        <ReactSwitch
                        checked={formData.kitchen}
                        onChange={() =>  setFormData({
                          ...formData,
                          kitchen: !formData.kitchen,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                         {/* -------------------------------Kitchin------------------------- */}
                          {/* -------------------------------Utility Area------------------------- */}
                        <div style={{width:"90px"}}>
                         <img src={UtilityArea} style={{height:"57px"}} alt="UtilityArea" />
                        <h5 style={{marginTop:"10px"}}></h5>
                        <ReactSwitch
                        checked={formData.utility_area}
                        onChange={() =>  setFormData({
                          ...formData,
                          utility_area: !formData.utility_area,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                         {/* -------------------------------Utility Area------------------------- */}
                          {/* -------------------------------Backyard------------------------- */}
                        <div style={{width:"90px"}}>
                        <img src={Backyard} style={{height:"50px"}} alt="Backyard" />
                        <h5 style={{marginTop:"10px"}}></h5>
                        <ReactSwitch
                        checked={formData.backyard}
                        onChange={() =>  setFormData({
                          ...formData,
                          backyard: !formData.backyard,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                         {/* -------------------------------Backyard------------------------- */}


                </div>
                <div style={{display:"flex",marginTop:"30px"}}>
                 {/* //Third row */}
                 {/* --------------------------Common Wahsroom--------------------------------- */}
                 <div style={{width:"90px"}}>
                 <img src={CommonWashroom}  style={{height:"90px"}} alt="CommonWashroom" />
                        <h5 style={{marginTop:"10px"}}></h5>
                        <ReactSwitch
                        checked={formData.Common_Washroom}
                        onChange={() =>  setFormData({
                          ...formData,
                         Common_Washroom: !formData.Common_Washroom,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                 {/* --------------------------Common Wahsroom--------------------------------- */}
                   {/* --------------------------Living Room Balcony--------------------------------- */}
                   <div style={{width:"130px",marginLeft:"20px"}}>
                   <img src={Balcony} style={{height:"40px"}} alt="Balcony" />
                        <h5 style={{marginTop:"10px",fontSize:"18px"}}>Living Room Balcony</h5>
                        <ReactSwitch
                        checked={formData.Living_Room_bal}
                        onChange={() =>  setFormData({
                          ...formData,
                          Living_Room_bal: !formData.Living_Room_bal,
                        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                       
                        />
                        </div>
                     {/* --------------------------Living Room Balcony--------------------------------- */}
               

                </div>
            </div>
       
         <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Bedroom Photos<img className="vectorSignUp" src={vector} alt="fireSpot"/></button>
            <Footer/>
        </div>
        </>
    );
}
export default PhotosCapture;