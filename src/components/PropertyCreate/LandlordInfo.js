import React, { Component,useState }  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LandlordInfo.css';
import backgroundSecond from "../Assets/Images/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/vector.png"
import num_2 from "../Assets/Images/num_2.png"


function LandlordInfo(){

	
	const queryParameters = new URLSearchParams(window.location.search)
	const propertyid = queryParameters.get("propertyid");
	const isContinue = queryParameters.get("continue")
	console.log(propertyid);

	const [formData, setFormData] = useState({
		propertyid: propertyid,
		landlord_first_name: '',
		landlord_last_name: '',
		contact_number: '', 
		pan_card: '',
		residing_country: '',
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
		axios.post('http://localhost:5000/backend/addlandlord', formData , axiosConfig )
		  .then(response => {


			console.log(response.data.LandlordInfoc);
			const propertyid = response.data.LandlordInfoc.propertyid;
			console.log(propertyid)
			alert("Your data has been submitted");
			window.location.href = `/PropertyDI?propertyid=${propertyid}&continue=true`;

		//redirect user to UploadPhotos

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
      <div className="login-page " >
		<div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }}>
				  <h2> Add Landlord Details </h2>
				  <img src={num_2} alt="Image description" height={55} />
        <form onSubmit={handleSubmit} style={{ borderRadius: "16px" }} className="inner-background">
			{/* Landlord FIRST NAME */}
			<h4 style={{ color:"#52796f" }} > Who owns this Property?</h4>

		<label for="landlord_first_name" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Landlord First Name* </label>
		<input type="text" id="landlord_first_name" placeholder="Landlord First Name" name="landlord_first_name" value={formData.landlord_first_name} onChange={handleChange} style={ styles }/><br></br>
		{/* Landlord LAST NAME */}
		 <label for="landlord_last_name" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Landlord Last Name* </label>
		<input type="text" id="landlord_last_name" placeholder = "Landlord last name" name="landlord_last_name" value={formData.landlord_last_name} onChange={handleChange} style={ styles }/><br></br> 
		
		
		{/* CONTACT NUM */}
		<label for="contact_number" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Contact Number*</label>
		<input type="tel" id="contact_number" placeholder="contact number" name="contact_number" value={formData.contact_number} onChange={handleChange} style={ styles }/><br></br>
			{/* PAN CARD */}
		<label for="pan_card" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Pan Card(Useful for Rental Agreement)</label>
		<input type="number" id="pan_card" placeholder="pan number" name="pan_card" value={formData.pan_card} onChange={handleChange} style={ styles }/><br></br>
		{/* Residing Country */}
		<label for="residing_country" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Country of residence of Landlord*</label>
		<input type="text" id="residing_country" placeholder="residing country" name="residing_country" value={formData.residing_country} onChange={handleChange} style={ styles }/><br></br>
		
		
		
		<br></br>
		{/* <hr></hr> */}

		{/* <Link to="/UploadPhotos"><button  style={{  fontWeight: "900" }}>Skip</button></Link> */}
		{/* <button className="CommonnBackButton" style={{  color: "white", fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "105%" }}><img className="vectorBack" src={vector} alt="fireSpot"/>Back</button> */}
		
		<div class="buttonBackNext">
		<button className="CommonnBackButton" style={{  fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		<button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Save and Next <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
		</div>
	</form>
	<Footer/>
            </div>
			{/* </div> */}
        </div>
        </div>

		
    );
}
export default LandlordInfo;