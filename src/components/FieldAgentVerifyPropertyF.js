import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import ReactSwitch from 'react-switch';

import axios from 'axios';
import backgroundSecond from "./other_bg.png";
import Footer from "./Footer";
import vector from "./vector.png"
import num3 from "./num3.png";
import gated_sec from "./PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import Power_backup from "./PropertyAdditionPageIcons/Power_backup/24.png";
import Ac_png from "./PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import car_parking from "./PropertyAdditionPageIcons/car_parking/24.png";
import club_house from "./PropertyAdditionPageIcons/club_house/24.png";
import construction_year from "./PropertyAdditionPageIcons/construction_year/24.png";
import convenience_store from "./PropertyAdditionPageIcons/convenience_store/24.png";
import floor_number from "./PropertyAdditionPageIcons/floor_number/24.png";
import furniture_1 from "./PropertyAdditionPageIcons/furniture_1/24.png";
import gym_1 from "./PropertyAdditionPageIcons/gym_1/24.png";
import hamburger_1 from "./PropertyAdditionPageIcons/hamburger_1/24.png";
import key_1 from "./PropertyAdditionPageIcons/key_1/24.png";
import mainteance_1 from "./PropertyAdditionPageIcons/mainteance_1/24.png";
import num_of_bathrooms from "./PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "./PropertyAdditionPageIcons/Power_backup/24.png";
import rent_1 from "./PropertyAdditionPageIcons/rent_1/24.png";
import security_deposit from "./PropertyAdditionPageIcons/security_deposit/24.png";
import space_or_area from "./PropertyAdditionPageIcons/space_or_area/24.png";
import swimming_pool from "./PropertyAdditionPageIcons/swimming_pool/24.png";
import veg_nonveg from "./PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import number_of_balcony from "./PropertyAdditionPageIcons/number_of_balcony/24.png";
import broom from "./PropertyAdditionPageIcons/floor_number/broom.png";


function FieldAgentVerifyPropertyF(){


    const queryParameters = new URLSearchParams(window.location.search)
	const propertyid = queryParameters.get("propertyid");
	const isContinue = queryParameters.get("continue")
	console.log(propertyid);


    const [formData, setFormData] = useState({
		propertyid: propertyid,
	  gated_security : true,
    twentyfour_seven : true,
    grocery_store : true,
    Swimming_pool: true,
    Gym : true,
    club_house : true,
    Super_Carpet: '',
    Your_Floor: '',
    Total_Floor: '',
    parking : '',
    broom:'',
    numofbath: '',
    numofbal: '',
    furnish:'',
    air_condition: true,
    nonveg:true,
    const_year:'',
    avail_from:'',
    rent: '',
    sec_dep: '',
    maint:'',
    lockin:''


	  });
    const [checked, setChecked] = useState(false);
	
	  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	  };
	
    //API REQUEST
    const token = localStorage.getItem("token");
	  console.log(token);
  
	  let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Basic ${token}` 
        }
      }

     
      


	  const handleSubmit = event => {
		event.preventDefault();
		console.log(formData);
		axios.post('http://localhost:5000/backend/propertydi', formData, axiosConfig )
		  .then(response => {


			console.log(response.data.propertyDIc);
			const propertyid = response.data.propertyDIc.propertyid;
			console.log(propertyid)
			alert("Your data has been submitted");
			window.location.href = `/PropertyCreated?propertyid=${propertyid}&continue=details`;

      // window.location.href = '/UploadPhotos'

			// do something with the response
		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	  };

  

    return(
        <div>
      <div className="login-page" >
        <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} >
				  <h2 style={{color:"#52796F"}}>Property Features<br/>Verification</h2>
          
          <h3 style={{ fontSize: "21px", fontWeight: "bold", margin: "5px 0 0", textAlign: "left", marginLeft:"45px" }}>Fuji 802, Pavillion SJR</h3>
                <form className='login-form' onSubmit={handleSubmit}>
                 <div  style={{marginRight:"10px",border: "0.5px solid #CFD3D2",width:"300px",  padding: "10px", borderRadius:"2%",background: "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)"}}>
                  <h3 style={{textAlign: "left", marginTop:"20px",marginLeft:"10px", marginBottom:"5px" }}>About the society</h3>
                 <div class="grid-container" style={{width:"300px"}}>
                        <div class="grid-item" style={{border:"none"}}>
                        <img src={gated_sec} alt="Icon description" />
                       <h5 style={{marginTop:"-2px",fontSize:"10px", fontFamily:"sans-serif"}}>Gated Security</h5>
                       <h6 style={{marginTop:"-13px", fontSize:"8px"}}>always secure</h6>
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
                        <img src={Power_backup} alt="Icon description" />
                        <h5 style={{marginTop:"-5px"}}>24 X 7</h5>
                        <h5 style={{marginTop:"-13px", fontSize:"8px"}}>
                        Power Back-up
                        </h5>
                        <ReactSwitch
                        checked={formData.twentyfour_seven}
                        onChange={() =>  setFormData({
                          ...formData,
                          twentyfour_seven: !formData.twentyfour_seven,
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
                          In Campus
                        </h5>
                        <ReactSwitch
                        checked={formData.grocery_store}
                        onChange={() =>  setFormData({
                          ...formData,
                          grocery_store: !formData.grocery_store,
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
                        
                      </div>

                </div> 
                <div  style={{ padding: "10px", margin: "20px",border: "1px solid #DAF0EE",  padding: "5px",marginLeft: "auto", marginRight: "auto", width: "327px",background:"linear-gradient(180deg, rgba(218, 240, 238, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",borderRadius:"5px"}}>
                  <h3 style={{textAlign:"left", marginTop:"-1px"}}>House Details</h3>

                  {/* -------------------------FLOOR NUMBER----------------------------- */}
                 <div class="grid-container" style={{width:"320px", marginTop:"10px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", height:"120px",borderRadius:"5px"}}>
                       
                       
                       
                       
                        <h5 style={{marginTop:"55px"}}>Floor Number</h5>

                        <div style={{display:"flex"}}>

                        <div style={{marginTop:"38px",marginRight:""}}>
                        <label style={{marginTop:"-5px",fontSize:"10px"}}>Your Floor</label>
                        <input
                        type="number"
                        id="Your_Floor"
                        value={formData.Your_Floor}
                        onChange={handleChange}
                        name="Your_Floor"
                       placeholder="number*"
                        style={{  backgroundColor:"#F5F5F5",
                       
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"80px",
                        height:"30px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                      </div>
                      
                      <div style={{marginTop:"10px", marginRight:"-100px"}}>
                    

                    
                      <img src={floor_number} alt="Icon description" /><br/>
                        <label style={{marginTop:"-1px",fontSize:"10px"}}>Total Floor</label>

                        <input
                        type="number"
                        id="Total_Floor"
                        value={formData.Total_Floor}
                        onChange={handleChange}
                        name="Total_Floor"
                        placeholder="number*"
                        style={{  backgroundColor:"#F5F5F5",
                       
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"80px",
                        height:"30px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                      
                      </div>
                        </div>
                      </div>

                       {/* -------------------------FLOOR NUMBER----------------------------- */}


                         {/* -------------------------CAR PARKING----------------------------- */}
                      <div class="grid-item" style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:"30px",marginBottom:"20px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px",border:"none"}}>
                      <div>
                        <img src={car_parking} style={{marginLeft:"10px"}} alt="Icon description"/>
                        <br/>
                        <label style={{fontSize:"10px", marginTop:"5px"}}>Car & Bike Parking Availability</label>
                        </div>
                        <div>

                            <div>
                        <label style={{fontSize:"10px"}}>Number of Car Parking</label>
                        <select
                          id="parking"
                          name="parking"
                          value={formData.parking}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    width:"150px",
                                    marginLeft:"50px",
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                          <option value="Drop Down">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="1Car"
                          >
                            1 Car
                          </option>
                          <option value="2Car">2 Car</option>
                          <option value="3Car">3 Car</option>
                          <option value="4Car">4 Car</option>
                          
                          </select>
                          </div>
                          <div>
                          <label style={{fontSize:"10px"}}>Number of Bike Parking</label>
                        <select
                          id="parking"
                          name="parking"
                          value={formData.parking}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    width:"150px",
                                    marginLeft:"50px",
                                   
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                          <option value="Drop Down">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="1Bike"
                          >
                            1 Bike
                          </option>
                          <option value="IncludedwithCar">Included with Car</option>
                          <option value="Ownedgarage">Owned Garage</option>
                          
                          
                          </select>
                          </div>
                          <div>

                          
                          <label style={{fontSize:"11px",textAlign:"left",marginLeft:"-29px"}}>Parking Type</label><br/>
                          <select
                          id="parking"
                          name="parking"
                          value={formData.parking}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    width:"150px",
                                    marginTop:"5px",
                                    marginLeft:"50px",
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                          <option value="Drop Down">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="Coveredroof"
                          >
                            Covered Roof
                          </option>
                          <option value="Open">Open</option>
                          
                          
                          
                          </select>
                          </div>
                          </div>

                      </div>

                      {/* -------------------------CAR PARKING----------------------------- */}

                {/* -----------------------------------------House help--------------------------------------------------------------- */}

                
                      <div class="grid-item" style={{marginTop:"30px",marginBottom:"20px",display: "flex", justifyContent: "center", alignItems: "center",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px",border:"none",height:"90px"}}>
                        <div>
                        <img src={broom} alt="Icon description"/><br/>
                        <label style={{fontSize:"10px"}}>House help room</label>

                        </div>
                       <div>
                        <label style={{fontSize:"10px"}}>House Help Room</label>
                        <br/>
                        <select
                          id="broom"
                          name="broom"
                          value={formData.broom}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    width:"150px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    marginLeft:"60px",
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                          <option value="Drop Down">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="1_Room"
                          >
                            1 Room
                          </option>
                          <option value="1Room+Bathroom">1 Room + Bathroom</option>
                          <option value="None">None</option>
                          
                          
                          </select>
                          </div>

                      </div>

                {/* -----------------------------------------House help--------------------------------------------------------------- */}       


                      <div class="grid-container" style={{}}>
                        <div class="grid-item" style={{width:"145px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",border:"none",borderRadius:"5px"}}>
                        <img src={num_of_bathrooms} alt="Icon description" />
                        <h5>Number of Bathrooms</h5>
                        <select
                          id="numofbath"
                          name="numofbath"
                          value={formData.numofbath}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                          <option value="drop down">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="1"
                          >
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          </select>

                        
                        </div>
                        <div class="grid-item" style={{width:"150px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px",border:"none"}}>
                        <img src={number_of_balcony} alt="Icon description" />
                        <h5>No of Balconies</h5>
                        <select
                          id="numofbal"
                          name="numofbal"
                          value={formData.numofbal}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                          <option value="furnish">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="1"
                          >
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          </select>

                        </div>
                       </div>
                      <div class="grid-item" style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:"20px", marginBottom:"20px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px",border:"none"}}>
                        <div style={{}}>
                        <img src={furniture_1} style={{marginTop:"0px"}} alt="Icon description"/>
                        <h5 style={{marginTop:"-1px"}}>Furnishing</h5>
                        </div>
                        <div style={{marginLeft:"50px"}}>

                       
                        <h6 style={{marginTop:"30px"}}>Type Of Furnishing?</h6>
                        <select
                          id="furnish"
                          name="furnish"
                          value={formData.furnish}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
                                    marginTop:"-50px",
                                    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",}}
                        >
                         
                          <option value="furnish">Drop Down</option>
                          <option
                            style={{ textAlign: "center", backgroundColor: "red" }}
                            value="Un-furnished"
                          >
                            Un-furnished
                          </option>
                          <option value="Semi-Furnished">Semi-Furnished</option>
                          <option value="Full-Furnished">Full-Furnished</option>
                         
                        </select>
                        </div>
                      </div>
                      <div class="grid-container">
                        <div class="grid-item" style={{width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px"}}>
                        <img src={Ac_png} alt="Icon description" />
                        <h5 style={{marginTop:"10px"}}>Air Conditioner</h5>
                        <ReactSwitch
                        checked={formData.air_condition}
                        onChange={() =>  setFormData({
                          ...formData,
                          air_condition: !formData.air_condition,
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
                        <div class="grid-item" style={{width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px"}}>
                        <img src={veg_nonveg} alt="Icon description" />
                        <h5 style={{marginTop:"0px"}}>Non Veg Allowed?</h5>
                        <ReactSwitch
                        checked={formData.nonveg}
                        onChange={() =>  setFormData({
                          ...formData,
                          nonveg: !formData.nonveg,
                          })}
                          onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={ <span style={{ color: "#black", fontSize: "15px", marginTop:"10px" }}>No</span>}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                        </div>
                       </div>
                     
                       
                       
                      
                      
                </div> 

               
                
                       

                

               
               
                    <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-15%",marginTop:"-10px" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "80%" }}>Submit & Upload Photos<img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%",marginTop:"-24px" }}/></button>
		                </div>
                   
            
                 <Footer/>

                </form>
            </div>
        </div>
        </div>

    );
}
export default  FieldAgentVerifyPropertyF;