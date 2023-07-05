import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import ReactSwitch from 'react-switch';

import PropertyDIcss from './PropertyDI.css';
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



function TenantPref2(){

  	
	const queryParameters = new URLSearchParams(window.location.search)
	const propertyid = queryParameters.get("propertyid");
	const isContinue = queryParameters.get("continue")
	console.log(propertyid);


    const [formData, setFormData] = useState({
		// tenantid: tenentid,
	  gated_security : true,
    twentyfour_seven : true,
    grocery_store : true,
    Swimming_pool: true,
    Gym : true,
    club_house : true,
    car_parking : '',
   air_condition: true,
    nonveg:true,
   


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

		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	  };

  

    return(
        <div>
      <div className="login-page" >
      <div className="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} >
        {/* <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} > */}
				  <h2 style={{color:"#52796F"}}>Tenant Details (2/2)</h2>
          
          <h6 style={{ fontSize: "15px", fontWeight: "bold", margin: "5px 0 0", textAlign: "left", marginLeft:"5px" }}>What all facilitites are must for tenant?</h6>
                <form className='login-form' onSubmit={handleSubmit}>
                 <div  style={{marginRight:"10px",width:"300px",  padding: "10px", borderRadius:"2%"}}>
                  {/* <h3 style={{textAlign: "left", marginTop:"20px",marginLeft:"10px", marginBottom:"5px" }}>About the society</h3> */}
                 <div class="grid-container" style={{width:"300px"}}>

                  {/* Gated Security-------------------------------------------------------------- */}

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

                          {/* Power Backup-------------------------------------------------------------- */}
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

                          {/* Grocery Store-------------------------------------------------------------- */}
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
                          {/* Swimming Pool-------------------------------------------------------------- */}
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
                          {/* Gym-------------------------------------------------------------- */}
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
                      {/* Club House-------------------------------------------------------------- */}
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
                    {/* Car Parking-------------------------------------------------------------- */}
                          <div class="grid-item" style={{border:"none"}}>
                        <img src={car_parking} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"10px" ,fontSize:"10px"}}>
                          Car Parking
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
                  {/* Bike Parking-------------------------------------------------------------- */}
                        <div class="grid-item" style={{border:"none"}}>
                        <img src={car_parking} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"10px" ,fontSize:"10px"}}>
                          Bike Parking
                        </h5>
                        <ReactSwitch
                        checked={formData.bike_parking}
                        onChange={() =>  setFormData({
                          ...formData,
                          bike_parking: !formData.bike_parking,
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
          {/* Non-veg allowed-------------------------------------------------------------- */}
                          <div class="grid-item" style={{border:"none"}}>
                        <img src={veg_nonveg} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"10px" ,fontSize:"10px"}}>
                          Non-Veg Allowed
                        </h5>
                        <ReactSwitch
                        checked={formData.veg_nonveg}
                        onChange={() =>  setFormData({
                          ...formData,
                          veg_nonveg: !formData.veg_nonveg,
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
                      {/* Air-Condition-------------------------------------------------------------- */}
       <div class="grid-item" style={{border:"none"}}>
                        <img src={Ac_png} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"10px" ,fontSize:"10px"}}>
                          Air Condition
                        </h5>
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
              {/* Attachecd bathroom-------------------------------------------------------------- */}
       <div class="grid-item" style={{border:"none"}}>
                        <img src={num_of_bathrooms} alt="Icon description" />
                        <h5 style={{marginTop:"-5px",marginBottom:"10px" ,fontSize:"10px"}}>
                          Attached Bathroom
                        </h5>
                        <ReactSwitch
                        checked={formData.club_house}
                        onChange={() =>  setFormData({
                          ...formData,
                          Attached_Bathroom: !formData.Attached_Bathroom,
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
              <div style={{marginBottom:"80px"}}></div>
                      
                    <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "40%" }}>Save <img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%" }}/></button>
		                </div>
                   
            
                 <Footer/>
                 </form>

                
            </div>
            </div>
       </div>
      //  </div>
        
        

    );
}
export default TenantPref2;