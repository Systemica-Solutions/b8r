import React, { Component, useState }  from 'react';
import {Link} from 'react-router-dom';
import AddTenantcss from './AddTenant.css';
import axios from 'axios';
import backgroundSecond from "./other_bg.png";
import vector from "./vector.png"
import Footer from './Footer';

function AddTenant(){

    const [formData, setFormData] = useState({
		tenant_name: '',
	
		contact_number: '',
    email: '',
	
    isOnBoard : 'false'
	  });
	
	  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
	  };

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
		axios.post('http://18.117.158.99/backend/addtenant',  formData, axiosConfig )
		  .then(response => {
			console.log(response.data.userID);
			alert("Your Tenant details has been submitted");
      //redirect user to Dashboard
        window.location.href = '/tenantpref'
			// do something with the response
		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	  };

    //STYLES
         
    const styles = {
      backgroundColor:"#F5F5F5",
      padding: "10px",
      borderRadius: "10px",
      border: "1px solid #52796F",
      boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
    };
    

    return(
        <>
        <div className="login-page">
           
            <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }}>
            <h2 style={{color:"#52796F"}}>Add Tenant</h2>

            
            <form action='/AddTenant' onSubmit={handleSubmit} >
                    <label for="name" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}> Tenant Name</label>
                    <input type="text" id="name" name="tenant_name" value={formData.tenant_name} onChange={handleChange}  required  style={ styles }/>

                    <label for="phone" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Tenant Mobile Number </label>
                    <input type="tel" id="contact_number" name="contact_number" value={formData.contact_number} onChange={handleChange}  required style={ styles }/>

                    <label for="email" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Tenant Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  required  style={ styles }/>
               
                    <div style={{marginTop:"50px"}}>

                    </div>

                    <div class="buttonBackNext">
                    <button className="CommonnBackButton" style={{  fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
                    <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Save and Next <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
                    </div>
                    
                    <Footer/>
            
            </form>
         


            </div>
           
        </div>
        </>

    );
}
export default AddTenant;