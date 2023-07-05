import React, { Component,useState }  from 'react';
import Dashboardcss from './Dashboard.css';
import ReactSwitch from 'react-switch';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "./UserLoginDetails";
import homeDown from "./homeDown.png";
import peopleDown from "./peopleDown.png";
import Footer from "./Footer";
import vector from "./vector.png"

import gated_sec from "./PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import car_parking from "./PropertyAdditionPageIcons/car_parking/24.png";
import gym_1 from "./PropertyAdditionPageIcons/gym_1/24.png";
import club_house from "./PropertyAdditionPageIcons/club_house/24.png";
import swimming_pool from "./PropertyAdditionPageIcons/swimming_pool/24.png";
import convenience_store from "./PropertyAdditionPageIcons/convenience_store/24.png";
import bedroom from "./Bedroom.png";
import washroom from "./washroom.png";
import balcony from "./Balcony_two.png";
import broom_clean from "./Broom_clean.png";

function PhotoCaptureTwo(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };

      const [formData, setFormData] = useState({
		// propertyid: propertyid,
	    gated_security : true,
   
        convenience_store : true,
        Swimming_pool: true,
        Gym : true,
        club_house : true,
        car_parking: true,
        bedroom: true,
        bath_one: true,
        balcony: true,
        bedroom_two: true,
        bath_two: true,
        balcony_two: true,
        bedroom_three: true,
        bath_three: true,
        balcony_three:true,
        servant_room: true,
        servant_washroom: true
   


	  });


    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            <h2 style={{color:"#52796F"}}>Photo Capture</h2>
            <div style={{textAlign:"left"}}>
            <text>
            Bedroom Photos Checklist<br/>
            <div style={{marginTop:"20px"}}>

            </div>

            1. Keep all the <b> windows open</b><br/>
            2. Make sure the <b>curtains are wide <br/>open</b><br/>
            3. Bedsheets are well laid out and no<br/> open blankets<br/>
            4. Pillow are well set<br/>
            5. No random things on floor
            <div style={{marginLeft:"40px"}}>

           
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "85%",marginTop:"40px" }}>Yes all things are arranged<img className="vectorSignUp" src={vector}  style={{marginTop:"-24px",marginLeft:"220px"}} alt="fireSpot"/></button>
            </div>
            </text>
            </div>

        <h3 style={{textAlign:"left",marginBottom:"-10px",marginTop:"40px"}}>Bedroom & Other Details</h3>
        <div  style={{height:"600px", borderRadius:"5px",background:"linear-gradient(180deg, rgba(218, 240, 238, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",border:"1px solid #CFD3D2",marginTop:"20px",marginBottom:"90px"}}>
            {/* ------------------------------first row---------------------------------- */}

            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
        {/* --------------------------------bedroom------------------------------------------------- */}
            <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={bedroom} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Bedroom 1</h5>
                        <ReactSwitch
                        checked={formData.bedroom}
                        onChange={() =>  setFormData({
                          ...formData,
                          bedroom: !formData.bedroom,
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
  {/* --------------------------------bedroom------------------------------------------------- */}

    {/* --------------------------------washroom------------------------------------------------- */}
                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={washroom} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Attached Bath 1</h5>
                        <ReactSwitch
                        checked={formData.bath_one}
                        onChange={() =>  setFormData({
                          ...formData,
                          bath_one: !formData.bath_one,
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
    {/* --------------------------------washroom------------------------------------------------- */}

      {/* --------------------------------balcony------------------------------------------------- */}

                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={balcony} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Balcony 1</h5>
                        <ReactSwitch
                        checked={formData.balcony}
                        onChange={() =>  setFormData({
                          ...formData,
                          balcony: !formData.balcony,
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
               
            </div>
             {/* ------------------------------Second row---------------------------------- */}
             <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    {/* --------------------------------bedroom------------------------------------------------- */}
                    <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={bedroom} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Bedroom 2</h5>
                        <ReactSwitch
                        checked={formData.bedroom_two}
                        onChange={() =>  setFormData({
                          ...formData,
                          bedroom_two: !formData.bedroom_two,
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
  {/* --------------------------------bedroom------------------------------------------------- */}

    {/* --------------------------------washroom------------------------------------------------- */}
                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={washroom} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Attached Bath 2</h5>
                        <ReactSwitch
                        checked={formData.bath_two}
                        onChange={() =>  setFormData({
                          ...formData,
                          bath_two: !formData.bath_two,
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
    {/* --------------------------------washroom------------------------------------------------- */}

      {/* --------------------------------balcony------------------------------------------------- */}

                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={balcony} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Balcony 2</h5>
                        <ReactSwitch
                        checked={formData.balcony_two}
                        onChange={() =>  setFormData({
                          ...formData,
                          balcony_two: !formData.balcony_two,
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
               
            </div>

              {/* ------------------------------thrid row---------------------------------- */}
              <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    {/* --------------------------------bedroom------------------------------------------------- */}
                    <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={bedroom} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Bedroom 3</h5>
                        <ReactSwitch
                        checked={formData.bedroom_three}
                        onChange={() =>  setFormData({
                          ...formData,
                          bedroom_three: !formData.bedroom_three,
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
  {/* --------------------------------bedroom------------------------------------------------- */}

    {/* --------------------------------washroom------------------------------------------------- */}
                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={washroom} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Attached Bath 3</h5>
                        <ReactSwitch
                        checked={formData.bath_three}
                        onChange={() =>  setFormData({
                          ...formData,
                          bath_three: !formData.bath_three,
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
    {/* --------------------------------washroom------------------------------------------------- */}

      {/* --------------------------------balcony------------------------------------------------- */}

                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={balcony} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Balcony 3</h5>
                        <ReactSwitch
                        checked={formData.balcony_three}
                        onChange={() =>  setFormData({
                          ...formData,
                          balcony_three: !formData.balcony_three,
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
               
            </div>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>

            <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={broom_clean} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Servant Room</h5>
                        <ReactSwitch
                        checked={formData.servant_room}
                        onChange={() =>  setFormData({
                          ...formData,
                          servant_room: !formData.servant_room,
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
  {/* --------------------------------bedroom------------------------------------------------- */}

    {/* --------------------------------washroom------------------------------------------------- */}
                        <div style={{width:"60px",marginTop:"20px",marginLeft:"40px"}}>
                        <img src={broom_clean} style={{height:"20px"}} alt="LivingRoom" />
                        <h5 style={{marginTop:"10px"}}>Servant Washroom </h5>
                        <ReactSwitch
                        checked={formData.servant_washroom}
                        onChange={() =>  setFormData({
                          ...formData,
                          servant_washroom: !formData.servant_washroom,
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
                    
            </div>
            
        </div>

        {/* -----------------------------society related pressure-------------------------------------- */}


        <h3 style={{textAlign:"left",marginBottom:"10px",marginTop:"-80px"}}>Society Related Pictures</h3>
        <div style={{height:"300px", borderRadius:"5px",background:"linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",border:"1px solid #CFD3D2"}}>
            
            <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <div class="grid-container" style={{width:"300px"}}>
                        <div class="grid-item" style={{border:"none"}}>
                        <img src={gated_sec} alt="Icon description" />
                       <h5 style={{marginTop:"-2px",fontSize:"10px", fontFamily:"sans-serif"}}>Main Gate</h5>
                       <h6 style={{marginTop:"-13px", fontSize:"8px"}}></h6>
                       <ReactSwitch
                      checked={formData.gated_security}
                      onChange={() =>  setFormData({
                        ...formData,
                        gated_security: !formData.gated_security,
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
                        <div class="grid-item" style={{border:"none"}}>
                        <img src={club_house} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"10px" ,fontSize:"10px"}}>
                          Club house
                        </h5>
                        <ReactSwitch
                        checked={formData.club_house}
                        onChange={() =>  setFormData({
                          ...formData,
                          club_house: !formData.club_house,
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
                        <div class="grid-item" style={{border:"none"}}>
                        <img src={convenience_store} alt="Icon description" />
                        <h5 style={{marginTop:"-5px", fontSize:"10px"}}>Grocery Store</h5>
                        <h5 style={{marginTop:"-9px", fontSize:"8px"}}>
                          
                        </h5>
                        <ReactSwitch
                        checked={formData.convenience_store}
                        onChange={() =>  setFormData({
                          ...formData,
                          convenience_store: !formData.convenience_store,
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
                        <div class="grid-item" style={{border:"none"}}>
                        <img src={swimming_pool} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"15px", fontSize:"10px"}}>Swimming Pool</h5>
                        <ReactSwitch
                        checked={formData.Swimming_pool}
                        onChange={() =>  setFormData({
                          ...formData,
                          Swimming_pool: !formData.Swimming_pool,
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

                        <div class="grid-item" style={{border:"none"}}>
                        <img src={gym_1} alt="Icon description" />
                        <h5 style={{marginTop:"-1px",marginBottom:"20px", fontSize:"10px"}}>Gym</h5>
                        <ReactSwitch
                        checked={formData.Gym}
                        onChange={() =>  setFormData({
                          ...formData,
                          Gym: !formData.Gym,
        })}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        /></div>

                       

                        <div class="grid-item" style={{border:"none"}}>
                        <img src={car_parking} alt="Icon description" />
                        <h5 style={{marginTop:"-5px"}}>Parking</h5>
                        <h5 style={{marginTop:"-13px", fontSize:"8px"}}>
                       
                        </h5>
                        <ReactSwitch
                        checked={formData.car_parking}
                        onChange={() =>  setFormData({
                          ...formData,
                          car_parking: !formData.car_parking,
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
            
                  
                        
                      </div>

                
               
            </div>
             
                   
            
        </div>

                        <div style={{marginTop:"50px"}}>

                        </div>
                        <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "80%" }}>Submit & Upload Photos<img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%",marginTop:"-25px" }}/></button>
		                </div>
         {/* BODY */}
       

        
       

            <Footer/>
        </div>
        </>
    );
}
export default PhotoCaptureTwo;