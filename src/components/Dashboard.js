import React, { Component }  from 'react';
import Dashboardcss from './Dashboard.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from ".//UserLoginDetails";

import Image1 from "./add_prop.png";
import Image2 from "./add_tenant.png";
import Image3 from "./prop.png";
import Image4 from "./tenant.png";


function Dashboard(){


    const token = localStorage.getItem("token");
    console.log(token);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
			alert("You have been logged out.");
	  };


    return(
        <>


        <div className="containered form" style={{ borderRadius: "16px"}} >
            
               

                <div className="rowTwo">
                        <div className="cover">
                        <Link to="/Propertydetails">
                             <img classname="propimg" src={Image3} alt="Image_3" height={105} />
                            <h3 className="name" style={{zIndex:"-3", marginTop:"1px", textAlign:"right"}}>View Properties</h3>
                            </Link>
                        </div>
                       


                        <div className="cover">
                        <Link to="/Tenantdetails">
                             <img src={Image4} alt="Image_3" height={90} />
                            <h3 className="name" >View Tenants</h3>
                            </Link>
                        </div>

                </div>
                <hr></hr>
                <br></br>
                <div className="row">
                        <div className="cover">
                        <Link to="/PropertyInfo">
                             <img src={Image1} alt="Image_1"  height={90}  />
                            <h3 className="name">Add Property</h3>
                            </Link>
                            </div>
        
          
                        <div className="cover">
                            <Link to="/AddTenant">
                            <img src={Image2} alt="Image_2" height={90} />
                            <h3 className="name">Add  Tenant</h3>
                            </Link>
                        </div>

            </div>
            

        </div>


        </>
    );
}
export default Dashboard;