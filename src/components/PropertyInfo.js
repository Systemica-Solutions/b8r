import React, { Component,useState }  from 'react';
import PropertyInfocss from './PropertyInfo.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
function PropertyInfo(){
	const [formData, setFormData] = useState({
		property_name: '',
		society_name: '',
		location: '',
		area_name: '',
		property_type: '',
		pin_code: '',
		address: '',
		city: '',
		rented:'false',		
		
	  });

	  
	
	  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	  };


	  const token = localStorage.getItem("token");
	  console.log(token);
  

	  //API REQUEST
	  let axiosConfig = {
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			"Access-Control-Allow-Origin": "*",
			'Authorization': `Basic ${token}` 
			}
		}
	
	  const handleSubmit = event => {
		event.preventDefault();
		axios.post('http://localhost:5000/propertyInfo/', formData, axiosConfig)
		  .then(response => {
			console.log(response.data);
			alert("Your data has been submitted");
			window.location.href = '/PropertyDI'
			
			// do something with the response
		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	  };

	   //STYLES
         
	   const styles = {
        backgroundColor:"white",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid grey",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
      };


    return(
        <div>
    		<div className="login-page">
  				<div className="form" style={{ borderRadius: "16px" }}>
				  <h2>Property Details </h2>
        <form className="login-forms" onSubmit={handleSubmit} >
		<label for="property_name"></label>
		<input type="text" id="property_name" name="property_name" value={formData.property_name} onChange={handleChange} placeholder='Property Name/Number'  style={ styles }/><br></br>
		
		<label for="society_name"></label>
		<input type="text" id="society_name" name="society_name" value={formData.society_name} onChange={handleChange} placeholder='Society name'  style={ styles }/><br></br>
		
		<label for="location"></label>
		<input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder='Location'  style={ styles }/><br></br>
		
		<label for="area_name"></label>
		<input type="text" id="area_name" name="area_name" value={formData.area_name} onChange={handleChange} placeholder='Area Name' style={ styles }/><br></br>
		
		<label for="property_type"></label>
		<select id="property_type" name="property_type" value={formData.property_type} onChange={handleChange}  style={ styles }>
			<option value="gated_apartment">Type of Property</option>
			<option style={{ textAlign: "center", backgroundColor: "red"}}  value="gated_apartment">Gated Apartment</option>
			<option value="gated_individual_house">Gated Individual House</option>
			<option value="individual_apartment">Individual Apartment</option>
		</select><br></br>
		
		<label for="pin_code"></label>
		<input type="text" id="pin_code" name="pin_code" value={formData.pin_code} onChange={handleChange} placeholder='Pin Code' style={ styles }/><br></br>
		
		<label for="address"></label>
		<input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder='Enter Locality' style={ styles }></input><br></br>
		
		<label for="city"></label>
		<input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder='City'  style={ styles }/><br></br>
		
		<button style={{ fontWeight: "900" }}>Next</button>
        {/* <button><Link to="/PropertyDI">Next</Link></button> */}
	
	</form>

            </div>            
        </div>
    </div>

    );
}
export default PropertyInfo;