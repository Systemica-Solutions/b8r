import React, { Component , useEffect, useState}  from 'react';
import propertycss from "./PropertyDetails.css";
import { Link } from "react-router-dom";
import UserLoginDetails from ".//UserLoginDetails";
import axios from 'axios';

import loadingImg from './loading.gif';



function PropertyDetails() {


  const [responsePropertyDetails, setPropertyDetails] = useState();
  const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");
    console.log(token);

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Basic ${token}` 
      }
    }
    useEffect(() => {
		// event.preventDefault();
    const fetchPosts = async () => {
      setLoading(true);
		    axios.get('http://18.117.158.99/backend/getProperty', axiosConfig )
		  .then(response => {
			console.log(response);

      setPropertyDetails(response.data);
			console.log(PropertyDetails);
			// alert("Your data has been submitted");
			// do something with the response
            //redirect user to Dashboard
            // window.location.href = '/PropertyDI'
		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	    setLoading(false);
    };

    fetchPosts();
  }, []);


  if (loading) {
    return (
      <h3>
        Loading...
        <img src={loadingImg} alt="" />
      </h3>
    );
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
  
  console.log(formatDate(new Date()));


  return (
    <>
   
        <div className="propf">
        <h4>Property Details</h4>

      </div>
   <div className="propd">
<table className="">
          <thead className="PropertyTableRow">
            <tr>
              <td>Property Vacant</td>
              <td>Vacant Since</td>
            </tr>
          </thead>
          <tbody className="tableb">
            {Array.isArray(responsePropertyDetails)
              ? responsePropertyDetails.map((user) => (
                  // <div key={user._id}>
                  <tr>
                    <td><b>{user.property_name} </b></td>
                    <td><b>{user.createdDate}</b> </td>
                  </tr>
                  // </div>
                ))
              : null}
          </tbody>
        </table>
    
<hr />

      {/* <div className="propd">
        <table>
          <thead className="PropertyTableRow">
            <tr>
              <th>Vacant</th>
              <th>Vacant since</th>
            </tr>
          </thead>
          <tbody className="PropertyTableColumn">
            <tr>
              <td>Logix, flat number 5501</td>
              <td>March 10, 2023</td>
            </tr>
            <tr>
              <td>Paras, flat number 220</td>
              <td>February 28, 2023</td>
            </tr>
            <tr>
              <td>Tierra, flat number 1190</td>
              <td>January 15, 2023</td>
            </tr>
            <tr>
              <td>Gaur city, flat number 1490</td>
              <td>January 1, 2023</td>
            </tr>
          </tbody>
        </table>
      </div> */}
      </div>

      <div className="propf">
        <h4>Rented Out</h4>
      </div>

      <div className="propd">
        <table>
          <thead className="PropertyTableRow">
            <tr>
              <td>Details</td>
              <td>On Rent Since</td>
            </tr>
          </thead>

          <tbody className="PropertyTableColumn">
            <tr>
              <td>Logix, flat number 4453</td>
              <td>April 3, 2022</td>
            </tr>
            <tr>
              <td>Logix, flat number 4253</td>
              <td>May 3, 2022</td>
            </tr>
            <tr>
              <td>Guardian, flat number 4343</td>
              <td>September 3, 2022</td>
            </tr>
            <tr>
              <td>Bells, flat number 4653</td>
              <td>June 3, 2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default PropertyDetails;
