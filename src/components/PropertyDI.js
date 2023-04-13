import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import PropertyDIcss from './PropertyDI.css';
import axios from 'axios';
function PropertyDI(){
    const [formData, setFormData] = useState({
		rent: '',
		maintenance: '',
		total_deposit: 'negotiable',
		furnishing_type: 'Fully',
		total_floors: '',
		house_floor_number: '',
		carpet_area: '',
		num_bedrooms: '1',
    num_bathrooms: '1',
    flat_number: '',
		
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
		axios.post('http://localhost:5000/propertyDI/', formData, axiosConfig )
		  .then(response => {
			console.log(response.data);
			alert("Your data has been submitted");
      window.location.href = '/LandlordInfo'

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
      <div className="login-page" >
        <div class="form" style={{ borderRadius: "16px" }}>
				  <h2>Property Details </h2>
                <form className='propform' onSubmit={handleSubmit}>
                <label for="rent"> </label>
                    <input type="number" id="rent" name="rent" value={formData.rent} onChange={handleChange} placeholder="Rent (per month)"  style={ styles }/>

                    <label for="maintenance"> </label>
                    <input type="number" id="maintenance" name="maintenance" value={formData.maintenance} onChange={handleChange} placeholder='Maintenance (per month)'  style={ styles }/>

                    <label for="maintenance"> </label>
                    <input type="number" id="deposit" name="deposit" value={formData.deposit} onChange={handleChange} placeholder='Total Deposit'  style={ styles }/>
                    <label for="deposit_type"></label>
                    <select id="deposit_type" name="deposit_type" value={formData.deposit_type} onChange={handleChange}  style={ styles }>
                    <option value="negotiable"selected="negotiable" >Monthly Deposit Type</option>
                    <option value="negotiable"selected="negotiable" >Negotiable</option>
                    <option value="non_negotiable">Non-negotiable</option>
                    </select>

                    

                    <label for="furnished_type"></label>
                    <select id="furnished_type" name="furnishing_type" value={formData.furnishing_type} onChange={handleChange}  style={ styles }>
                    <option value="Fully" selected="selected" >Furnishing Type</option>
                    <option value="Fully" selected="selected" >Fully-Furnished</option>
                    <option value="Semi">Semi-Furnished</option>
                    <option value="Neither">Unfurnished</option>
                    </select>

                

                    <label for="total_floors"> </label>
                    <input type="number" id="total_floors" name="total_floors" value={formData.total_floors} onChange={handleChange} placeholder='Total Floors'  style={ styles }/>

                    <label for="house_floor_number"> </label>
                    <input type="number" id="house_floor_number" name="house_floor_number" value={formData.house_floor_number} onChange={handleChange} placeholder='house floor number'  style={ styles }/>

                    <label for="carpet_area"> </label>
                    <input type="number" id="carpet_area" name="carpet_area" value={formData.carpet_area} onChange={handleChange} placeholder='carpet area (in sq ft)'  style={ styles }/>

                    <label for="num_bedrooms"></label>
                    <select id="num_bedrooms" name="num_bedrooms" value={formData.num_bedrooms} onChange={handleChange}  style={ styles }>
                    <option value="1BHK">Number of Bedrooms</option>
                    <option value="1BHK">1</option>
                    <option value="2BHK">2</option>
                    <option value="3BHK">3</option>
                    <option value="4BHK">4</option>
                    <option value="Villa">Villa</option>
                    </select>

                    <label for="num_bathrooms"></label>
                    <select id="num_bathrooms" name="num_bathrooms" value={formData.num_bathrooms} onChange={handleChange}  style={ styles }>
                    <option value="1" >Number of Bathrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>

                    <label for="flat_number"></label>
                    <input type="text" id="flat_number" name="flat_number" value={formData.flat_number} onChange={handleChange} placeholder='flat number'  style={ styles }/>
                    <button style={{  fontWeight: "900" }}>Submit</button><br></br>
                    {/* <button><Link to="/UploadPhotos">Upload Photos</Link></button> */}

                </form>
            </div>
        </div>
        </div>

    );
}
export default PropertyDI;