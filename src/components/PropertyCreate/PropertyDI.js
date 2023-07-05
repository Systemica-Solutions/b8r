import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import ReactSwitch from 'react-switch';

import axios from 'axios';
import backgroundSecond from "../Assets/Images/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/vector.png"
import num3 from "../Assets/Images/num3.png";
import gated_sec from "../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import Power_backup from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import Ac_png from "../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import car_parking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import club_house from "../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";
import construction_year from "../Assets/Images/PropertyAdditionPageIcons/construction_year/24.png";
import convenience_store from "../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";
import floor_number from "../Assets/Images/PropertyAdditionPageIcons/floor_number/24.png";
import furniture_1 from "../Assets/Images/PropertyAdditionPageIcons/furniture_1/24.png";
import gym_1 from "../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";
import hamburger_1 from "../Assets/Images/PropertyAdditionPageIcons/hamburger_1/24.png";
import key_1 from "../Assets/Images/PropertyAdditionPageIcons/key_1/24.png";
import mainteance_1 from "../Assets/Images/PropertyAdditionPageIcons/mainteance_1/24.png";
import num_of_bathrooms from "../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import rent_1 from "../Assets/Images/PropertyAdditionPageIcons/rent_1/24.png";
import security_deposit from "../Assets/Images/PropertyAdditionPageIcons/security_deposit/24.png";
import space_or_area from "../Assets/Images/PropertyAdditionPageIcons/space_or_area/24.png";
import swimming_pool from "../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import veg_nonveg from "../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import number_of_balcony from "../Assets/Images/PropertyAdditionPageIcons/number_of_balcony/24.png";
import broom from "../Assets/Images/PropertyAdditionPageIcons/floor_number/broom.png";


function PropertyDI(){

  	
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
				  <h2 style={{color:"#52796F"}}>Property Features</h2>
          <img src={num3} alt="Image description" height={55} />
          <h3 style={{ fontSize: "21px", fontWeight: "bold", margin: "5px 0 0", textAlign: "left", marginLeft:"5px" }}>House number, Society Name</h3>
                <form className='login-form' onSubmit={handleSubmit}>
                 <div  style={{marginRight:"10px",border: "0.5px solid grey",width:"300px",  padding: "10px", borderRadius:"2%",background: "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)"}}>
                  <h3 style={{textAlign: "left", marginTop:"20px",marginLeft:"10px", marginBottom:"5px" }}>About the society</h3>
                 <div class="grid-container" style={{width:"300px"}}>
                        <div class="grid-item">
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
                        <div class="grid-item">
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
                        <div class="grid-item">
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
                        <div class="grid-item">
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
                        <div class="grid-item">
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
                        <div class="grid-item">
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
                <div  style={{ padding: "10px", margin: "20px",border: "1px solid #DAF0EE",  padding: "5px", margin: "20px",marginLeft: "auto", marginRight: "auto", width: "327px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%),box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)"}}>
                  <h3 style={{textAlign:"left", marginTop:"-1px"}}>House Details</h3>
                 <div class="grid-container" style={{width:"150px", marginTop:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none", height:"120px"}}>
                        <div class="grid-item" style={{width:"150px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",border:"1px solid #DAF0EE",borderRadius:"5px"}}> 
                        <img src={space_or_area} alt="Icon description" />
                        <h5 style={{fontSize:"12px", marginTop:"-5px"}}>Super Carpet Area</h5>
                        <h6 style={{fontSize:"10px", marginTop:"-20px"}}>(in Square feet, sq.ft)</h6>
                        <input
                        type="number"
                        id="Super_Carpet"
                        value={formData.Super_Carpet}
                        onChange={handleChange}
                        name="Super_Carpet"
                        placeholder="number only*"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"120px",
                        marginTop:"-15px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
              }}
            />
                        </div>
                        <div class="grid-item" style={{width:"145px",marginLeft:"5px", marginTop:"-5px", border:"none", height:"120px", marginBottom:"20px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px"}}>
                        <img src={floor_number} alt="Icon description" />
                        <h5 style={{marginTop:"-1px"}}>Floor Number</h5>
                        <div style={{ display: 'flex', gap: '20px', marginTop:"20px" }}>
                        
                        {/* <label style={{marginTop:"-5px",fontSize:"10px"}}>Your Floor</label> */}
                        <input
                        type="number"
                        id="Your_Floor"
                        value={formData.Your_Floor}
                        onChange={handleChange}
                        name="Your_Floor"
                       placeholder="number*"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"70px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                        {/* <label style={{marginTop:"-5px",fontSize:"10px"}}>Total Floor</label> */}
                        <input
                        type="number"
                        id="Total_Floor"
                        value={formData.Total_Floor}
                        onChange={handleChange}
                        name="Total_Floor"
                        placeholder="number*"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"70",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                      </div>
                        </div>
                      </div>
                      <div class="grid-item" style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:"30px",marginBottom:"20px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px"}}>
                      
                        <img src={car_parking} style={{marginLeft:"10px"}} alt="Icon description"/>
                        <br />
                        <label style={{fontSize:"10px", marginTop:"5px"}}>Car & Bike Parking Availability</label>
                       
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
                          <label style={{fontSize:"10px"}}>Parking Type</label>
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
                                    marginTop:"20px",
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
                      <div class="grid-item" style={{marginTop:"30px",marginBottom:"20px",display: "flex", justifyContent: "center", alignItems: "center",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px"}}>
                        <img src={broom} alt="Icon description"/>
                        <label style={{fontSize:"10px"}}>House help room</label>

                        <select
                          id="broom"
                          name="broom"
                          value={formData.broom}
                          onChange={handleChange}
                          style={{  backgroundColor:"white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    border: "1px solid #52796F",
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
                      <div class="grid-container" style={{}}>
                        <div class="grid-item" style={{width:"145px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
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
                        <div class="grid-item" style={{width:"150px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
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
                      <div class="grid-item" style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:"20px", marginBottom:"20px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
                        <img src={furniture_1} alt="Icon description"/>
                        <h5>Furnishing</h5>
                        <h6 >Type Of Furnishing</h6>
                        <select
                          id="furnish"
                          name="furnish"
                          value={formData.furnish}
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
                            value="Un-furnished"
                          >
                            Un-furnished
                          </option>
                          <option value="Semi-Furnished">Semi-Furnished</option>
                          <option value="Full-Furnished">Full-Furnished</option>
                         
</select>
                      </div>
                      <div class="grid-container">
                        <div class="grid-item" style={{width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
                        <img src={Ac_png} alt="Icon description" />
                        <h5>Air Conditioner</h5>
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
                        <div class="grid-item" style={{width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
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
                      <div class="grid-container">
                        <div class="grid-item"  style={{marginTop:"20px",width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
                        <img src={construction_year} alt="Icon description" />
                        <h5 style={{marginTop:"-5px"}}>Construction year</h5>
                        <input
                        type="number"
                        id="const_year"
                        value={formData.const_year}
                        onChange={handleChange}
                        name="const_year"
                        placeholder="-year drop-down* -"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        marginTop:"-25px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                       
                        </div>
                        <div class="grid-item"  style={{marginTop:"20px",width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}>
                        <img src={key_1} alt="Icon description" />
                        <h5 style={{marginTop:"-5px"}}>Available from</h5>
                        <input
                        type="date"
                        id="avail_from"
                        value={formData.avail_from}
                        onChange={handleChange}
                        name="avail_from"
                        // placeholder="username"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop:"-10px",
                        border: "1px solid #52796F",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                       
                        </div>
                       </div>
                      
                </div> 

               
                <div  style={{border: "1px solid #CFD3D2",  padding: "5px", margin: "20px",marginLeft: "auto", marginRight: "auto", width: "327px",background:"linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", borderRadius:"5px"}}>
                <h2 style={{textAlign:"left",fontSize:"19px", fontfamily:"Inter"}}>Rent Details</h2>
                 <div class="grid-container">
                        <div class="grid-item" style={{width:"150px", border:"1px solid #CFD3D2",background: "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",borderRadius:"5px"}}>
                        <img src={rent_1} alt="Icon description" />
                        <h5 style={{marginTop:"2px"}}>Rent(per month)</h5>
                        <h6 style={{marginTop:"-20px"}}>(without Maintenance)</h6>
                        <input
                        type="number"
                        id="rent"
                        value={formData.rent}
                        onChange={handleChange}
                        name="rent"
                        placeholder="-number only*-"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"130px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        marginTop:"-10px",
                        }}
                      />
                        </div>
                        <div class="grid-item" style={{width:"145px", border:"1px solid #CFD3D2",background: "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",borderRadius:"5px"}}>
                        <img src={security_deposit} alt="Icon description" />
                        <h5 style={{marginTop:"10px"}}>Security Deposit</h5>
                        <h6 style={{marginTop:"-20px"}}>(Refundable)</h6>
                        <input
                        type="number"
                        id="sec_dep"
                        value={formData.sec_dep}
                        onChange={handleChange}
                        name="sec_dep"
                        placeholder="-number only*-"
                        style={{  backgroundColor:"white",
                        marginTop:"-15px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"130px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                        </div>
                        
                       
                       
                        
                      </div>
                      <div class="grid-container" >
                        <div class="grid-item" style={{width:"150px", marginTop:"10px", border:"1px solid #CFD3D2",height:"120px",background:" linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",borderRadius:"5px"}}>
                        <img src={mainteance_1} alt="Icon description" />
                        <h5 style={{marginTop:"5px",fontSize:"12px"}}>Maintenance (per month)</h5>
                        <h6 style={{marginTop:"-20px"}}>(for tenant)</h6>
                        <input
                        type="number"
                        id="maint"
                        value={formData.maint}
                        onChange={handleChange}
                        name="maint"
                        placeholder="-number only*-"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        marginTop:"-20px",
                        width:"130px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                        </div>
                        <div class="grid-item" style={{width:"145px", marginTop:"10px", border:"1px solid #CFD3D2", height:"120px",background:"linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",borderRadius:"5px"}}>
                        <img src={mainteance_1} alt="Icon description" />
                        <h5 style={{marginTop:"7px"}}>Lock-in Period</h5>
                        <h6 style={{marginTop:"-20px"}}>(in Months)</h6>
                        <input
                        type="number"
                        id="lockin"
                        value={formData.lockin}
                        onChange={handleChange}
                        name="lockin"
                       placeholder="-number only*-"
                        style={{  backgroundColor:"white",
                        marginTop:"-20px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width:"130px",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                        </div>
                       </div>

                </div> 

               
               
                    <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "40%" }}>Save <img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%" }}/></button>
		                </div>
                   
            
                 <Footer/>

                </form>
            </div>
        </div>
        </div>

    );
}
export default PropertyDI;