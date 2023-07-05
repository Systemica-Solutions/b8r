import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import greenTick from "../Assets/Images/greenTick.png";
import vector from "../Assets/Images/vector.png"
import Footer from '../Footer';
// import key_1 from "./PropertyAdditionPageIcons/key_1/24.png";
// import rent_1 from "./PropertyAdditionPageIcons/rent_1/24.png";

function TenantCreated(){

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

    // const [formData, setFormData] = useState({
	// 	duration_of_stay: '',
	// 	deposit_comfortable_for: '',
    // house_conf:'',
	// 	type_of_furnishing: '',
    // house_type:'',
    // movein_from:'',
    // rent:''
	//   });

    
	
	//   const handleChange = event => {
	// 	const { name, value } = event.target;
	// 	setFormData(prevState => ({ ...prevState, [name]: value }));
    
	//   };
	
	//   const handleSubmit = event => {
	// 	event.preventDefault();
	// 	console.log()
	// 	axios.post('http://18.117.158.99/backend/tenantpref', formData)
	// 	  .then(response => {
	// 		console.log(response.data);
	// 		alert("Your tenant preferences has been submitted");
	// 		// do something with the response
	// 	  })
	// 	  .catch(error => {
	// 		console.log(error);
	// 		// handle the error
	// 	  });
	//   };


    return(
            
        <div className="login-page">
          <div className="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} >
          <h2 style={{color:"#52796F"}}>Tenant Created</h2>

            <div  style={{marginTop:"40px"}}>
                <img src={greenTick} style={{borderRadius:"65px"}}/>
                <h4 style={{fontWeight:"lighter"}}>Tenant Added</h4>
            </div>

            {/* -----------for name----------- */}
            <div style={{marginTop:"70px"}}>
            <h4 style={{fontWeight:"lighter",textDecoration:"underline"}}>Name</h4>
            <h2 style={{color:"#52796F"}}>Tenant Name</h2>
            </div>

             {/* -----------budget details----------- */}
             <div  style={{marginTop:"40px"}}>
             <h4 style={{fontWeight:"lighter",textDecoration:"underline"}}>Budget Details</h4>
             <h2 style={{color:"#52796F"}}>35,000/month</h2>
             </div>


              {/* -----------button----------- */}
              <div style={{marginTop:"40px"}}>
              <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "75%" }}>Go to Agent Dashboard<img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
              </div>
   
                

                

              

                
                       
                      
           
              
         
                  

               <Footer/>
                
            </div>
        </div>
           
        
       
        
    );
}


  
  
  
 

 
 
 
 

export default TenantCreated;