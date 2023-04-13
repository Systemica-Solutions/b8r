import React, { Component, useEffect, useState } from "react";
import TenantDetailscss from "./TenantDetails.css";
import axios from "axios";

import loadingImg from "./loading.gif";

function TenantDetails() {
  const [responseTenant, setresponseTenant] = useState();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  useEffect(() => {
    // event.preventDefault();
    const fetchPosts = async () => {
      setLoading(true);
      axios
        .get("http://localhost:5000/getTenants", axiosConfig)
        .then((response) => {
          setresponseTenant(response.data);
          console.log(responseTenant);
          // alert("Your data has been submitted");
          // do something with the response
        })
        .catch((error) => {
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

  return (
    <div >
      <div className="form" style={{ borderRadius: "16px"}}>
        <table className="tablef">
          <thead className="tableh">
            <tr>
              <td>Tenant Onboarded</td>
              <td>Days Since Onboarded</td>
            </tr>
          </thead>
          <tbody className="tableb">
            {Array.isArray(responseTenant)
              ? responseTenant.map((user) => (
                  // <div key={user._id}>
                  <tr>
                    <td>{user.tenant_name} </td>
                    <td>{user.createdDate} </td>
                  </tr>
                  // </div>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TenantDetails;
