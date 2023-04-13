import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
// import { toppings } from "toppings";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tp from "./TenantPref.css";


function TenantPref(){

  const [checkedState, setCheckedState] = useState(
    []
  );

  console.log(checkedState);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item 
     
    );
    setCheckedState(updatedCheckedState);
  }

    const [formData, setFormData] = useState({
		duration_of_stay: '',
		deposit_comfortable_for: '',
		type_of_furnishing: ''
		
	  });

    
	
	  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
    
	  };
	
	  const handleSubmit = event => {
		event.preventDefault();
		console.log()
		axios.post('http://localhost:5000/tenantpref', formData)
		  .then(response => {
			console.log(response.data);
			alert("Your tenant preferences has been submitted");
			// do something with the response
		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	  };
    return(
            
        <div className="login-page">
          <div className="form" style={{ padding: "20px" }} >
          <h2>Tenant Preference</h2>

    <form className="login-form"  onSubmit={handleSubmit}>
   
                

                

                <label for="duration"></label>
                <select name="duration_of_stay" id="duration" value={formData.duration_of_stay} onChange={handleChange}>
                <option>Duration of Stay</option>
                <option value="0-3">0-3 months</option>
                <option value="3-6">3-6 months</option>
                <option value="6-11">6-11 months</option>
                <option value="30+">More than 30 months</option>
                </select>

               

                <label for="duration"></label>
                <select name="deposit_comfortable_for" id="deposit" value={formData.deposit_comfortable_for} onChange={handleChange} >
                <option>Deposit Comfortable For</option>    
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="anything">Anything would be okay</option>
                </select>

           

                <label for="furnishing"></label>
                <select name="type_of_furnishing" id="furnishing" value={formData.type_of_furnishing} onChange={handleChange}>
                <option value="full">Type of Furnishing</option>   
                <option value="full">Full-Furnished</option>
                <option value="semi">Semi-Furnished</option>
                <option value="un">Un-Furnished</option>
                </select>

                {/* <label for="amenities">Select amenities:</label>
                <select id="amenities" name="amenities"  onChange={handleOnChange} multiple >
                <option value="power-backup">
                <input type="checkbox" name="amenities[]" value="power-backup"/> Power Back-up
                </option>
                <option value="gym">Gym and Club House
                <input type="checkbox" name="amenities[]" value="gym"/>
                </option>
                <option value="gated-security">Gated Security
                <input type="checkbox" name="amenities[]" value="gated-security"/>
                </option>
                <option value="convenience-store">Convenience Store
                <input type="checkbox" name="amenities[]" value="Convenience-Store"/>
                </option>
                <option value="swimming-pool">Swimming Pool
                <input type="checkbox" name="amenities[]" value="Swimming-Pool"/>
                </option>
                <option value="balcony">Balcony
                <input type="checkbox" name="amenities[]" value="Balcony"/>
                
                </option>
                <option value="parking">Parking
                <input type="checkbox" name="amenities[]" value="parking"/> */}
                
                {/* </option> */}
                {/* <option value="air-conditioning">Air-conditioning */}
                {/* <input type="checkbox" name="amenities[]" value="air-conditioning"/> */}
                
                {/* </option> */}
                {/* </select> */}


                {/* <Autocomplete
                    multiple
                    limitTags={1}
                    id="multiple-limit-tags"
                    options={amenities}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[amenities[1], amenities[3],[amenities[2], amenities[5]]]}
                    renderInput={(params) => (
                      <TextField {...params} label="ammenities" placeholder="" />
                    )}
                    sx={{
                      height: 100}}
                  /> */}




         


               <hr></hr>
                 <button style={{ backgroundColor: '#005303', fontWeight: "900"  }} >Save Preference</button>
                </form>
            </div>
        </div>
           
        
       
        
    );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const amenities = [
  { title: 'Gated Society' },
  { title: '24*7 power back-up'  },
  { title: 'convenience Store'   },
  { title: 'swimming pool'  },
  { title: 'Gym & club-house'   },
  { title: 'parking'  },
  { title: 'balcony'  },
  { title: 'air-conditioning'  },
  
  
  
 

 
 
 
 
];
export default TenantPref;