import React, { Component,useState }  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LandlordInfo.css';


function LandlordInfo(){
	const [formData, setFormData] = useState({
		landlord_name: '',
		landlord_pan_card: '',
		email: '',
		contact_number: '', 
		residing_country: '',
		residing_city: '',
	  });
	
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
		console.log()
		axios.post('http://localhost:5000/addlandlord', formData , axiosConfig )
		  .then(response => {
			console.log(response.data);
			alert("Your data has been submitted");
			// do something with the response
		//redirect user to UploadPhotos
		window.location.href = '/UploadPhotos'
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
      <div className="login-page" >
        <div class="form" style={{ borderRadius: "16px" }}>
				  <h2>Landlord Details </h2>
        <form onSubmit={handleSubmit} style={{ borderRadius: "16px" }}>
		<label for="landlord_name"> </label>
		<input type="text" id="landlord_name" placeholder="Landlord Name" name="landlord_name" value={formData.landlord_name} onChange={handleChange} style={ styles }/><br></br>
		
		<label for="landlord_pan_card"></label>
		<input type="text" id="landlord_pan_card" placeholder = "Landlord_pan_card" name="landlord_pan_card" value={formData.landlord_pan_card} onChange={handleChange} style={ styles }/><br></br>
		
		<label for="email"></label>
		<input type="email" id="email" placeholder="email" name="email" onChange={handleChange} style={ styles }/> <br></br>
		
		<label for="contact_number"></label>
		<input type="tel" id="contact_number" placeholder="contact number" name="contact_number" value={formData.contact_number} onChange={handleChange} style={ styles }/><br></br>
		
		<label for="residing_country"></label>
		<input type="text" id="residing_country" placeholder="residing country" name="residing_country" value={formData.residing_country} onChange={handleChange} style={ styles }/><br></br>
		
		<label for="residing_city"></label>
		<input type="text" id="residing_city" placeholder="residing city" name="residing_city" value={formData.residing_city} onChange={handleChange} style={ styles }/><br></br>
		
		{/* <input type="submit" value="Submit"/>  */}
        <button style={{  fontWeight: "900" }}>Submit</button><br></br>
		
		<br></br>
		<hr></hr>

		<Link to="/UploadPhotos"><button  style={{  fontWeight: "900" }}>Skip</button></Link>
	</form>
            </div>
        </div>
        </div>

		
    );
}
export default LandlordInfo;