import React, { Component, useState }  from 'react';
import {Link} from 'react-router-dom';
import AddTenantcss from './AddTenant.css';
import axios from 'axios';
function AddTenant(){

    const [formData, setFormData] = useState({
		tenant_name: '',
		email: '',
		contact_number: '',
		house_type: '1BHK',
		rent_range: '',
		society_type: '',
		availability_type: '',
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
		axios.post('http://localhost:5000/addtenant',  formData, axiosConfig )
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
        backgroundColor:"white",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid grey",
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
      };
    

    return(
        <>
        <div className="login_page">
            <div className="form" style={{ borderRadius: "16px" }} >
            <h2>Add New Tenant</h2>

            
            <form action='/AddTenant' onSubmit={handleSubmit} >
                    <label for="name"> </label>
                    <input type="text" id="name" name="tenant_name" value={formData.tenant_name} onChange={handleChange} placeholder ="Tenant Name" required  style={ styles }/>

                    <label for="email"> </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder ="Email" required  style={ styles }/>

                    <label for="phone"> </label>
                    <input type="tel" id="contact_number" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="Contact Number" required style={ styles }/>

                    <label for="house_type"></label>
                    <select id="house_type" name="house_type" value={formData.house_type} onChange={handleChange}  style={ styles }>
                    <option value="1BHK">Home Type</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                    <option value="Villa">Villa</option>
                    </select>

                    <label for="rent_range"> </label>
                    <input type="text" id="rent_range" name="rent_range" value={formData.rent_range} onChange={handleChange} placeholder="rent range (INR)" required  style={ styles }/>

                    
                    <label for="society_type"></label>
                    <select id="society_type" name="society_type" value={formData.society_type} onChange={handleChange}  style={ styles }>
                    <option value="gated_society">Society Type</option>
                    <option value="gated_society">Gated Society</option>
                    <option value="standalone_apartment">Standalone Apartment</option>
                    <option value="individual_house">Individual House</option>
                    <option value="no_preference">No Preference</option>
                    </select>

                    <label for="availability_type"></label>
                    <select id="availability_type" name="availability_type" value={formData.availability_type} onChange={handleChange}  style={ styles }>
                    <option value="gated_society">Availability type</option> 
                    <option value="gated_society">Immediate (0 to 15) Days</option>
                    <option value="standalone_apartment">15 to 230 Days</option>
                    <option value="individual_house">More Than 30 Days</option>
                   
                    </select>
                    
                    
                    <br></br>
                    <hr></hr>
                    <button style={{  fontWeight: "900" }}>Submit</button><br></br>
                    <br></br>
                    
                    {/* <Link to="/TenantPref"> <button type="submit"  style={{ color: "white" , fontSize: "16px" }} >Next</button></Link> */}
                   
            
            </form>


            </div>
        </div>
        </>

    );
}
export default AddTenant;